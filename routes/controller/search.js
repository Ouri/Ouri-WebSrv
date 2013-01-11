var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var SearchService   	= 	require( '../../public/javascripts/service/SearchService.js' );
var ResponseHandler   	= 	require( '../../public/javascripts/handler/ResponseHandler.js' );

/* 학부/계열 검색 */
exports.findUsers	=	function( req, res ) {
	console.log( "search.js", 'findUsers' );

	var fields		=	req.query[ "fields" ];
	var conditions	=	req.query[ "conditions" ];

	SearchService.findUsers( fields, conditions, function( error, result, fields ) {
		var resJson	=	null;
		var resData	=	HmUtils.ISODateString( new Date() );

		if( error ) throw error;
		else {
			resJson	=	{
				code : "SUCCESS",
				date : resData,
				result : result
			};				
		}

		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};