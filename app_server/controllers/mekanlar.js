let ortak=require("./common/ortakkullanim");
let apiSecenekleri=ortak.apiSecenekleri;

let hataGoster=ortak.hataGoster;
const axios = require("axios");

const mesafeyiFormatla = function (mesafe) {
  let yeniMesafe, birim;
  if (mesafe > 1) {
    yeniMesafe = parseFloat(mesafe).toFixed(1);
    birim = " km";
  } else {
    yeniMesafe = parseInt(mesafe * 1000, 10);
    birim = " m";
  }
  return yeniMesafe + birim;
};
const anaSayfa = function (req, res) {
  axios
    .get(
      apiSecenekleri.sunucu + apiSecenekleri.apiYolu + apiSecenekleri.mekanYolu,
      {
        params: {
          enlem: req.query.enlem,
          boylam: req.query.boylam,
        },
        headers: {
          "Accept-Encoding": "application/json",
        },
      }
    )
    .then(function (response) {
      let i, mekanlar;
      mekanlar = response.data;
      for (i = 0; i < mekanlar.length; i++) {
        mekanlar[i].mesafe = mesafeyiFormatla(mekanlar[i].mesafe);
      }
      anaSayfaOlustur(req, res, mekanlar);
    })
    .catch(function (hata) {
      hataGoster(req,res, hata);
    });
};
const anaSayfaOlustur = function (req, res, mekanListesi) {
  //Gelen mekanListesi eğer dizi tipinde değilse hata ver.
  if (!(mekanListesi instanceof Array)) {
    mesaj = "API HATASI: Birşeyler ters gitti";
    mekanListesi = [];
  } else {
    //Eğer belirlenen mesafe içinde mekan bulunamadıysa bilgilendir
    if (!mekanListesi.length) {
      mesaj = "Civarda Herhangi Bir Mekan Bulunamadı!";
    }else
      res.render("anasayfa", {
    baslik: "Anasayfa",
    sayfaBaslik: {
      siteAd: "MekanBul",
      slogan: "Civardaki Mekanları Keşfet!",
    },
    mekanlar: mekanListesi
  });
  }
  
};
const mekanBilgisi = function (req, res) {
  axios
    .get(
      apiSecenekleri.sunucu +
        apiSecenekleri.apiYolu +
        apiSecenekleri.mekanYolu +
        req.params.mekanid,
      {
        headers: {
          "Accept-Encoding": "application/json",
        },
      }
    )
    .then(function (response) {
      req.session.mekanAdi = response.data.ad;
      mekanBilgisiSayfasiOlustur(req, res, response.data);
    })
    .catch(function (hata) {
      hataGoster(req,res, hata);
    });
};
const mekanBilgisiSayfasiOlustur = function (req, res, mekanDetaylari) {
  mekanDetaylari.koordinat = {
    enlem: mekanDetaylari.koordinat[0],
    boylam: mekanDetaylari.koordinat[1],
  };
  res.render("mekanbilgisi", {
    mekanBaslik: mekanDetaylari.ad,
    mekanDetay: mekanDetaylari
  });
};
module.exports = {
  anaSayfa,
  mekanBilgisi
};
