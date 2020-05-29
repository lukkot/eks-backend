const mysql = require('mysql');

const env = require('./environment_variables.js');

const connection = mysql.createConnection({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD
});
exports.connection = connection;

exports.getIpAndTimestamp = function() {
    return new Promise(function(resolve, reject){
        connection.query(
            "SELECT SUBSTRING_INDEX(host,':',1) as 'ip', CURRENT_TIMESTAMP() as 'timestamp' FROM information_schema.processlist WHERE ID=connection_id()",
            function (error, results, fields) {
                if (error) reject(error);
                
                resolve(results);
            }
        );
    })
}
