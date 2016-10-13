var socket = io.connect("//" + document.location.host || "//localhost:8080");
socket.on('mouse', newputPoint);



function newputPoint(data){
	if(data.draw){
		ctx.lineTo(data.x,data.y);
		ctx.strokeStyle = '#ff9000';	
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle = '#ff9000';
		ctx.arc(data.x,data.y, radius, 0, Math.PI*2);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(data.x,data.y);
	}else{
		canvas.addEventListener('touchend', function(){
			ctx.beginPath();
			ctx.moveTo(data.x,data.y);
		},false);
		canvas.addEventListener('touchcancel', function(){
			ctx.beginPath();
			ctx.moveTo(data.x,data.y);
		},false);
		canvas.addEventListener('mouseup', function(){
			ctx.beginPath();
			ctx.moveTo(data.x,data.y);
		},false);
	}
};