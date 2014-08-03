function updater(socketio) {

	function init(server) {
		var io = socketio.listen(server);
		io.sockets.on("connection", function(socket) {
			console.log("socket was connected.");

			socket.on("join category", function(category){
				socket.join(category);
			})

			socket.on("noteAdded", function(data){
				console.log("broadcasting note added - '" + data.note.note 
					+ "' to category - '" + data.category + "'.");
				socket.broadcast.to(data.category).emit("broadcast note", data.note);
			});
		});
	}

	return{
		init: init
	};
}
module.exports = updater;