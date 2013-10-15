/**
 * Module dependencies.
 */

var express = require('express');
var connect = require('connect');
var http = require('http');
var path = require('path');
var app = express();
var sessionStore = new connect.session.MemoryStore();
var load = require('express-load');

load('clients')
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app);

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session(sessionStore));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var server = http.createServer(app);

// Starts socket io
app.clients.sio = app.clients.sio.listen(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
