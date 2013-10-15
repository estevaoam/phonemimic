LightsaberMovements = {}

LightsaberMovements.start = function(io){
  io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
  });
}

exports.LightsaberMovements = LightsaberMovements;
