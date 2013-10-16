$(function(){
  var host = location.origin.replace(/^http/, 'ws');
  var socket = io.connect(host + '/' + sid);

  var xEl = $('#x'),
      yEl = $('#y'),
      zEl = $('#z');

  socket.on('connect', function(data) {
    socket.emit('registerKind', 'server');
  });

  socket.on('showMovements', function(data){
    xEl.text(data.alpha);
    yEl.text(data.beta);
    zEl.text(data.gamma);
  });
});
