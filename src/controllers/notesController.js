function notesController(app, notesRepository) {

	function init() {

		app.get("/api/notes/:categoryName", function(req, res) {
			console.log("get");
			var categoryName = req.params.categoryName;

			notesRepository.getNotes(categoryName, function(err, notes) {
				if(err) {
					res.send(400, err);
				} else {
					res.set("Content-Type", "application/json");
					res.send(notes.notes);
				}
			});
		});

		app.post("/api/notes/:categoryName", function(req, res) {
			console.log("post");
			var categoryName = req.params.categoryName;
			var noteToAdd = {
				note: req.body.note,
				color: req.body.color,
				author: req.body.author
			};
			
			console.log(JSON.stringify(noteToAdd));
			notesRepository.addNote(categoryName, noteToAdd, function(err) {
				if(err) {
					res.send(400, err);
				} else {
					res.set("Content-Type", "application/json");
					res.send(201, noteToAdd);
				}
			});
		});

		app.put("/api/notes/:categoryName", function(req, res){
			console.log("put");
			res.send(200);
		});
	}

	return {
		init: init
	};
}

module.exports = notesController;