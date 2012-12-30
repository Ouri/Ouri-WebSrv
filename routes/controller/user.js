var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var UserService   		= 	require( '../../public/javascripts/service/UserService.js' );
var ResponseHandler   	= 	require( '../../public/javascripts/handler/ResponseHandler.js' );

/** 
*사용자 계정관련 컨트롤러 
*/

/* 사용자 계정정보 업데이트 */
exports.update	=	function( req, res ) {
	console.log( 'Update User : ' + req.params.userId );

	var id 			=	req.params.userId
	var userData	=	eval( req.body );

	UserService.update( id, userData, function( error, result, fields ) {
		var resJson	=	null;
		var resData	=	HmUtils.ISODateString( new Date() );

		if( error ) throw error;
		else {
			resJson	=	{
				code : "SUCCESS",
				date : resData
			};				
		}

		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};