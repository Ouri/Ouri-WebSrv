var crypto		=	require( 'crypto' );

/* 인가된 사용자인지 */
exports.isAuthorized	=	function( req, userId, callback  ) {
	var rawToken	=	req.headers[ gConfig.tokenHeaderName ] ;

	if( !rawToken ) {
		callback( gResultCode.not_login );
		return;
	}

	var decrypted	=	this.decrypt( rawToken, userId );
	if( !this.idCheck( JSON.parse( decrypted ).id, userId ) ) {
		callback( gResultCode.unauthorized );
		return;

	} 
	callback( gResultCode.success );
	return;
};


/* decipher */
exports.decrypt	=	function( rawToken, userId  ) {
	var decipher 	= 	crypto.createDecipher( gConfig.cipherAlgorithm, gConfig.tokenKey );
	var decrypted 	= 	decipher.update( rawToken, 'hex', 'utf8' );
	decrypted 		+= 	decipher.final( 'utf8' );

	return decrypted;
};

/* 아이디 체크 */
exports.idCheck	=	function( decId, userId ) {
	return decId == userId;
};