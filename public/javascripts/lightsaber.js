var socket = io.connect('http://localhost/' + sid);
socket.on('connect', function(data) {
  console.log("Connected sucessfully ", this.socket.sessionid);
});

socket.on('welcome', function(data) {
  console.log(data);
});
