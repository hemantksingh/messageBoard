function seedData() {
	var notes = [{
				name: "History",
				notes: [{
					note: "Testing history",
					author: "Shawn Wildermuth",
					color: "yellow"
				}, {
					note: "I like history",
					author: "Shawn Wildermuth",
					color: "blue"
				}, {
					note: "I hate war",
					author: "shawn Wildermuth",
					color: "green"
				}]
			}, {
				name: "Literature",
				notes: [{
					note: "Parampara",
					author: "Kalidas",
					color: "yellow"
				}, {
					note: "Shakuntala",
					author: "Kalidas",
					color: "blue"
				}, {
					note: "Arthshastra",
					author: "Kautilaya",
					color: "green"
				}]
			}, {
				name: "Physics",
				notes: [{
					note: "Dhumketu",
					author: "Hawkins",
					color: "yellow"
				}, {
					note: "Theory of Relativity",
					author: "Eienstien",
					color: "blue"
				}, {
					note: "Shunya",
					author: "Aryabhatt",
					color: "green"
				}]
			}];

	return {initialNotes: notes}
}
module.exports = seedData;