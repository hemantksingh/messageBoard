(function (angular) {
	var app = angular.module("notesView", ["ui.bootstrap"]);
	app.controller("notesViewController", [
		"$scope", "$window", "$http", 
			function($scope, $window, $http) {		
				var urlParts = $window.location.pathname.split("/");
				var categoryName = urlParts[urlParts.length - 1];
				var notesUrl = "/api/notes/" + categoryName;

				$scope.newNote = createNote();

				$http.get(notesUrl)
					.then(function(result) {
						$scope.notes = result.data;	
					}, function(err) {
						alert("Failed to retreive notes.");
					});

				var socket = io.connect();

				socket.emit("join category", categoryName);
				socket.on("broadcast note", function(note) {
					$scope.notes.push(note);
					$scope.$apply();
				});

				$scope.save = function() {
					$http.post(notesUrl, $scope.newNote)
						.then(function(result) {
							$scope.notes.push(result.data);
							$scope.newNote = createNote();
							socket.emit("noteAdded", 
								{category: categoryName, note: result.data});
						}, function(err){
							alert('Failed to create the note.');
						});
				};
			}
	]);

	function createNote() {
		return {
			note: "",
			color: "yellow",
			author: "Hemant Kumar"
		};
	}

})(window.angular);