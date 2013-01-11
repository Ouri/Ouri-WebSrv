var HmUtils   			= 	require( '../../public/javascripts/helper/HmUtils.js' );
var UserService   		= 	require( '../../public/javascripts/service/UserService.js' );
var	FileService   		= 	require( '../../public/javascripts/service/FileService.js' );
var ResponseHandler   	= 	require( '../../public/javascripts/handler/ResponseHandler.js' );

/** 
*사용자 계정관련 컨트롤러 
*/

/* 사용자 정보 조회 */
exports.selectOne	=	function( req, res ) {
	console.log( 'Get User : ' + req.params.userId );

	var id 			=	req.params.userId
	var fields		=	req.query[ "fields" ];

	UserService.selectOne( id, fields, function( error, result, fields ) {
		var resJson		=	null;
		var resData		=	HmUtils.ISODateString( new Date() );
		var userData	=	result[ 0 ];

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
					result 	: userData
				};	

			}		
		}

		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});
};

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

	var id 			=	req.params.userId,
		images		=	[],
		resJson		=	null,
		srcPath		=	null,
		destPath	=	null,
		filename	=	null;

	if( req.files ) {
		var image	=	req.files.images;

		/* 파일이 이미지가 맞는지 체크 함. */
		if( HmUtils.isImage( image ) ) {
			/* 이미지인 경우 이미지 업로드 */
			srcPath			=	image.path,
			destPath		=	"/upload/" + id + "/profile/",
			filename		=	image.name,
			uploadedPath	=	FileService.move( srcPath, destPath, filename );

			images.push( { name: filename, size : image.size, uploadedPath : uploadedPath } );

			/* 프로필 이미지 정보 업데이트 */
			UserService.update( id, { profile_uri : uploadedPath }, function( error, result, fields ) {
				if( error ) throw error;
			});

			resJson	=	{
				code : "SUCCESS",
				result : images
			};

		} else {
			/* 이미지 파일이 아닌 경우에는 에러 처리함. */
			resJson	=	{
				code : "ONLY_IMAGE",
			};
		}

	} else {
		/* 업로드 할 파일이 없는 경우 */
		resJson	=	{
			code : "NO_FILE",
		};
	}

	resJson.date 	=	HmUtils.ISODateString( new Date() );
	ResponseHandler.response( res, JSON.stringify( resJson ) );
};
