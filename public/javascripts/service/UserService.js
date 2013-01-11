var mySqlClient 	= 	require( '../../../public/javascripts/db/MySqlHandler.js' ).sqlClient;

/* 사용자 정보 조회 */
exports.selectOne	=	function( id, fields, callback ) {
	var queryArray	=	new Array();
	queryArray.push( "SELECT " );

	if( fields ) {
		queryArray.push( fields );
	} else {
		queryArray.push( "*" );
	}
	
	queryArray.push( " FROM v_Users WHERE id = ?" );

	var queryString	=	queryArray.join( "" );
	var result	=	mySqlClient.query( 
		queryString, 
		[ id ], 
		callback 
	);
};

/* 사용자 정보 생성 */
exports.insert	=	function( data, callback ) {
	var email			=	data.email,
		name			=	data.name,
		pw				=	data.pw,
		mobileNo		=	data.mobile_no,
		fbToken			=	data.fb_token;	

	var result	=	mySqlClient.query( 
		"INSERT INTO Users( email, name, pw, mobile_no, fb_token ) VALUES( ?, ?, PASSWORD( ? ), ?, ? )", 
		[ email, name, pw, mobileNo, fbToken ], 
		callback 
	);
};

/* 사용자 정보 업데이트 */
exports.update	=	function( id, data, callback ) {
	var universityId	=	data.university_id,
		universityAdmissionYear	=	data.university_admission_year,
		collegeId		=	data.college_id,
		skillId			=	data.skill_id;

	var queryArray	=	new Array();
	var fieldData	=	null;

	queryArray.push( "UPDATE Users SET " );

	/* Json Data의 프로퍼티를 이용해서 Field를 조합함. */
	for( p in data ) {
		queryArray.push( p );
		queryArray.push( " = " );

		fieldData	=	data[ p ];

		if( typeof fieldData == "string" ) {
			fieldData	=	"'" + fieldData + "'";
		}

		queryArray.push( fieldData );
		queryArray.push( "," );
	}

	/* 쿼리 문자열을 생성하고 마지막 ,를 제거함. */
	var queryString	=	queryArray.join( "" );
	queryString	=	queryString.substring( 0, queryString.length - 1 );
	queryString	=	queryString + " WHERE id = ?";

	console.log( queryString );

	mySqlClient.query( queryString, [ id ], callback );
};

/* 사용자 계정 credentials 매칭 확인 */
exports.check	=	function( data, callback ) {
	var email		=	data.email;
	var queryString =	"SELECT * FROM Users WHERE email = ? AND ";

	if( data.type == "facebook" ) {
		queryString 	+=	"fb_token = " + data.fb_token;
	} else {
		queryString 	+=	"pw = PASSWORD('" + data.pw + "')";
	}

	mySqlClient.query( queryString, [ email ], callback );
};

/* 사용자 email 유일성 체크 */
exports.isEmailExist	=	function( email, callback ) {
	var queryString =	"SELECT COUNT( * ) FROM Users WHERE email = ?";
	mySqlClient.query( queryString, [ email ], callback );
};
