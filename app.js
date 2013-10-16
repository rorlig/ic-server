
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var redis = require ('redis');

var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123456',
	database: 'test_ic'
});

connection.connect();

connection.query('SELECT * FROM user', function(err, rows, fields) {
	if (err) throw err;

	console.log('The row length is: ', rows.length);
});




var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/users', user.list);


//create new user

app.post('/', function (req, res){

	//todo authenticate the request?..
	//todo validate parameters of the request...

	console.log('post request to add user');
	connection.query('INSERT INTO user SET ?', req.body, function(err, result) {
		//todo do the error checking..
//		console.log('insert id: ' + result.insertId );
		res.send("ok");

	});



})


app.get('/', function (req, res) {


	//todo authenticate the request...
	//todo validate parameters of the request...
	connection.query('SELECT * FROM user WHERE phoneNumber = \'' +  req.query.phoneNumber + '\'', function(err, result) {
		//todo do the error checking..
		//response

		console.log('result is  ' + JSON.stringify(result) );
		res.send(JSON.stringify(result));

	});

})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
