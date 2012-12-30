/**
* 회원가입 컨트롤러
*/
var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var UserService   		= 	require( '../../public/javascripts/service/UserService.js' );
var ResponseHandler   	= 	require( '../../public/javascripts/handler/ResponseHandler.js' );


/* 회원가입 처리 */
exports.signOn	=	function( req, res ) {
	console.log( 'signOn Request' );

	var userData	=	eval( req.body );
	UserService.insert( userData, function( error, result, fields ) {
		var resJson	=	null;
		var resData	=	HmUtils.ISODateString( new Date() );

		if( error ) throw error; 
		else {
			resJson	=	{
				code : "SUCCESS",
				date : resData,
				id : result.insertId
			};				
		}

		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};

/* 로그인 처리 */
exports.signIn	=	function( req, res ) {
	console.log( 'signCheck Request' );

	var userData	=	eval( req.body );
	UserService.check( userData, function( error, result, fields ) {
		var resJson	=	null;

		if( error ) throw error;
		else {
			resJson	=	{
				code : "SUCCESS",
				date : HmUtils.ISODateString( new Date() )
			};
		}	

		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};
