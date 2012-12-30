var mySqlClient = require( '../../../public/javascripts/db/MySqlHandler.js' ).sqlClient;

/* 스킬 등록 */
exports.insert	=	function( data, callback ) {
	mySqlClient.query( 
		"INSERT INTO Skills( name ) VALUES( ? )", 
		[ data.name ], 
		callback
	);
};