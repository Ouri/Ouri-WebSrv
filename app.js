
/**
 * Module dependencies.
 */

var express   = require('express')
  , routes    = require('./routes')
  , http      = require('http')
  , path      = require('path')
  , mysql     = require( 'mysql' );

/* MySQL Configuration */
var sqlClient    = mysql.createConnection( {
  host : 'ec2-23-22-240-202.compute-1.amazonaws.com',
  post : '3306',
  user : 'developer',
  password : 'ouri!@#$',
  database : 'Ouri',
  debug : true
});

var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var server  =   http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
