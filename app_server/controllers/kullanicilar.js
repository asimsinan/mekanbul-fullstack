let ortak = require("./common/ortakkullanim");
let apiSecenekleri = ortak.apiSecenekleri;
let sessionKontrol = ortak.sessionKontrol;
let hataGoster = ortak.hataGoster;
let setToken = ortak.setToken;
let epostaGonder = ortak.epostaGonder;
const axios = require("axios");

const girisYapSayfasiOlustur = function (req, res) {
  res.render("giris", {
    baslik: "Giriş Sayfası",
  });
};

const girisYapButton = function (req, res) {
  gonderilenKullanici = {
    eposta: req.body.eposta,
    sifre: req.body.sifre,
  };
  axios
    .post(
      apiSecenekleri.sunucu + apiSecenekleri.apiYolu + apiSecenekleri.girisYolu,
      gonderilenKullanici
    )
    .then(function (response) {
      req.session.kullanici = response.data;
      if (response.data.rol === "admin") res.redirect("/admin");
      else res.redirect("/?enlem=37&boylam=35");
    })
    .catch(function (hata) {
      hataGoster(req, res, hata);
    });
};

const sifremiYenileSayfasiOlustur = function (req, res) {
  res.render("sifreyenile", {
    baslik: "Şifre Yenileme",
  });
};

const sifremiYenileButton = function (req, res) {
  epostaGonder(req.body.eposta, res);
};

const yeniSifreAyarlaSayfasiOlustur = function (req, res) {
  res.render("yenisifreuret", {
    baslik: "Şifre Yenileme",
  });
};
const yeniSifreAyarlaButton = function (req, res) {
  if (req.body.yenisifre) {
    const bilgiler = { token: req.params.token, yenisifre: req.body.yenisifre};
    axios
      .put(
        apiSecenekleri.sunucu +
          apiSecenekleri.apiYolu +
          apiSecenekleri.sifreYenilemeYolu,
        bilgiler
      )
      .then(function () {
        res.redirect("/giris");
      }).catch(function(hata){
        hataGoster(req,res,hata);
      });
  }
};

const profilSayfasiOlustur = function (req, res, kullanici) {
  res.render("profilbilgisi", {
    baslik: "Profil Sayfası",
    kullanici: kullanici,
  });
};

const profilGoruntule = function (req, res) {
  let kullanici = sessionKontrol(req);
  if (kullanici) {
    axios
      .get(
        apiSecenekleri.sunucu +
          apiSecenekleri.apiYolu +
          apiSecenekleri.profilYolu,
        setToken(kullanici.token)
      )
      .then(function (response) {
        profilSayfasiOlustur(req, res, response.data);
      });
  } else res.redirect("/giris");
};

const profilGuncelleSayfasiOlustur = function (req, res) {
  let kullanici = sessionKontrol(req);
  if (kullanici) {
    res.render("profilguncelle", {
      baslik: "Profilini Güncelle",
    });
  } else res.redirect("/giris");
};

const profilGuncelleButton = function (req, res) {
  let kullanici = sessionKontrol(req);
  if (kullanici) {
    gonderilenKullanici = {
      adsoyad: req.body.adsoyad,
      eposta: req.body.eposta,
      sifre: req.body.sifre,
    };
    axios
      .put(
        apiSecenekleri.sunucu +
          apiSecenekleri.apiYolu +
          apiSecenekleri.profilGuncelleYolu,
        gonderilenKullanici,
        setToken(kullanici.token)
      )
      .then(function () {
        req.session.destroy();
        res.redirect("/giris");
      });
  } else res.redirect("/giris");
};

const cikisYap = function (req, res) {
  req.session.destroy();
  res.redirect("/giris");
};

const kayitYapSayfasiOlustur = function (req, res) {
  res.render("kayit", {
    baslik: "Kayıt Sayfası",
  });
};
//TODO: eposta var mı kontrolü
const kayitOlButton = function (req, res) {
  if (!req.body.eposta || !req.body.sifre || !req.body.adsoyad) {
    hataGoster(req, res, { status: 400 });
  } else {
    let gonderilenKullanici = {
      adsoyad: req.body.adsoyad,
      eposta: req.body.eposta,
      sifre: req.body.sifre,
    };
    axios
      .post(
        apiSecenekleri.sunucu +
          apiSecenekleri.apiYolu +
          apiSecenekleri.kayitYolu,
        gonderilenKullanici
      )
      .then(function () {
        res.redirect("/giris");
      });
  }
};

module.exports = {
  girisYapSayfasiOlustur,
  girisYapButton,
  sifremiYenileSayfasiOlustur,
  sifremiYenileButton,
  yeniSifreAyarlaButton,
  yeniSifreAyarlaSayfasiOlustur,
  kayitYapSayfasiOlustur,
  kayitOlButton,
  profilGoruntule,
  profilGuncelleSayfasiOlustur,
  profilGuncelleButton,
  cikisYap,
};
