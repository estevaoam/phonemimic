var crypto = require('crypto');

Session = function(){
  var hash = crypto.createHash('md5').update((Math.random() * 100).toString()).digest("hex");
  this.setSid(hash);

  return this;
}

Session.prototype.constructor = Session;
Session.prototype.setSid = function(sid){
  this.sid = sid;
  return this.sid;
}

Session.prototype.getSid = function(){
  return this.sid;
}

Session.prototype.save = function(){
}

exports.Session = Session;
