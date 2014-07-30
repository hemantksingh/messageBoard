function registrationController(app, hasher, userRepository) {
	
	function init() {

		app.get("/register", function(req, res) {
			res.render("register", {title: "Register for the Board"});
		});

		app.post("/register", function(req, res) {
			
			var salt = hasher.createSalt();
			var user = {
				name: req.body.name,
				email: req.body.email,
				username: req.body.username,
				passwordHash: hasher.computeHash(req.body.password, salt),
				salt: salt
			}; 

			userRepository.addUser(user, function(err) {
				if(err) {
					req.flash("registrationError", "Failed to save to the database.");
					res.redirect("/register");
				} else {
					res.redirect("/login");
				}
			});
		});
	}

	return {init: init};
}

module.exports = registrationController;