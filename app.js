
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

/* meta 정보들 뭐라고 분류하기 애매해서 meta로 묶었음. 향후 카테고리화 할 예정. */
app.post( '/meta//skills/', skills.insert );
app.get( '/meta/schoolAffiliation/', schools.selectAffiliations );
app.get( '/meta/majors/', schools.selectMajors );
app.post( '/meta/majors/', schools.insertMajor );


/* Schools */
app.get( '/schools/', schools.getSchools );


/* 서버 실행 */
var server  =   http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( "Express server listening on port " + app.get( 'port' ) );
});
