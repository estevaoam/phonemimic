var crypto = require('crypto');

GameSession = function(opts){
  this.io = opts.socketIO;

  var hash = crypto.createHash('md5')
                   .update((Math.random() * 100).toString())
                   .digest("hex");
  this.setSid(hash);
  this.createEvents();

  return this;
}

GameSession.prototype.createEvents = function(){
  var io = this.io.of('/' + this.getSid());

  io.on('connection', function(socket){
    console.log('User', socket.sessionid, 'connected!');

    socket.on('registerKind', function(kind){
      socket.join(kind);
      console.log('OK, ', kind, ' connected with success. :-)')

      socket.on('orientationchange', function(pos){
        console.log(pos);
        socket.broadcast.to('server').emit('showMovements', pos);
      });
    });
  });
}

GameSession.prototype.setSid = function(sid){
  this.sid = sid;
  return this.sid;
}

GameSession.prototype.getSid = function(){
  return this.sid;
}

GameSession.prototype.save = function(){}

GameSession.prototype.constructor = GameSession;

exports.GameSession = GameSession;
