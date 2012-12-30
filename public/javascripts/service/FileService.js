/**
* 파일 처리
*/
var fs   	= 	require( 'fs' );
var path 	=	require( 'path' );

/* 임시파일 이동 */
exports.move	=	function( srcPath, destPath, name ) {
	var filename	=	destPath + srcPath.substring( srcPath.lastIndexOf( "/" ) + 1, srcPath.length ) + "_" + name;

	if( fs.existsSync( destPath ) ) {
		fs.renameSync( srcPath, filename );
	} else {
		mkdir( destPath );
		fs.renameSync( srcPath, filename );
	}

	return filename;
};

function mkdir( path, root ) {
    var dirs = path.split( '/' ), dir = dirs.shift(), root = ( root || '' ) + dir + '/';

    try { fs.mkdirSync( root ); }
    catch ( e ) {
        //dir wasn't made, something went wrong
        if( !fs.statSync( root ).isDirectory() ) throw new Error( e );
    }

    return !dirs.length || mkdir( dirs.join( '/' ), root );
}