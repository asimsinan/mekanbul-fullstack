const axios = require("axios");
const nodemailer = require("nodemailer");
var mongoose = require("mongoose");
const Kullanici = mongoose.model("kullanici");
const apiSecenekleri = {
  sunucu: "https://mekanbul-fullstack.asimsinanyuksel.repl.co",
  sunucuLocal:"http://localhost:3000",
  apiYolu: "/api",
  mekanYolu: "/mekanlar/",
  girisYolu: "/girisyap",
  kayitYolu: "/kayitol",
  adminYolu: "/admin",
  profilYolu: "/profil",
  profilGuncelleYolu: "/profilguncelle",
  sifreYenilemeYolu: "/sifreyenile",
};
function sessionKontrol(req) {
  if (req.session.kullanici) return req.session.kullanici;
  else return false;
}

function setToken(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
//Mailtrap
async function epostaGonder(eposta,res) {
  let kullanici = await Kullanici.findOne({ eposta: eposta}).exec();
  let token = kullanici.tokenUret();
  //token üret ve adrese geçir.
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });
  await transporter.sendMail(
    {
      from: process.env.eposta,
      to: eposta,
      subject: "Şifre Yenileme",
      text: "Şifrenizi yenilemek için aşağıdaki linke tıklayınız.",
      html: "<h2>Şifrenizi yenilemek için aşağıdaki linke tıklayınız.</h2><p><a href='"+apiSecenekleri.sunucu+"/yenisifreuret/"+token+"'"+ " target='_blank'>Şifre Sıfırlama Linki</a></p>",
    },
    function (hata, info) {
      if (hata) {
        console.log(error);
      } else {
        res.redirect("/sonuc");
      }
    }
  );
}
hataGoster = function (req, res, hata) {
  let mesaj;
  let kullanici = sessionKontrol(req);
  let cevap = JSON.parse(JSON.stringify(hata));
  if (cevap.status == 404) {
    mesaj = "Sayfa bulunamadı!";
  } else if (cevap.status == 401) {
    mesaj = "Bu sayfaya erişmek için yetkiniz yok!";
  } else if (cevap.status == 400) {
    mesaj = "Girilmesi gereken alanlardan birini boş geçtiniz!";
  }
  else
  mesaj = "Şifre güncelleme başarız. Lütfen bilgilerinizi kontrol ediniz!";
  res.render("error", {
    mesaj: mesaj,
    kullanici: kullanici,
  });
};

mekanBilgisiGetir = function (req, res, callback) {
  axios
    .get(
      apiSecenekleri.sunucu +
        apiSecenekleri.apiYolu +
        apiSecenekleri.mekanYolu +
        req.params.mekanid
    )
    .then(function (response) {
      let gelenMekan = response.data;
      gelenMekan.koordinat = {
        enlem: gelenMekan.koordinat[0],
        boylam: gelenMekan.koordinat[1],
      };
      callback(req, res, gelenMekan);
    });
};
module.exports = {
  apiSecenekleri,
  sessionKontrol,
  hataGoster,
  mekanBilgisiGetir,
  setToken,
  epostaGonder,
};
