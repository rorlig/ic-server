var should = require('should');
var request = require('supertest');
var assert = require('assert');


//todo some tests are failing ?

describe('Testing GET /', function(){
	var url = 'http://localhost:3000';

	it('should return no results', function(done){

		request(url)
			.get('/')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				done();
			});
	})


	it('should post a new record into the database ', function(done){

		var user = {"phoneNumber": "1000000001",
					"phoneId": "1"}

		request(url)
			.post('/')
			.set('Accept', 'application/json')
			.send(user)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				done();
			});
	})
})