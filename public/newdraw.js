var socket = io.connect("//" + document.location.host || "//localhost:8080");
socket.on('mouse', newputPoint);

function newputPoint(data){
	if(!data.draw){
		disengage();
	}
	newputPoint(data);
}; 

var newputPoint = function(data){
	//console.log('Sending: ' + data.x + ',' + data.y);
	if(data.draw){
		ctx.lineTo(data.x,data.y);
		ctx.strokeStyle = '#ff00af';	
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle = '#ff00af';
		ctx.arc(data.x,data.y, radius, 0, Math.PI*2);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(data.x,data.y);
	}
};