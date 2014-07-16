// self executing anonymous function

(function(homeController) {
	var notesRepository = require("../repositories/notesRepository")();
	homeController.init = function (app) {
		app.get("/", function(req, res) {
			
			// Send html	
			// res.send("<html><body><h1>" + "Express!!!" +"</h1></body></html>")
			
			// Render with view enfgine. By default the views folder is looked up for the view.
			notesRepository.getNoteCategories(function(err, results) {
				res.render("index", {
					title: "Express with Vash!!",
					error: err,
					categories: results
				});
			});
		});
	};

})(module.exports);