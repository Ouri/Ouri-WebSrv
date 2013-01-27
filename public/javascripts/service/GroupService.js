
/* Default 그룹생성 */
exports.createDefaultGroups	=	function( userId, data, callback ) {
	/* 프로시저 호출 */
	var queryString	=	'CALL prc_createDefaultGroups( ?, ?, ?, ? )';
	gSqlClient.query( 
		queryString, 
		[ userId, data.university_id, data.college_id, data.university_admission_year ], 
		callback 
	);
};

/* 사용자 가입 그룹 조회 */
exports.selectUserGroups	=	function( id, fields, callback ) {
	var queryArray	=	[];
	queryArray.push( "SELECT " );

	if( fields ) {
		queryArray.push( fields );
	} else {
		queryArray.push( "*" );
	}

	queryArray.push( " FROM v_Groups WHERE group_id IN ( SELECT group_id FROM GroupUsers WHERE user_id = ? )" );
	var queryString	=	queryArray.join( "" );
	var result	=	gSqlClient.query( 
		queryString, 
		[ id ], 
		callback 
	);
};

/* 사용자 가입 그룹 조회 */
exports.selectGroupOne	=	function( id, fields, callback ) {
	var queryArray	=	[];
	queryArray.push( "SELECT " );

	if( fields ) {
		queryArray.push( fields );
	} else {
		queryArray.push( "*" );
	}

	queryArray.push( " FROM v_Groups WHERE group_id = ?" );
	var queryString	=	queryArray.join( "" );
	var result	=	gSqlClient.query( 
		queryString, 
		[ id ], 
		callback 
	);
};

/* 그룹회원 리스트 조회 */
exports.selectGroupUsers	=	function( id, fields, limit, callback ) {
	var queryArray	=	[];
	queryArray.push( "SELECT " );

	if( fields ) {
		queryArray.push( fields );
	} else {
		queryArray.push( "*" );
	}

	queryArray.push( " FROM v_GroupUsers WHERE group_id = ?" );

	/* 페이징 처리 */
	if( limit ) {
		queryArray.push( " LIMIT " );	
		queryArray.push( limit );	
	}

	var queryString	=	queryArray.join( "" );
	var result	=	gSqlClient.query( 
		queryString, 
		[ id ], 
		callback 
	);
};

