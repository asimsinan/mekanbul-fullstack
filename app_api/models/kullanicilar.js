var mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const kullaniciSema = new mongoose.Schema({
  eposta: {
    type: String,
    unique: true,
    required: true,
  },
  adsoyad: {
    type: String,
    required: true,
  },
  cinsiyet: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default:"kullanici"
  },
  hash: String,
  salt: String,
  token: {
    type: String,
  },
});
kullaniciSema.methods.sifreAyarla = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password.toString(), this.salt, 1000, 64, "sha512").toString("hex");
};

kullaniciSema.methods.sifreDogrumu = function (password) {
  const hash = crypto.pbkdf2Sync(password.toString(), this.salt, 1000, 64, "sha512").toString("hex");
  return this.hash === hash;
};

kullaniciSema.methods.tokenUret = function () {
const skt= new Date();
skt.setDate(skt.getDate() + 7);
  return jwt.sign(
    {
      _id: this._id,
      eposta: this.eposta,
      adsoyad: this.adsoyad,
      cinsiyet:this.cinsiyet,
      rol:this.rol,
	    exp: parseInt(skt.getTime() / 10000, 10)
    },
    process.env.JWT_SECRET
  );
};

kullaniciSema.statics.tokenDogrula=function(token,cb){
	jwt.verify(token,process.env.JWT_SECRET,function(err,user){
			if(err) return cb(err);
			cb(null,user);
	})
};
mongoose.model("kullanici", kullaniciSema, "kullanicilar");
