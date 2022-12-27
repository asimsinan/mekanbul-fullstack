let ortak = require("./common/ortakkullanim");
const hakkinda = function (req, res) {
  res.render("hakkinda", { title: "Hakkında"});
};
const sonuc= function (req, res) {
  res.render("sonuc", { title: "Sonuç"});
};
module.exports = {
  hakkinda,sonuc
};
