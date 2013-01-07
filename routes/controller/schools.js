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
exports.selectAffiliations	=	function( req, res ) {
	console.log( "schools", 'schools selectAffiliationList' );

	var conditions	=	req.query[ "conditions" ];

	SchoolService.selectAffiliationList( conditions, function( error, result, fields ) {
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
exports.selectMajors	=	function( req, res ) {
	console.log( "schools", 'selectMajors' );

	var conditions	=	req.query[ "conditions" ];

	SchoolService.selectMajors( conditions, function( error, result, fields ) {
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

/* 스킬 등록 */
exports.insertMajor	=	function( req, res ) {
	console.log( 'skill insert Request' );

	var data	=	eval( req.body );

	SchoolService.insertMajor( data, function( error, result, fields ) {
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