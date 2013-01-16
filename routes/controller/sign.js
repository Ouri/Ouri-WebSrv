/**
* 회원가입 컨트롤러
*/
var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var UserService   		= 	require( '../../public/javascripts/service/UserService.js' );
var GroupService		=	require( '../../public/javascripts/service/GroupService.js' );
var ResponseHandler   	= 	require( '../../public/javascripts/handler/ResponseHandler.js' );
var crypto				=	require( 'crypto' );


/* 회원가입 처리 */
exports.signOn	=	function( req, res ) {
	console.log( 'signOn Request' );

	var userData	=	eval( req.body );
	UserService.insert( userData, function( error, result, fields ) {
		var resJson	=	null;
		var resDate	=	HmUtils.ISODateString( new Date() );

		if( error ) throw error; 
		else {
			resJson	=	{
				code : "SUCCESS",
				date : resDate,
				id : result.insertId
			};	
						
		}

		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};

/* 로그인 처리 */
exports.signIn	=	function( req, res ) {
	console.log( 'signIn Request' );

	var userData	=	eval( req.body );
	UserService.check( userData, function( error, result, fields ) {
		var resJson	=	null;

		if( error ) throw error;
		else {
			if( result.length == 0 ) {
				resJson	=	{
					code : "NO_DATA",
					result : result
				};	
			} else {
				var userData	=	result[ 0 ];

				resJson	=	{
					code : "SUCCESS",
					result : userData
				};

				/* ID와 Facebook 토큰을 쿠키로 저장 */
				res.cookie( "Ouri-REMEMBER", userData.id + "-" + userData.fb_token, {
					maxAge : 1000 * 60 * 60 * 24 * 365
				});
			}
		}	

		resJson.date = HmUtils.ISODateString( new Date() );
		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};

/* 회원가입 처리 */
exports.emailCheck	=	function( req, res ) {
	console.log( 'emailCheck Request' );

	var email	=	req.query[ "email" ];

	UserService.isEmailExist( email, function( error, result, fields ) {
		var resJson	=	null;
		var resDate	=	HmUtils.ISODateString( new Date() );
		var data 	=	result[ 0 ];

		if( error ) throw error; 
		else {
			resJson	=	{
				code : "SUCCESS",
				date : resDate,
				result : { is_exists : data > 0 }
			};				
		}

		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};
