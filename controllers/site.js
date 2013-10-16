var QRCode = require('qrcode-npm');
var crypto = require('crypto');

exports.index = function(req, res, next) {
  var app = req.app;

  // Create a session if for the window
  var session = new app.models.session.Session();
  session.save();
  var sid = session.getSid();
  var sio = app.clients.sio.of('/' + sid);
  var url = "http://" + req.headers.host + "/client/" + sid;

  // Create qrcode
  var qr = QRCode.qrcode(10, 'M');
  console.log(url);
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

  res.render('index', { sid: sid, imageTag: imageTag });
}

exports.client = function(req, res, next) {
  res.render('client', { sid: req.params.sid });
}
