var mysql = require('mysql');

var conn=mysql.createConnection({
    host:"475spongebob.mysql.database.azure.com", 
    user:"spongebobAdmins", 
    password:"@css475UWBfa11", 
    database:"streamingservicetvshow", 
    port:3306
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected"); 
});

exports.mysql = mysql;
module.exports.conn = conn;