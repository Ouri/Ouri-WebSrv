
/**
 * Module dependencies.
 */
var express   = require( 'express' )
  , http      = require( 'http' )
  , path      = require( 'path' );

/* routes 선언. Controller로 쓰입니다. */
var index      = require( './routes/controller/index' )
  , sign       = require( './routes/controller/sign' )
  , users      = require( './routes/controller/user' )
  , skills     = require( './routes/controller/skill' )
  , schools    = require( './routes/controller/schools' );

/* Express 설정 */
var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* Index */
app.get( '/', index.index );

/* sign */
app.post( '/sign/on', sign.signOn );
app.post( '/sign/in', sign.signIn );

/* User */
app.put( '/:userId/', users.update );

/* Skill */
app.post( '/skills/', skills.insert );

/* Schools */
app.get( '/schools/', schools.getSchools );
/* School Affiliation */
app.get( '/schools/meta/affiliation/', schools.getAffiliations );

/* 서버 실행 */
var server  =   http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( "Express server listening on port " + app.get( 'port' ) );
});
