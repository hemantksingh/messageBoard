(function (angular) {
	var app = angular.module("notesView", []);
	app.controller("notesViewController", 
		["$scope", "$window", "$http", 
			function($scope, $window, $http) {		
				var urlParts = $window.location.pathname.split("/");
				var categoryName = urlParts[urlParts.length - 1];
				var notesUrl = "/api/notes/" + categoryName;

				$http.get(notesUrl)
					.then(function(result) {
						$scope.notes = result.data;	
					}, function(err) {
						alert("Failed to retreive notes.");
					});
			}
		]);
})(window.angular);