/* 사용자 정보 조 */
exports.findUsers	=	function( fields, conditions, callback ) {
	var queryArray	=	new Array();
	queryArray.push( "SELECT " );

	if( fields ) {
		queryArray.push( fields );
	} else {
		queryArray.push( "*" );
	}
	
	queryArray.push( " FROM v_Users" );

	if( conditions ) {
		queryArray.push( " WHERE " );
		queryArray.push( conditions );
	}
	
	var queryString	=	queryArray.join( "" );

	gSqlClient.query( 
		queryString, 
		callback 
	)
};