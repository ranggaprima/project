'use strict';
var config = require('./conf/config.js');
var mysql = require('mysql');
var express = require('express');
var parser = require('body-parser');
var apps = express();
var moment = require('moment');
var async = require('async');
var fs = require('fs');
var sha1 = require('js-sha1')
var dotenv = require('dotenv').config();
var getdata = require('./getdata.js');

var conn = {
    connectionLimit : config.connlimit,
    host            : config.hostname,
    user            : config.username,
    password        : config.password,
    database        : config.database
};

var connection = mysql.createConnection(conn);
apps.use(parser.json());
apps.use(parser.urlencoded({ extended: true }));
apps.use("/", express.static(__dirname));


apps.use(function(request, send, next) {
    send.header("Access-Control-Allow-Origin", "*");
    send.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


apps.post('/login', function(request, send) {
    if (request.body.instruction == '_login') {
        login(request.body, function(hasil) {
            send.header('Access-Control-Allow-Origin', '*');
            send.send(hasil);
        });
    }
});

apps.post('/post', function(request, send) {

    if (request.body.instruction == '_score') {
        getdata.score(request.body, function(data) {
            send.header('Access-Control-Allow-Origin', '*');
            send.send(data);
        });
    }

    if (request.body.instruction == '_profile') {
        getdata.profile(request.body, function(data) {
            send.header('Access-Control-Allow-Origin', '*');
            send.send(data);
        });
    }

    if (request.body.instruction == '_registration') {
        registration(request.body, function(data) {
            send.header('Access-Control-Allow-Origin', '*');
            send.send(data);
        });
    }

    if (request.body.instruction == '_saveprofile') {
        saveprofile(request.body, function(data) {
            send.header('Access-Control-Allow-Origin', '*');
            send.send(data);
        });
    }

    if (request.body.instruction == '_savescore') {
        savescore(request.body, function(data) {
            send.header('Access-Control-Allow-Origin', '*');
            send.send(data);
        });
    }

});


function login(data, callback) {
	console.log('Login Running...');
	var query = " select username from " + conn.database + ".user where username=" + mysql.escape(data.username) + " and password=" + mysql.escape(sha1(data.password));
    connection.query(query, function(err, result, fields) {
        if (result.length > 0) {
            callback(JSON.stringify({ "success": true, "msg": "Login Success" }));
        } else {
        	callback(JSON.stringify({ "failed": true, "msg": "Invalid Username or Password" }));
        }
    });	
}

function savescore(data, callback) {
	var id_user = ""
	var saving = "";
	var loan = "";
	var success = "";
	var failed = "";
	
	if( data.saving ) saving = data.saving;
	if( data.loan ) loan = data.loan;
	
	console.log('Saving Score Running...');
    async.series([
        function(callback) {
			if( saving == '' ) {
				failed = "Please fill your saving amount";
				callback(failed);
			} else if( loan == '' ) {
				failed = "Please fill your loan amount";
				callback(failed);
			} else {
				callback();
			}
        },

        function(callback) {
		 	var query = " select id_user from " + conn.database + ".user where username=" + mysql.escape(data.user);
			connection.query(query, function(err, result, fields) {
				id_user = result[0] ? result[0].id_user : 0
				callback();
			});
        },

        function(callback) {
			var query = " insert into " + conn.database + ".answer(id_user, question, answer, createdate) values("
			+ mysql.escape(id_user) +
			"," + mysql.escape('How much your saving amount ?') +
			"," + mysql.escape(saving) +
			"," + mysql.escape(moment().format("YYYY-MM-DD HH:mm:s")) + ")";
			console.log('New User: ' + query);
			connection.query(query, function(err, result, fields) {
				if (result) {
					callback();
				}
			});	
        },

        function(callback) {
			var query = " insert into " + conn.database + ".answer(id_user, question, answer, createdate) values("
			+ mysql.escape(id_user) +
			"," + mysql.escape('How much your loan amount ?') +
			"," + mysql.escape(loan) +
			"," + mysql.escape(moment().format("YYYY-MM-DD HH:mm:s")) + ")";
			console.log('New User: ' + query);
			connection.query(query, function(err, result, fields) {
				if (result) {
					callback();
				}
			});	
        }
        
    ], function(failed) {
        if( failed ) {
            callback(JSON.stringify({ "failed": true, "msg": failed }));
        } else {
            callback(JSON.stringify({ "success": true, "msg": success }));
        }
    })
}

function saveprofile(data, callback) {
	console.log('Saving Profile...');
	var name = data.name ? data.name : "";
	var sex = data.sex ? data.sex : "";
	var religion = data.religion ? data.religion : "";
	var address = data.address ? data.address : "";
	var city = data.city ? data.city : "";
	var hobby = data.hobby ? data.hobby : "";
	var about = data.about ? data.about : "";
	var workplace = data.workplace ? data.workplace : "";
	var workstatus = data.workstatus ? data.workstatus : "";
	var nationality = data.nationality ? data.nationality : "";
	var language = data.language ? data.language : "";
	var birthdate = data.birthdate ? moment(data.birthdate).format("YYYY-MM-DD HH:mm:s") : 0;
	var email = data.email ? data.email : "";
	var phone = data.phone ? data.phone : "";
	var linkedin = data.linkedin ? data.linkedin : "";
	var gplus = data.gplus ? data.gplus : "";

	var query = " update " + conn.database + ".user set " +
	"name=" + mysql.escape(name) +
	",sex=" + mysql.escape(sex) +
	",religion=" + mysql.escape(religion) +
	",address=" + mysql.escape(address) +
	",city=" + mysql.escape(city) +
	",hobby=" + mysql.escape(hobby) +
	",about=" + mysql.escape(about) +
	",workplace=" + mysql.escape(workplace) +
	",workstatus=" + mysql.escape(workstatus) +
	",nationality=" + mysql.escape(nationality) +
	",language=" + mysql.escape(language) +
	",birthdate=" + mysql.escape(birthdate) +
	",email=" + mysql.escape(email) +
	",phone=" + mysql.escape(phone) +
	",linkedin=" + mysql.escape(linkedin) +
	",gplus=" + mysql.escape(gplus) +
	",updatedate=" + mysql.escape(moment().format("YYYY-MM-DD HH:mm:s")) +
	" where username=" + mysql.escape(data.user);
	console.log('Save Profile: ' + query);
	connection.query(query, function(err, result, fields) {
		if (result) {
			callback(JSON.stringify({ "success": true, "msg": "Save profile success" }));
		} else {
			callback(JSON.stringify({ "failed": true, "msg": "Save profile failed" }));
		}
	});	
}


function registration(data, callback) {
	var uname = "";
	var username = "";
	var password = "";
	var confpassword = "";
	var email = "";
	var success = "";
	var failed = "";
	
	if( data.uname ) uname = data.uname;
	if( data.username ) username = data.username
	if( data.password ) password = data.password
	if( data.confpassword ) confpassword = data.confpassword
	if( data.email ) email = data.email;
	
	console.log('Registration Running...');
    async.series([
        function(callback) {
			if( uname == '' ) {
				failed = "Please fill name";
				callback(failed);
			} else if( username == '' ) {
				failed = "Please fill username";
				callback(failed);
			} else if( password == '' ) {
				failed = "Please fill password";
				callback(failed);
			} else if( confpassword == '' ) {
				failed = "Please fill confirmartion password";
				callback(failed);
			} else if( confpassword != password ) {
				failed = "Password confirmation is not match with password";
				callback(failed);
			} else if( email == '' ) {
				failed = "Please fill email";
				callback(failed);
			} else {
				var query = " insert into " + conn.database + ".user(name, username, password, email, createdate) values("
				+ mysql.escape(uname) +
				"," + mysql.escape(username) +
				"," + mysql.escape(sha1(confpassword)) +
				"," + mysql.escape(email) +
				"," + mysql.escape(moment().format("YYYY-MM-DD HH:mm:s")) + ")";
				connection.query(query, function(err, result, fields) {
					if (result) {
						success = "Registration new user success";
						callback();
					} else {
						failed = "Failed to process registration";
						callback(failed);
					}
				});	
			}
        },

        function(callback) {
		 	var query = " select username from " + conn.database + ".user where username=" + mysql.escape(data.username);
			console.log('Select User: ' + query);
			connection.query(query, function(err, result, fields) {
				if (result.length > 0) {
					failed = "Username is exist";
				    callback(failed);
				} else {
					callback();
				}
			});
        },
    ], function(failed) {
        if( failed ) {
            callback(JSON.stringify({ "failed": true, "msg": failed }));
        } else {
            callback(JSON.stringify({ "success": true, "msg": success }));
        }
    })
}





apps.listen(process.env.PORT);
console.log('');
console.log('|*****************************|');
console.log('Server Port	:' + process.env.PORT);
console.log('|*****************************|');
console.log('');


