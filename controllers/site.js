var QRCode = require('qrcode-npm');
var crypto = require('crypto');

exports.server = function(req, res, next) {
  var app = req.app;

  // Create a session for the window
  var sio = app.clients.sio;
  var gameSession = new app.models.gs.GameSession({ socketIO: sio });
  var sid = gameSession.getSid();

  // Url
  var url = "http://" + req.headers.host + "/client/" + sid;

  // Create qrcode
  var qr = QRCode.qrcode(10, 'M');
  qr.addData(url);
  qr.make();
  var imageTag = qr.createImgTag(4);


  // Starts socket.io socket
  sio.on('connection', function(socket){
    console.log('User ' + socket.sessionID +  ' connected!')
    socket.emit('welcome', 'Welcome user!');
  });

  sio.on('orientation', function(data){
    console.log(data);
  });

  res.render('server', { sid: sid, imageTag: imageTag });
}

exports.client = function(req, res, next) {
  res.render('client', { sid: req.params.sid });
}
