function updater(socketio) {

	function init(server) {
		var io = socketio.listen(server);
		io.sockets.on("connection", function(socket) {
			console.log("socket was connected.");
			socket.emit("showThis", "this is from the server");
		})
	}

	return{
		init: init
	};
}
module.exports = updater;