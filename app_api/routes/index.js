var express = require("express");
const jwt = require("express-jwt");
var router = express.Router();

const auth = jwt.expressjwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});

var ctrlMekanlar = require("../controllers/mekanlar");
var ctrlYorumlar = require("../controllers/yorumlar");
const ctrlKullanici = require("../controllers/kullanici");

router.post("/kayitol", ctrlKullanici.kayitOl);
router.post("/girisyap", ctrlKullanici.girisYap);

router
  .route("/mekanlar")
  .get(ctrlMekanlar.mekanlariListele)
  .post(auth, ctrlMekanlar.mekanEkle);

router.route("/admin").get(auth, ctrlMekanlar.tumMekanlariListele);

router
  .route("/mekanlar/:mekanid")
  .get(ctrlMekanlar.mekanGetir)
  .put(auth, ctrlMekanlar.mekanGuncelle)
  .delete(auth, ctrlMekanlar.mekanSil);

router.route("/mekanlar/:mekanid/yorumlar").post(auth, ctrlYorumlar.yorumEkle);

router
  .route("/mekanlar/:mekanid/yorumlar/:yorumid")
  .get(ctrlYorumlar.yorumGetir)
  .put(auth, ctrlYorumlar.yorumGuncelle)
  .delete(auth, ctrlYorumlar.yorumSil);

router.get("/profil", auth, ctrlKullanici.profilGoruntule);

router.put("/profilguncelle", auth, ctrlKullanici.profilGuncelle);

router.put("/sifreyenile", ctrlKullanici.sifreYenile);

module.exports = router;
