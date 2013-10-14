
/*
 * GET home page.
 */

var QRCode = require('qrcode-npm');
var crypto = require('crypto');

exports.index = function(req, res){
  var qr = QRCode.qrcode(4, 'M');
  var hash = crypto.createHash('md5').update((Math.random() * 100).toString()).digest("hex");

  qr.addData(hash);
  qr.make();
  var imageTag = qr.createImgTag(4);
  res.render('index', { title: 'Express', imageTag: imageTag });
};
