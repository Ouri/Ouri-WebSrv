
/**
 * Module dependencies.
 */
var express   = require( 'express' )
  , http      = require( 'http' )
  , path      = require( 'path' )
  , winston   = require( 'winston' )
  , fs        = require( 'fs' );

/* routes 선언. Controller로 쓰입니다. */
var index     = require( './routes/controller/index' )
  , sign      = require( './routes/controller/sign' )
  , users     = require( './routes/controller/user' )
  , schools   = require( './routes/controller/schools' )
  , search    = require( './routes/controller/search' )
  , meta      = require( './routes/controller/meta' );

/* Log 설정 */
var logger  = new ( winston.Logger )( {
  transports: [
    new ( winston.transports.Console )(),
    new ( winston.transports.File )( { 
      filename : './logs/ouri-error.log',
      level : 'error' ,
      maxsize : 1048576,
      json: true
    })
  ]
});

/* Express 설정 */
var app = express();
app.configure(function(){
  app.set( 'port', process.env.PORT || 3000 );
  app.set( 'views', __dirname + '/views' );
  app.set( 'view engine', 'jade' );
  app.use( express.favicon() );
  app.use( express.logger( 'dev' ) );
  app.use( express.cookieParser() );

  /* 올라오는 파일 용량 제한 */
  app.use( express.limit( '10mb' ) );
  /* 기본 Temp 폴더 지정 */
  app.use( express.bodyParser( { uploadDir: __dirname + '/tmp' } ) );
  app.use( express.methodOverride() );
  app.use( app.router );

  app.use( function( err, req, res, next ) {      
      logger.error({ 
                      remoteAddress : req.connection.remoteAddress, 
                      originalUrl : req.originalUrl,
                      originalMethod : req.originalMethod,
                      headers : req.headers,
                      body : req.body,
                      error : err 
                  });

      res.writeHead( 500, { 'Content-Type' : 'application/json; charset=utf-8' } );
      res.write( err );
      res.end();
  });

  /* static 파일들을 제공해주기 위한 폴더 제공 */
  app.use( express.static( path.join( __dirname, 'public' ) ) );
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* Index */
app.get( '/', index.index );

/* sign */
app.post( '/sign/on', sign.signOn );
app.post( '/sign/in', sign.signIn );
app.get( '/sign/email/', sign.emailCheck );

/* User */
app.get( '/:userId/', users.selectOne );
app.put( '/:userId/', users.update );
app.post( '/:userId/profile/', users.profileUpload );

/* Schools */
app.get( '/schools/', schools.getSchools );

/* Search */
app.get( '/search/users/', search.findUsers );

/* meta 정보들 뭐라고 분류하기 애매해서 meta로 묶었음. 향후 카테고리화 할 예정. */
app.get( '/meta/skills/', meta.selectSkills );
app.post( '/meta/skills/', meta.insertSkill );

app.get( '/meta/schoolAffiliation/', meta.selectAffiliations );

app.get( '/meta/majors/', meta.selectMajors );
app.post( '/meta/majors/', meta.insertMajor );

app.get( '/meta/workplaces/', meta.selectWorkplaces );
app.post( '/meta/workplaces/', meta.insertWorkplace );


/* 서버 실행 */
var server  =   http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( "Express server listening on port " + app.get( 'port' ) );
});
