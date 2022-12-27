let ortak =require("./common/ortakkullanim");

let apiSecenekleri = ortak.apiSecenekleri;
let sessionKontrol = ortak.sessionKontrol;
let mekanBilgisiGetir=ortak.mekanBilgisiGetir;
let hataGoster=ortak.hataGoster;
let setToken=ortak.setToken;
const axios = require("axios");

const mekanEkleSayfasiOlustur = function (req, res) {
    let kullanici = sessionKontrol(req);
    if (kullanici && kullanici.rol === "admin") {
      res.render("mekanekle", {
        baslik: " Yeni Mekan Ekle",
        sayfaBaslik: " Yeni Mekan Ekle"
      });
    } else res.redirect("/giris");
  };
  
  const mekanEkleButton = function (req, res) {
    let kullanici = sessionKontrol(req);
    if (kullanici) {
      if (
        !req.body.mekanAdi ||
        !req.body.mekanAdresi ||
        !req.body.enlem ||
        !req.body.boylam ||
        !req.body.imkanlar ||
        !req.body.acilis1 ||
        !req.body.kapanis1 ||
        !req.body.gunler1 ||
        !req.body.gunler2 ||
        !req.body.acilis2
      ) {
        hataGoster(req,res, { status: 400 });
      } else {
        let gonderilenMekan = {
          ad: req.body.mekanAdi,
          adres: req.body.mekanAdresi,
          imkanlar: req.body.imkanlar,
          enlem: req.body.enlem,
          boylam: req.body.boylam,
          gunler1: req.body.gunler1,
          acilis1: req.body.acilis1,
          kapanis1: req.body.kapanis1,
          kapali1: req.body.kapali1 == "on",
          gunler2: req.body.gunler2,
          acilis2: req.body.acilis2,
          kapanis2: req.body.kapanis2,
          kapali2: req.body.kapali2 == "on",
        };
        axios
          .post(
            apiSecenekleri.sunucu +
              apiSecenekleri.apiYolu +
              apiSecenekleri.mekanYolu,
            gonderilenMekan,
            setToken(kullanici.token)
          )
          .then(function () {
            res.redirect("/admin");
          });
      }
    } else res.redirect("/giris");
  };
  const mekanGuncelleSayfasiOlustur = function (req, res) {
 
    let kullanici = sessionKontrol(req);
    if (kullanici && kullanici.rol === "admin") {
      mekanBilgisiGetir(req, res, function (req, res, mekan) {
        let imkan = mekan.imkanlar[0];
        for (i = 1; i < mekan.imkanlar.length; i++) {
          imkan = imkan + "," + mekan.imkanlar[i];
        }
        mekan.imkanlar = imkan;
        res.render("mekanguncelle", {
          sayfaBaslik: mekan.ad + " Mekanını Güncelle",
          mekanBilgisi: mekan
        });
      });
    } else res.redirect("/giris");
  };
  
  const mekanGuncelleButton = function (req, res) {
    let kullanici = sessionKontrol(req);
    if (kullanici) {
      let gonderilenMekan, mekanid;
      mekanid = req.params.mekanid;
      if (
        !req.body.ad ||
        !req.body.adres ||
        !req.body.enlem ||
        !req.body.boylam ||
        !req.body.imkanlar ||
        !req.body.acilis1 ||
        !req.body.kapanis1 ||
        !req.body.gunler1 ||
        !req.body.gunler2 ||
        !req.body.acilis2
      ) {
        hataGoster(req,res, { status: 400 });
      } else {
        gonderilenMekan = {
          ad: req.body.ad,
          adres: req.body.adres,
          imkanlar: req.body.imkanlar,
          enlem: req.body.enlem,
          boylam: req.body.boylam,
          gunler1: req.body.gunler1,
          acilis1: req.body.acilis1,
          kapanis1: req.body.kapanis1,
          kapali1: req.body.kapali1 == "on",
          gunler2: req.body.gunler2,
          acilis2: req.body.acilis2,
          kapanis2: req.body.kapanis2,
          kapali2: req.body.kapali2 == "on",
        };
        axios
          .put(
            apiSecenekleri.sunucu +
              apiSecenekleri.apiYolu +
              apiSecenekleri.mekanYolu +
              mekanid,
            gonderilenMekan,
            setToken(kullanici.token)
          )
          .then(function () {
            res.redirect("/admin");
          });
      }
    } else res.redirect("/giris");
  };
  const mekanSil = function (req, res) {
    let mekanid = req.params.mekanid;
    let kullanici = sessionKontrol(req);
    if (kullanici && kullanici.rol === "admin") {
      axios
        .delete(
          apiSecenekleri.sunucu +
            apiSecenekleri.apiYolu +
            apiSecenekleri.mekanYolu +
            mekanid,
            setToken(kullanici.token)
        )
        .then(function () {
          res.redirect("/admin");
        });
    } else res.redirect("/giris");
  };
  const adminSayfasiOlustur = function (res, mekanListesi) {

    let mesaj;
    if (!(mekanListesi instanceof Array)) {
      mesaj = "API HATASI";
      mekanListesi = [];
    }
    res.render("admin", {
      baslik: "MekanBul-Admin",
      sayfaBaslik: {
        siteAd: "MekanBul-Admin",
        aciklama: "Mekanları Yönetin",
      },
      mekanlar: mekanListesi,
      mesaj: mesaj
    });
  };
  
  const admin = function (req, res) {
    let kullanici = sessionKontrol(req);
    if (kullanici && kullanici.rol === "admin") {
      axios
        .get(
          apiSecenekleri.sunucu +
            apiSecenekleri.apiYolu +
            apiSecenekleri.adminYolu,
            setToken(kullanici.token)
        )
        .then(function (response) {
          adminSayfasiOlustur(res, response.data);
        });
    }else if (kullanici && kullanici.rol === "kullanici")
      hataGoster(req,res, { status: 401 });
    else {
      res.redirect("/giris");
    }
  };
  
  module.exports = {
    admin,
    mekanSil,
    mekanEkleSayfasiOlustur,
    mekanEkleButton,
    mekanGuncelleSayfasiOlustur,
    mekanGuncelleButton
  };
    