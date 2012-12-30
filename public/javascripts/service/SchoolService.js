var mySqlClient 	= 	require( '../../../public/javascripts/db/MySqlHandler.js' ).sqlClient;

/* 학교 리스트 요청 */
exports.selectList	=	function( fields, conditions, callback ) {
	var queryArray	=	new Array();
	queryArray.push( "SELECT " );

	if( fields ) {
		queryArray.push( fields );
	} else {
		queryArray.push( "*" );
	}
	
	queryArray.push( " FROM Schools" );

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

exports.selectAffiliationList	=	function( fields, conditions, callback ) {
	var queryArray	=	new Array();
	queryArray.push( "SELECT " );

	if( fields ) {
		queryArray.push( fields );
	} else {
		queryArray.push( "*" );
	}
	
	queryArray.push( " FROM SchoolAffiliation" );

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