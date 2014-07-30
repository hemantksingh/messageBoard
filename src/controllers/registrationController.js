function registrationController(app) {
	
	function init() {

		app.get("/register", function(req, res) {
			res.render("register", {title: "Register for the Board"});
		});
	}

	return {init: init};
}

module.exports = registrationController;