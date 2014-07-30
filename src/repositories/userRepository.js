function userRepository(database) {

	function getUser(username, callback) {
		database.getDb(function(err, db) {
			if(err) {
				callback(err, null);
			} else {
				db.users.findOne({username: username}, callback);	
			}
		});
	}

	function addUser(userToAdd, callback) {
		database.getDb(function(err, db){
			if(err) {
				callback(err);
			} else {
				db.users.insert(userToAdd, callback);
			}
		});
	}

	return {
		getUser: getUser,
		addUser: addUser
	};
}

module.exports = userRepository;