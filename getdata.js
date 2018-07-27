'use strict';
var config = require('./conf/config');
var mysql = require('mysql');
var moment = require("moment");
var async = require("async");
var sha1 = require('js-sha1');
var getdata = {};

var conn = {
    connectionLimit : config.connlimit,
    host            : config.hostname,
    user            : config.username,
    password        : config.password,
    database        : config.database
};

var connection = mysql.createConnection(conn);

getdata.score = function(data, callback) {
	var _data = [];
	var score = [
		{"value": 0, "label": "0"},
		{"value": 2000, "label": "0 - 1999"},
		{"value": 4000, "label": "2000 - 3999"},
		{"value": 6000, "label": "4000 - 5999"},
		{"value": 8000, "label": "6000 - 7999"},
		{"value": 10000, "label": "8000 - 10000"}
    ]

	var query = " select id_question, question from " + conn.database + ".question where active=true";
	connection.query(query, function(err, result, fields) {
		if( result ) {
			for( var key in result ) {
				_data.push({
					"id": result[key].id_question,
					"question": result[key].question,
					"score": score,
				})
			}
    		callback(JSON.stringify({ "success": true, "data": _data }));
		} else {
			failed = "There is no data question";
			callback(JSON.stringify({ "failed": true, "msg": "There is no data question" }));
		}
	});
}

getdata.profile = function(data, callback) {
    var query = " select * from " + conn.database + ".user where username=" + mysql.escape(data.user);
    connection.query(query, function(err, result, fields) {
        if( result ) {
            callback(JSON.stringify(result[0]));
        } else {
        	callback(JSON.stringify({ "failed": true, "msg": "There is no data profile" }));
        }
    });
}






module.exports = getdata;
