var http = require("http");
var express = require("express");
/*var server = http.createServer(function(req, res) {
	console.log(req.url);
	res.write("<html><body><h1>" + req.url +"</h1></body></html>");

	res.end();
});*/

var controllers = require("./controllers")
var app = express();
//console.log(__dirname + '\\views');
//app.set("view engine", "jade");
app.set("view engine", "vash");

controllers.init(app);
/*
app.get("/", function(req, res){
	//res.send("<html><body><h1>" + "Express!!!" +"</h1></body></html>")

	// By default the views folder is looked up for the view.
	// res.render("jade/index", {title: "Express with Jade"});
	res.render("index", {title: "Express with vash"});
});*/

app.get("/api/users", function(req, res) {
	res.set("Content-Type", "application/json");
	res.send({name: "Shawn", isValid: true, group: "Admin"});
})
var server = http.createServer(app);

// port 80 is a public facing web server.
server.listen(3000);
console.log("Server started at port:3000");