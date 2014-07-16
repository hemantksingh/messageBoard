// self executing anonymous function

(function(homeController) {
	homeController.init = function (app) {
	app.get("/", function(req, res){
		//res.send("<html><body><h1>" + "Express!!!" +"</h1></body></html>")

		// By default the views folder is looked up for the view.
		// res.render("jade/index", {title: "Express with Jade"});
		res.render("index", {title: "Express with Vash!!"});
		});
	};

})(module.exports);