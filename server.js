var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cookieSession = require('cookie-session');
var notesRepository = require("./src/repositories/notesRepository");
var homeController = require("./src/controllers/homeController");
var notesController = require("./src/controllers/notesController");
var seedData = require("./src/seedData");
var mongodb = require("mongodb");
var database = require("./src/database");

var dbUrl = "mongodb://localhost:27017/messageBoard";

var app = initialiseApp();
homeController(
	app, 
	notesRepository(database(mongodb, dbUrl), seedData())).init();

notesController(
	app,
	notesRepository(database(mongodb, dbUrl), seedData())).init();

var server = http.createServer(app);
// port 80 is a public facing web server.
server.listen(3000); 
console.log("Server started at port:3000");


function initialiseApp() {
	var app = express();
	
	//app.set("view engine", "jade");
	app.set("view engine", "vash");

	// Allow parsing urlencoded request bodies into req.body
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	// Store session state in browser cookie. Session state is encrypted with 
	// a secret key which ensures the session state can be decrypted only with the
	// secret key.
	app.use(cookieSession({keys: ['secret1', 'secret2']}));
	app.use(flash());

	// Public static resources.
	app.use(express.static(__dirname + "/public"));

	/*app.get("/", function(req, res){
		// Without using a view engine, send raw html 
		res.send("<html><body><h1>" + "Express!!!" +"</h1></body></html>")

		// Using a view engine by default the views folder is looked up 
		// for the specified view. Rendering handled by the view engine.
		res.render("jade/index", {title: "Express with Jade"});
		res.render("index", {title: "Express with vash"});
	});*/

	app.get("/api/users", function(req, res) {
		res.set("Content-Type", "application/json");
		res.send({name: "Shawn", isValid: true, group: "Admin"});
	});

	return app;
}

function createServerWithoutExpress(http) {
	var server = http.createServer(function(req, res) {
		console.log(req.url);
		res.write("<html><body><h1>" + req.url +"</h1></body></html>");

		res.end();
	});
}