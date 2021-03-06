function authorisation(passport, localStrategy, hasher, userRepository) {
	
	function init(app) {
		passport.use(new localStrategy(verifyUser));
		passport.serializeUser(function(user, callback) {
			callback(null, user.username);
		});
		passport.deserializeUser(function(key, callback) {
			userRepository.getUser(key, function(err, user) {
				if(err) {
					callback(null, false, {message: "Failed to retrieve user"});
				} else {
					callback(null, user);
				}
			});
		});
		app.use(passport.initialize());
		app.use(passport.session());
	}

	function ensureAuthenticated(req, res, callback) {
		if(req.isAuthenticated()) {
			callback();
		} else {
			res.redirect("/login");
		}
	}

	function ensureApiAuthenticated(req, res, callback) {
		if(req.isAuthenticated()) {
			callback();
		} else {
			res.send(401, "Not authorised.");
		}
	}

	function verifyUser(username, password, callback) {
		userRepository.getUser(username, function(err, user) {
			if(!err && user) {
				var testHash = hasher.computeHash(password, user.salt);
				if(testHash === user.passwordHash) {
					callback(null, user);
					return;
				}
			}
			callback(null, false, {message: "Invalid credentials."})
		});
	}

	return {
		init: init,
		ensureAuthenticated: ensureAuthenticated,
		ensureApiAuthenticated: ensureApiAuthenticated
	};
}

module.exports = authorisation;