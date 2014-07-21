function homeController (app, notesRepository) {
	
	function init() {
		app.get("/", function(req, res) {
			notesRepository.getNoteCategories(function(err, results) {
				res.render("index", {
					title: "Express with Vash!!",
					error: err,
					categories: results
				});
			});
		});	
	}

	return {init: init};
}

module.exports = homeController;