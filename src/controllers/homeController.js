function homeController (app, notesRepository) {
	
	function init() {
		notesRepository.seedDatabase();
		app.get("/", function(req, res) {1
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