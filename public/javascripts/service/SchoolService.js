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

exports.selectAffiliationList	=	function( conditions, callback ) {
	var queryArray	=	new Array();
	queryArray.push( "SELECT * FROM SchoolAffiliation" );

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

/* 전공 등록 */
exports.insertMajor	=	function( data, callback ) {
	mySqlClient.query( 
		"INSERT INTO Majors( name ) VALUES( ? )", 
		[ data.name ], 
		callback
	);
};

exports.selectMajors	=	function( conditions, callback ) {
	var queryArray	=	new Array();
	queryArray.push( "SELECT * FROM Majors" );

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