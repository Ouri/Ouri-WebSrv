var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var SchoolService   	= 	require( '../../public/javascripts/service/SchoolService.js' );
var ResponseHandler   	= 	require( '../../public/javascripts/handler/ResponseHandler.js' );

/* 학교 검색 */
exports.getSchools	=	function( req, res ) {
	console.log( "schools", 'schools selectList' );

	var fields		=	req.query[ "fields" ];
	var conditions	=	req.query[ "conditions" ];

	SchoolService.selectList( fields, conditions, function( error, result, fields ) {
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

/* 학부/계열 검색 */
exports.getAffiliations	=	function( req, res ) {
	console.log( "schools", 'schools selectAffiliationList' );

	var fields		=	req.query[ "fields" ];
	var conditions	=	req.query[ "conditions" ];

	SchoolService.selectAffiliationList( fields, conditions, function( error, result, fields ) {
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