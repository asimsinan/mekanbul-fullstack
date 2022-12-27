var express = require("express");
var router = express.Router();
var ctrlMekanlar = require("../controllers/mekanlar");
var ctrlDigerleri = require("../controllers/digerleri");
var ctrlYorumlar = require("../controllers/yorumlar");
var ctrlKullanicilar = require("../controllers/kullanicilar");
var ctrlAdmin = require("../controllers/admin");

router.get("/", ctrlMekanlar.anaSayfa);
router.get("/mekan/:mekanid", ctrlMekanlar.mekanBilgisi);

router.get("/mekan/:mekanid/yorum/yeni", ctrlYorumlar.yorumEkleSayfasiOlustur);
router.post("/mekan/:mekanid/yorum/yeni", ctrlYorumlar.yorumEkleButton);

router.get("/hakkinda", ctrlDigerleri.hakkinda);
router.get("/sonuc", ctrlDigerleri.sonuc);

router.get("/profil", ctrlKullanicilar.profilGoruntule);
router.get("/profilguncelle", ctrlKullanicilar.profilGuncelleSayfasiOlustur);
router.post("/profilguncelle", ctrlKullanicilar.profilGuncelleButton);
router.get("/kayit", ctrlKullanicilar.kayitYapSayfasiOlustur);
router.post("/kayit", ctrlKullanicilar.kayitOlButton);
router.get("/giris", ctrlKullanicilar.girisYapSayfasiOlustur);
router.post("/giris", ctrlKullanicilar.girisYapButton);
router.get("/cikis", ctrlKullanicilar.cikisYap);
router.get("/sifremiyenile", ctrlKullanicilar.sifremiYenileSayfasiOlustur);
router.post("/sifremiyenile", ctrlKullanicilar.sifremiYenileButton);

router.get("/yenisifreuret/:token", ctrlKullanicilar.yeniSifreAyarlaSayfasiOlustur);
router.post("/yenisifreuret/:token", ctrlKullanicilar.yeniSifreAyarlaButton);

router.get("/admin", ctrlAdmin.admin);
//Mekan ekleme sayfası rotası
router.get("/admin/mekan/yeni", ctrlAdmin.mekanEkleSayfasiOlustur);
//Mekanı ekle tuşunun çağıracağı metodun rotası
router.post("/admin/mekan/yeni", ctrlAdmin.mekanEkleButton);
//Mekan sil tuşunun çağıracağı metodun rotası
router.get("/admin/mekan/:mekanid/sil", ctrlAdmin.mekanSil);
//Mekanı güncelleme sayfasının rotatı
router.get(
  "/admin/mekan/:mekanid/guncelle",
  ctrlAdmin.mekanGuncelleSayfasiOlustur
);
//Mekanı güncelle tuşunun çağıracağı metodun rotası
router.get("/admin/mekan/:mekanid/guncelle", ctrlAdmin.mekanGuncelleSayfasiOlustur);
router.post("/admin/mekan/:mekanid/guncelle", ctrlAdmin.mekanGuncelleButton);
module.exports = router;
