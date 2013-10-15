var QRCode = require('qrcode-npm');
var crypto = require('crypto');

exports.index = function(req, res, next) {
  var app = req.app;

  // Create a session if for the window
  var session = new app.models.session.Session();
  session.save();
  var sid = session.getSid();

  // Create qrcode
  var qr = QRCode.qrcode(4, 'M');
  qr.addData(sid);
  qr.make();
  var imageTag = qr.createImgTag(4);

  // Starts socket.io socket
  app.clients.sio.of('/' + sid).on('connection', function(socket){
    console.log('User ' + socket.sessionID +  ' connected!')
    socket.emit('welcome', 'Welcome user!');
  });

  res.render('index', { sid: sid, imageTag: imageTag });
}

exports.client = function(req, res, next) {
  res.render('client', { sid: req.params.sid });
}
