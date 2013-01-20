/**
* 회원가입 컨트롤러
*/
var crypto			=	require( 'crypto' )
,	HmUtils   		= 	require( '../../public/javascripts/helper/HmUtils.js' )
,	UserService   	= 	require( '../../public/javascripts/service/UserService.js' )
,	GroupService	=	require( '../../public/javascripts/service/GroupService.js' )
,	ResponseHandler = 	require( '../../public/javascripts/handler/ResponseHandler.js' );


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
				code : gResultCode.success,
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
		var resJson		=	null;
		
		if( error ) throw error;
		else {
			if( result.length == 0 ) {
				resJson	=	{
					code : gResultCode.no_data,
					result : result
				};	
			} else {
				var userData	=	result[ 0 ];

				/* 인증토큰 생성 */
				var rawToken 	=	JSON.stringify( { id : userData.id, role : userData.role, timestamp : new Date() } );
				var cipher    	=   crypto.createCipher( gConfig.cipherAlgorithm, gConfig.tokenKey );
				var crypted 	= 	cipher.update( rawToken, 'utf8', 'hex' );
				crypted += 	cipher.final( 'hex' );

				resJson	=	{
					code : gResultCode.success,
					result : userData,
					accessToken : crypted
				};
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
				code : gResultCode.success,
				date : resDate,
				result : { is_exists : data > 0 }
			};				
		}

		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};
