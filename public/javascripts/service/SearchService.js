var mySqlClient 	= 	require( '../../../public/javascripts/db/MySqlHandler.js' ).sqlClient;

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

	mySqlClient.query( 
		queryString, 
		callback 
	)
};