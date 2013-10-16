var host = location.origin.replace(/^http/, 'ws');
var socket = io.connect(host + '/' + sid);
socket.on('connect', function(data) {
  console.log("Connected sucessfully ", this.socket.sessionid);
});

socket.on('welcome', function(data) {
  console.log(data);
})

var handleOrientation = function(event) {
  console.log(event);
  socket.emit('orientation', event);
}

window.addEventListener('deviceorientation', handleOrientation, true);
