let ortak = require("./common/ortakkullanim");
let apiSecenekleri = ortak.apiSecenekleri;
let sessionKontrol = ortak.sessionKontrol;
let hataGoster = ortak.hataGoster;
let setToken = ortak.setToken;
const axios = require("axios");

const yorumEkleSayfasiOlustur = function (req, res) {
  console.log(apiSecenekleri);
  let kullanici = sessionKontrol(req);
  if (kullanici) {
    let mekanAdi = req.session.mekanAdi;
    mekanid = req.params.mekanid;
    if (!mekanAdi) res.redirect("/mekan/" + mekanid);
    else
      res.render("yorumekle", {
        baslik: mekanAdi + " mekanına yorum yap",
      });
  } else res.redirect("/giris");
};

const yorumEkleButton = function (req, res) {
  let kullanici = sessionKontrol(req);
  if (kullanici) {
    let gonderilenYorum, mekanid;
    mekanid = req.params.mekanid;
    if (!req.body.yorum) {
      hataGoster(req, res, { status: 400 });
    } else {
      gonderilenYorum = {
        yorumYapan: req.body.adsoyad,
        puan: parseInt(req.body.puan, 10),
        yorumMetni: req.body.yorum,
      };
      axios
        .post(
          apiSecenekleri.sunucu +
            apiSecenekleri.apiYolu +
            apiSecenekleri.mekanYolu +
            mekanid +
            "/yorumlar",
          gonderilenYorum,
          setToken(kullanici.token)
        )
        .then(function () {
          res.redirect("/mekan/" + mekanid);
        })
        .catch(function (hata) {
          hataGoster(req, res, hata);
        });
    }
  } else res.redirect("/giris");
};

module.exports = {
  yorumEkleSayfasiOlustur,
  yorumEkleButton,
};
