var mySqlClient 	= 	require( '../../../public/javascripts/db/MySqlHandler.js' ).sqlClient;

/* 스킬 등록 */
exports.insertSkill	=	function( data, callback ) {
	mySqlClient.query( 
		"INSERT INTO Skills( name ) VALUES( ? )", 
		[ data.name ], 
		callback
	);
};

/* 스킬 검색 */
exports.selectSkills	=	function( conditions, callback ) {
	var queryArray	=	new Array();
	queryArray.push( "SELECT * FROM Skills" );

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

/* 전공 등록 */
exports.insertWorkplace	=	function( data, callback ) {
	mySqlClient.query( 
		"INSERT INTO Workplaces( name ) VALUES( ? )", 
		[ data.name ], 
		callback
	);
};

exports.selectWorkplaces	=	function( conditions, callback ) {
	var queryArray	=	new Array();
	queryArray.push( "SELECT * FROM Workplaces" );

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