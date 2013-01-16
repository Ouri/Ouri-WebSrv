var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var UserService   		= 	require( '../../public/javascripts/service/UserService.js' );
var GroupService		=	require( '../../public/javascripts/service/GroupService.js' );
var ResponseHandler   	= 	require( '../../public/javascripts/handler/ResponseHandler.js' );


/* 그룹회원 리스트 요청 */
exports.getGroupUsers	=	function( req, res ) {
	var id 			=	req.params.groupId;
	var fields		=	req.query[ "fields" ];
	var limit		=	req.query[ "limit" ];

	GroupService.selectGroupUsers( id, fields, limit, function( error, result, fields ) {
		var resJson		=	null;
		var resData		=	HmUtils.ISODateString( new Date() );

		if( error ) throw error;
		else {
			/* 결과가 존재하지 않는 경우 처리 */
			if( result.length == 0 ) {
				resJson	=	{
					code 	: "NO_DATA",
					date 	: resData,
				};	

			} else {
			/* 회원정보가 존재하는 경우 처리 */	
				resJson	=	{
					code 	: "SUCCESS",
					date 	: resData,
					result 	: result
				};	

			}		
		}

		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};