function homeController (app, notesRepository) {
	
	function init() {
		notesRepository.seedDatabase();
		app.get("/", function(req, res) {1
			notesRepository.getNoteCategories(function(err, results) {
				res.render("index", {
					title: "Express with Vash!!",
					error: err,
					categories: results,
					newCatError: req.flash("newCatErr")
				});
			});
		});

		app.post("/newCategory", function(req, res) {
			var categoryName = req.body.categoryName;

			notesRepository.createCategory(categoryName, function(err) {
				if(err) {
					console.log(err);
					req.flash("newCatErr", err);
					res.redirect("/");
				} else {
					res.redirect("/");
					//res.redirect("/notes/"+categoryName);
				}
			})
		})
	}

	return {init: init};
}

module.exports = homeController;