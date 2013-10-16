var host = location.origin.replace(/^http/, 'ws');
var socket = io.connect(host + '/' + sid);

socket.on('connect', function(data) {
  socket.emit('registerKind', 'client');
});

socket.on('message', function(data) {
  console.log(data);
})


if (window.DeviceOrientationEvent) {
  var handleOrientation = function(event) {
    data = {
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    }

    socket.emit('orientationchange', data);
  }

  window.addEventListener('deviceorientation', handleOrientation, true);
}
