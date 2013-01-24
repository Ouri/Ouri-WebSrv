var mongoose 	= 	require( 'mongoose' );
var Schema 		= 	mongoose.Schema;

// localhost 에 testdb Database에 접속
mongoose.connect( 'mongodb://54.235.197.14:27017/ouri-dev' );

/*  Award 히스토리 모델 */
var AwardHistoryScheme	=	new Schema({
	id : String,
	sender : {
		id : String,
		name : String,
		profile_uri : String	
	},
	receiver : {
		id : String
	},
	regdate : Date
}, { collection: 'AwardHistories' } );

exports.AwardHistory 	=	mongoose.model( 'AwardHistories', AwardHistoryScheme );