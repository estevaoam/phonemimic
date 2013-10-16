var host = location.origin.replace(/^http/, 'ws');
var socket = io.connect(host + '/' + sid);
var last = Date.now();
var interval = 1000/30;

socket.on('connect', function(data) {
  socket.emit('registerKind', 'client');
});

socket.on('message', function(data) {
  console.log(data);
})


if (window.DeviceOrientationEvent) {
  var handleOrientation = function(event) {
    var now = Date.now();
    var delta = now - last;

    if (delta > interval) {
      last = now - (delta % interval);

      data = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      }

      socket.emit('orientationchange', data);
    }
  }

  window.addEventListener('deviceorientation', handleOrientation, true);
}
