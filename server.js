var http = require("http");
var express = require("express");
var notesRepository = require("./src/repositories/notesRepository");
var homeController = require("./src/controllers/homeController");

var app = initialiseApp();
var controller = homeController(app, notesRepository());
controller.init();

var server = http.createServer(app);
// port 80 is a public facing web server.
server.listen(3000);
console.log("Server started at port:3000");


function initialiseApp() {
	var app = express();
	//app.set("view engine", "jade");
	app.set("view engine", "vash");
	// public static resources.
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