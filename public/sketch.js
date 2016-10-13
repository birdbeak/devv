var socket;

/*function setup(){
	createCanvas(600,400);
	background(51);
	
	socket = io.connect("//" + document.location.host || "//localhost:8080");
	socket.on('mouse', newDrawing);
	
}

function newDrawing(data){
	noStroke();
	fill(255,0,100);
	line(mouseX,mouseY,mouseX,mouseY);
}

function mouseDragged(){
	console.log('Sending: ' + mouseX + ',' + mouseY);
	
	var data = {
		x: mouseX,
		y: mouseY
	};
	
	socket.emit('mouse',data);
	
	noStroke();
	fill(255);
	line(mouseX,mouseY,mouseX,mouseY);
}
function draw(){
	
}*/

socket = io.connect("//" + document.location.host || "//localhost:8080");
socket.on('mouse', newputPoint);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var radius = 10;

var dragging = false;

canvas.width = 600;
canvas.height = 600;

ctx.lineWidth = radius*2;

function newputPoint(data){
	if(data.draw){
		ctx.lineTo(data.x, data.y);	
		ctx.strokeStyle = '#ff8a00';
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle = '#ff8a00';
		ctx.arc(data.x, data.y, radius, 0, Math.PI*2);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(data.x, data.y);
	}else{
		ctx.beginPath();
	}
}; 

var putPoint = function(e){
	
	if(e.clientX != null){
		var a = {
			x : e.clientX,
			y : e.clientY
		};
	}
	else if(e.pageX != null){
		var a = {
			x : e.pageX,
			y : e.pageY
		};
	}
	
	if(dragging){
		ctx.lineTo(e.pageX, e.pageY);
		ctx.strokeStyle = '#000';	
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.arc(e.pageX, e.pageY, radius, 0, Math.PI*2);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(e.pageX, e.pageY);
	}
	
	var data = {
		x : e.clientX,
		y : e.clientY,
		draw : dragging
	};
	
	socket.emit('mouse',data);
};

var engage = function(e){
	dragging = true;
	putPoint(e);
};

var disengage = function(){
	dragging = false;
	ctx.beginPath();
};

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('touchstart', engage);
canvas.addEventListener('touchmove', putPoint);
canvas.addEventListener('touchend', disengage);
