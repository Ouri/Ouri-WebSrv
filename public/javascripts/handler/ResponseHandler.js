exports.response	=	function( res, resultJson ) {
	res.writeHead( 200, { 'Content-Type' : 'application/json; charset=utf-8' } );
	res.write( resultJson );
	res.end();
};