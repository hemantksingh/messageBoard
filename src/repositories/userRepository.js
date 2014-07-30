function userRepository(database) {

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
		addUser: addUser
	};
}

module.exports = userRepository;