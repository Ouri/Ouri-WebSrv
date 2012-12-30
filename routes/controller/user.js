var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var UserService   		= 	require( '../../public/javascripts/service/UserService.js' );
var	FileService   		= 	require( '../../public/javascripts/service/FileService.js' );
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

/* 프로필 사진 업로드 처리 */
exports.profileUpload	=	function( req, res ) {
	console.log( "user.js", 'profileUpload' );

	var id 		=	req.params.userId;
	var images	=	[];
	var resJson	=	null;

	if( req.files ) {
		var image	=	req.files.images;

		if( HmUtils.isImage( image ) ) {
			images.push( { name: image.name, size : image.size } );
			FileService.move( image.path, "./public/upload/" + id + "/profile/", image.name );

			resJson	=	{
				code : "SUCCESS",
				date : HmUtils.ISODateString( new Date() ),
				result : images
			};
		} else {
			/* 이미지 파일이 아닌 경우에는 에러 처리함. */
			resJson	=	{
				code : "ONLY_IMAGE",
				date : HmUtils.ISODateString( new Date() )
			};
		}

	} else {
		/* 업로드 할 파일이 없는 경우 */
		resJson	=	{
			code : "NO_FILE",
			date : HmUtils.ISODateString( new Date() ),
		};
	}

	ResponseHandler.response( res, JSON.stringify( resJson ) );
};