var mysql = require('mysql');

var conn=mysql.createConnection({
    host:
    user:
    password:
    database:
    port:
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected"); 
});

exports.mysql = mysql;
module.exports.conn = conn;
