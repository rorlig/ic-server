var should = require('should');
var request = require('supertest');
var assert = require('assert');



var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123456',
	database: 'test-ic'
});

connection.connect();

connection.query('SELECT * FROM user', function(err, rows, fields) {
	if (err) throw err;

	console.log('The row length is: ', rows.length);
});





//todo some tests are failing ?
//
//describe('Testing inserting into the db', function(){
//	var url = 'http://localhost:3000';


//	it('should post a million new records into the database ', function(done){

		var phoneNumber = 1000000;
		var phoneId = 1;

		var users = [];

		var user = ["" + phoneNumber,
				     "" + phoneId]
		users.push(user);
		for (var i=0;i < 1000000; ++i) {
			phoneNumber++;
			phoneId++;
			user = [ "" + phoneNumber,
				"" +   phoneId
			]

			users.push(user);
		}

		console.log('users size' + users.length);
		console.log('users size' + JSON.stringify(users));

		var sql = "INSERT INTO user (phoneNumber, phoneId) VALUES ?";


		connection.query(sql, [users], function(err) {
			if (err) throw err;
			connection.end();
		});
//		var user = {
//					"phoneNumber": "" + phoneNumber,
//					"phoneId": "" + phoneId
//		}
//		var i =0;
//
//
//		for (;i < 1000000; ++i) {
//
//
//
//
//			connection.query('INSERT INTO user SET ?', user, function(err, result) {
//				console.log('err ' + err);
//				console.log('result ' + result);
//			})
//
//			phoneNumber++;
//			phoneId++;
//			user.phoneNumber = "" + phoneNumber;
//			user.phoneId = "" + phoneId;
//
////			console.log('adding record number : ' + i);
//
//		}

	console.log('done with adding records');




//	})
//})