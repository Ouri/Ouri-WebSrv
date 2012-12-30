var mysql     = require( 'mysql' );

/* MySQL Configuration */
exports.sqlClient    = mysql.createConnection( {
  host : '54.235.197.14',
  post : '3306',
  user : 'developer',
  password : 'ouri!@#$',
  database : 'Ouri',
  debug : false
});
