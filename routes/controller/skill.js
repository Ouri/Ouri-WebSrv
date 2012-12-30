var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var SkillService   		= 	require( '../../public/javascripts/service/SkillService.js' );
var ResponseHandler   	= 	require( '../../public/javascripts/handler/ResponseHandler.js' );

/* 스킬 등록 */
exports.insert	=	function( req, res ) {
	console.log( 'signOn Request' );

	var data	=	eval( req.body );
	SkillService.insert( data, function( error, result, fields ) {
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