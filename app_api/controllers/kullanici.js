const passport = require("passport");
const mongoose = require("mongoose");
const Kullanici = mongoose.model("kullanici");

const kayitOl = async (req, res) => {
  if (!req.body.adsoyad || !req.body.eposta || !req.body.sifre) {
    return res.status(400).json({ mesaj: "Tüm alanlar gerekli" });
  }
  let kullanici = await Kullanici.findOne({ eposta: req.body.eposta}).exec();
  if(!kullanici){
  kullanici = new Kullanici();
  kullanici.adsoyad = req.body.adsoyad;
  kullanici.eposta = req.body.eposta;
  kullanici.cinsiyet=req.body.cinsiyet;
  kullanici.sifreAyarla(req.body.sifre);
  kullanici.save((hata) => {
    if (hata) {
      res.status(404).json(hata);
    } else {
      const token = kullanici.tokenUret();
      res.status(200).json({ token });
    }
  });
}
else{
  res.status(402).json({"status":402});
}
};

const sifreYenile = async (req, res) => {
  try {
    Kullanici.tokenDogrula(req.body.token, async (hata, user) => {
      if (!user){
        return res.status(401).send({
          mesaj: hata,
        });
      }
      else {
        let kullanici = await Kullanici.findOne({ eposta: user.eposta}).exec();
        kullanici.sifreAyarla(req.body.yenisifre);
        let token = kullanici.tokenUret();
        kullanici.save((hata, sonuc) => {
          guncelKullanici = {
            adsoyad: sonuc.adsoyad,
            eposta: sonuc.eposta,
            cinsiyet:sonuc.cinsiyet,
            id: sonuc._id,
            token: token,
          };
          if (hata) {
            res.status(404).json(hata);
          } else {
            res.status(201).send(guncelKullanici);
          }
        });
      }
    });
  } catch (hata) {
    console.log(hata);
    res.status(402).send(hata);
  }
};
const girisYap = (req, res) => {
  if (!req.body.eposta || !req.body.sifre) {
    return res.status(400).json({ mesaj: "Tüm alanlar gerekli" });
  }
  passport.authenticate("local", (err, kullanici, info) => {
    let token;
    if (err) {
      return res.status(404).json(err);
    }
    if (kullanici) {
      token = kullanici.tokenUret();
      res
        .status(200)
        .json({ adsoyad: kullanici.adsoyad, cinsiyet:kullanici.cinsiyet,eposta:kullanici.eposta, rol: kullanici.rol, token: token });
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
};

const profilGoruntule = (req, res) => {
  res.status(200).json({
    id: req.auth._id,
    eposta: req.auth.eposta,
    adsoyad: req.auth.adsoyad,
    cinsiyet:req.auth.cinsiyet,
    rol:req.auth.rol
  });
};

const profilGuncelle = async(req, res) => {
  if (!req.body.adsoyad || !req.body.eposta || !req.body.sifre|| !req.body.cinsiyet) {
    return res.status(400).json({ mesaj: "Tüm alanlar gerekli" });
  }
  let kullanici = await Kullanici.findOne({ eposta: req.auth.eposta }).exec();
  if(kullanici){
  kullanici.adsoyad = req.body.adsoyad
  kullanici.eposta = req.body.eposta;
  kullanici.cinsiyet=req.body.cinsiyet;
  kullanici.sifreAyarla(req.body.sifre);
  let token = kullanici.tokenUret();
  kullanici.save((hata, sonuc) => {
    guncelKullanici = {
      adsoyad: sonuc.adsoyad,
      eposta: sonuc.eposta,
      cinsiyet:sonuc.cinsiyet,
      id: sonuc._id,
      token:token
    };
    if (hata) {
      res.status(404).json(hata);
    } else {
      res.status(201).send(guncelKullanici);
    }
  });
} else 
  return res.status(401).send({
  "hata": "Token doğrulanamadı!",
});
};
module.exports = {
  kayitOl,
  sifreYenile,
  girisYap,
  profilGoruntule,
  profilGuncelle
};
