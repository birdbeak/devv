var socket = io.connect("//" + document.location.host || "//localhost:8080");
socket.on('mouse', newputPoint);

function newputPoint(data){
	event(data.x,data.y);
};