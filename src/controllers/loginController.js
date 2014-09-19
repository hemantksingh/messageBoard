function loginController(passport) {
	
	function init(app) {
		app.get("/login", function(req, res) {
			res.render("login", {
				title: "Login to the Board",
				message: req.flash("loginError")
			});
		});

		app.post("/login", function(req, res, callback) {
			// Typically login uses a server side route which is a submitted form. 
			// In this case you do not have to tell passport to login the user, it does it automatically.
			// Since this login is using an xmlhttprequest (xhr) post, login is invoked explicitly.

			var authFunction = passport.authenticate("local", 
				function(err, user, info) {
					if(err) {
						callback(err);
					} else {
						req.logIn(user, function(err) {
							if(err) {
								callback(err);
							} else {
								res.redirect("/");
							}
						});
					}
			});

			authFunction(req, res, callback);
		});
	}

	return {
		init: init
	};
}

module.exports = loginController;