var mySqlClient 	= 	require( '../../../public/javascripts/db/MySqlHandler.js' ).sqlClient;

/* 사용자 정보 생성 */
exports.insert	=	function( data, callback ) {
	var email			=	data.email,
		name			=	data.name,
		pw				=	data.pw,
		mobileNo		=	data.mobile_no,
		fbToken			=	data.fb_token;	

	var result	=	mySqlClient.query( 
		"INSERT INTO Users( email, name, pw, mobile_no, fb_token ) VALUES( ?, ?, ?, ?, ? )", 
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
	queryArray.push( "UPDATE Users SET " );

	/* Json Data의 프로퍼티를 이용해서 Field를 조합함. */
	for( p in data ) {
		queryArray.push( p );
		queryArray.push( " = " );
		queryArray.push( data[ p ] );
		queryArray.push( "," );
	}

	/* 쿼리 문자열을 생성하고 마지막 ,를 제거함. */
	var queryString	=	queryArray.join( "" );
	queryString	=	queryString.substring( 0, queryString.length - 1 );
	queryString	=	queryString + " Where id = ?";

	mySqlClient.query( queryString, [ id ], callback );
};

/* 사용자 계정 존재확인 */
exports.check	=	function( data, callback ) {
	var email		=	data.email,
		fbToken		=	data.fb_token;

	mySqlClient.query( 
		"SELECT * FROM Users WHERE email = ? AND fb_token = ?", 
		[ email, fbToken ], 
		callback 
	);
};
