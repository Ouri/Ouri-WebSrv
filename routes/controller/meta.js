var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var MetaService   		= 	require( '../../public/javascripts/service/MetaService.js' );
var ResponseHandler   	= 	require( '../../public/javascripts/handler/ResponseHandler.js' );

/* 학부/계열 검색 */
exports.selectAffiliations	=	function( req, res ) {
	console.log( "schools", 'selectAffiliations' );

	var conditions	=	req.query[ "conditions" ];

	MetaService.selectAffiliationList( conditions, function( error, result, fields ) {
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

/* 전공 검색 */
exports.selectMajors	=	function( req, res ) {
	console.log( "schools", 'selectMajors' );

	var conditions	=	req.query[ "conditions" ];

	MetaService.selectMajors( conditions, function( error, result, fields ) {
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

/* 전공 등록 */
exports.insertMajor	=	function( req, res ) {
	console.log( 'insertMajor' );

	var data	=	eval( req.body );

	MetaService.insertMajor( data, function( error, result, fields ) {
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

/* 스킬 등록 */
exports.insertSkill	=	function( req, res ) {
	console.log( 'insertSkill' );

	var data	=	eval( req.body );

	MetaService.insertSkill( data, function( error, result, fields ) {
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

/* 전공 검색 */
exports.selectSkills	=	function( req, res ) {
	console.log( "schools", 'selectSkills' );

	var conditions	=	req.query[ "conditions" ];

	MetaService.selectSkills( conditions, function( error, result, fields ) {
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

/* 직장 등록 */
exports.insertWorkplace	=	function( req, res ) {
	console.log( 'insertWorkplace' );

	var data	=	eval( req.body );

	MetaService.insertWorkplace( data, function( error, result, fields ) {
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

/* 전공 검색 */
exports.selectWorkplaces	=	function( req, res ) {
	console.log( "schools", 'selectWorkplaces' );

	var conditions	=	req.query[ "conditions" ];

	MetaService.selectWorkplaces( conditions, function( error, result, fields ) {
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