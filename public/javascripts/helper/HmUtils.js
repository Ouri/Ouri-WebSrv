/**
* Util 
*/

/* 날짜 데이터를 RFC3339 포맷의 문자열로 변환합니다 .*/
exports.ISODateString	=	function ( d ) {
	function pad( n ){ 
 		return n < 10 ? '0' + n : n
	}

	return d.getUTCFullYear() + '-'
    	+ pad( d.getUTCMonth() + 1 ) + '-'
      	+ pad( d.getUTCDate() ) + 'T'
      	+ pad( d.getUTCHours() ) + ':'
      	+ pad( d.getUTCMinutes() ) + ':'
      	+ pad( d.getUTCSeconds() ) + 'Z'
};

/* 이미지 파일인지 체크 */
exports.isImage	=	function ( file ) {
	var isImage	=	false;

	if( file.type.indexOf( 'image' ) > -1 ) {
		isImage	=	true;
	} 

	return isImage;
};