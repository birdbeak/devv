var socket = io.connect("//" + document.location.host || "//localhost:8080");
socket.on('mouse', newputPoint);

function newputPoint(data){
	var lol = {};
	if(data.draw){
		ctx.lineTo(data.x,data.y);
		ctx.strokeStyle = '#ff9000';	
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle = '#ff9000';
		ctx.arc(data.x,data.y, radius, 0, Math.PI*2);
		ctx.fill();
		ctx.beginPath();
		data.x =null;
		data.y=null;
		ctx.moveTo(lol.z,lol.y);		
	}else{
		ctx.beginPath();
		lol.x = data.x;
		lol.y = data.y;
	}
};