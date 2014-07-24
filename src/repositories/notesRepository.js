function notesRepository(database, seedData) {
	
	function getNoteCategories(callback) {
		database.getDb(function(err, db) {
			if(err) {
				callback(err, null);
				console.log("Failed to retreive the notes.");
			} else {
				db.notes.find().sort({name: 1}).toArray(function(err, results) {
					if(err) {
						callback(err, null);
					} else {
						callback(null, results);
					}
				});
			}
		});
		
	}

	function seedDatabase() {
		database.getDb(function(err, db) {
			if(err) {
				console.log("Failed to seed the database");
			} else {
				db.notes.count(function(err, count) {
					if(err) {
						console.log("Failed to retreive notes count.");
					} else {
						if(count == 0) {
							seedData.initialNotes.forEach(function(item) {
								db.notes.insert(item, function(err) {
									if(err) {
										console.log("Failed to seed the database.");
									}
								});
							});
						} else {
							console.log("Database already seeded.");
						}
					}
				});
			}
		});
	}

	function createCategory(categoryName, callback) {
		database.getDb(function(err, db) {
			if(err) {
				callback(err);
			} else {
				db.notes.find({name: categoryName}).count(function(err, count) {
					if(err) {
						callback(err);
					} else {
						if(count !== 0) {
							callback("Category name '" + categoryName + "' already exists.");
						} else {
							var category = {name: categoryName, notes: []};
							db.notes.insert(category, function(err) {
								if(err) {
									callback(err);
								} else {
									callback(null);
								}
							});
						}
					}
				});
			}
		});
	}

	return {
		seedDatabase : seedDatabase,
		getNoteCategories: getNoteCategories,
		createCategory: createCategory
	};
}

module.exports = notesRepository;