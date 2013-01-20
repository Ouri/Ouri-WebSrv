var HmUtils   		= 	require( '../../public/javascripts/helper/HmUtils.js' )
,	UserService   	= 	require( '../../public/javascripts/service/UserService.js' )
,	GroupService	=	require( '../../public/javascripts/service/GroupService.js' )
,	FileService   	= 	require( '../../public/javascripts/service/FileService.js' )
,	ResponseHandler = 	require( '../../public/javascripts/handler/ResponseHandler.js' );

/** 
*사용자 계정관련 컨트롤러 
*/

/* 사용자 정보 조회 */
exports.selectOne	=	function( req, res ) {
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
					code 	: gResultCode.no_data,
					date 	: resData,
				};	

			} else {
			/* 회원정보가 존재하는 경우 처리 */	
				resJson	=	{
					code 	: gResultCode.success,
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

	/* 사용자 인증 체크 */
	gSecurityManager.isAuthorized( req, id, function( resultCode ) {
		/* 인증이 되어있지 않다면. */
		if( resultCode != gResultCode.success ) {
			var resJson	=	{
				code : resultCode,
				date : HmUtils.ISODateString( new Date() )
			};	

			ResponseHandler.response( res, JSON.stringify( resJson ) );
			return;
		}	

		UserService.update( id, userData, function( error, result, fields ) {
			var resJson	=	null;
			var resData	=	HmUtils.ISODateString( new Date() );

			if( error ) throw error;
			else {
				resJson	=	{
					code : gResultCode.success,
					date : resData
				};				
			}

			ResponseHandler.response( res, JSON.stringify( resJson ) );
		});
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

	/* 사용자 인증 체크 */
	gSecurityManager.isAuthorized( req, id, function( resultCode ) {
		/* 인증이 되어있지 않다면. */
		if( resultCode != gResultCode.success ) {
			var resJson	=	{
				code : resultCode,
				date : HmUtils.ISODateString( new Date() )
			};	

			ResponseHandler.response( res, JSON.stringify( resJson ) );
			return;
		}

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
					code : gResultCode.success,
					result : images
				};

			} else {
				/* 이미지 파일이 아닌 경우에는 에러 처리함. */
				resJson	=	{
					code : gResultCode.only_image,
				};
			}

		} else {
			/* 업로드 할 파일이 없는 경우 */
			resJson	=	{
				code : gResultCode.no_file,
			};
		}

		resJson.date 	=	HmUtils.ISODateString( new Date() );
		ResponseHandler.response( res, JSON.stringify( resJson ) );
	});	
};


/* 디폴트 그룹 생성 */
exports.joinDefaultGroups	=	function( req, res ) {
	console.log( 'createDefaultGroup Request' );

	/* 회원가입 성공 후에는 그룹생성 들어가야 함. */
	// 그룹이 존재하는지 체크
	// 있으면 해당 그룹에 사용자 등록
	// 없으면 생성하고 해당 그룹에 사용자 등록
	var id 		=	req.params.userId;
	var fields	=	"university_id, college_id, university_admission_year";

	/* 사용자 인증 체크 */
	gSecurityManager.isAuthorized( req, id, function( resultCode ) {
		/* 인증이 되어있지 않다면. */
		if( resultCode != gResultCode.success ) {
			var resJson	=	{
				code : resultCode,
				date : HmUtils.ISODateString( new Date() )
			};	

			ResponseHandler.response( res, JSON.stringify( resJson ) );
			return;
		}

		UserService.selectOne( id, fields, function( error, result, fields ) {
			var jsonData	=	result;

			GroupService.createDefaultGroups( id, jsonData[ 0 ], function( error, result, fields ) {
				var resJson	=	null;
				var resDate	=	HmUtils.ISODateString( new Date() );

				if( error ) throw error; 
				else {
					resJson	=	{
						code : gResultCode.success,
						date : resDate
					};								
				}

				ResponseHandler.response( res, JSON.stringify( resJson ) );
			});
		});

	});
};

/* 사용자 가입 그룹 목록 요청 */
exports.selectGroups	=	function( req, res ) {
	var id 			=	req.params.userId
	var fields		=	req.query[ "fields" ];

		/* 사용자 인증 체크 */
	gSecurityManager.isAuthorized( req, id, function( resultCode ) {
		/* 인증이 되어있지 않다면. */
		if( resultCode != gResultCode.success ) {
			var resJson	=	{
				code : resultCode,
				date : HmUtils.ISODateString( new Date() )
			};	

			ResponseHandler.response( res, JSON.stringify( resJson ) );
			return;
		}

		GroupService.selectGroups( id, fields, function( error, result, fields ) {
			var resJson		=	null;
			var resData		=	HmUtils.ISODateString( new Date() );

			if( error ) throw error;
			else {
				/* 결과가 존재하지 않는 경우 처리 */
				if( result.length == 0 ) {
					resJson	=	{
						code : gResultCode.no_data,
						date : resData,
					};	

				} else {
				/* 회원정보가 존재하는 경우 처리 */	
					resJson	=	{
						code 	: gResultCode.success,
						date 	: resData,
						result 	: result
					};	
				}		
			}
			ResponseHandler.response( res, JSON.stringify( resJson ) );
		});

	});
};
