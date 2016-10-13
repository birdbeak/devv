var socket;

function setup(){
	createCanvas(window.innerWidth-10,window.innerHeight-10);
	background(51);
	
	socket = io.connect("//" + document.location.host || "//localhost:8080");
	socket.on('mouse', newDrawing);
	
}

function newDrawing(data){
	noStroke();
	fill(255,0,100,70);
	ellipse(data.x,data.y,8,8);
}

function mouseDragged(e){
	console.log('Sending: ' + e.x + ',' + e.y);
	
	var data = {
		x: e.x,
		y: e.y
	};
	
	e.preventDefault();
	
	socket.emit('mouse',data);
	
	noStroke();
	fill(255,2555,255,70);
	ellipse(e.x,e.y,8,8);
	return false;
}
function draw(){
	
}


/*socket = io.connect("//" + document.location.host || "//localhost:8080");

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var radius = 2;

var dragging = false;

canvas.width = 400;
canvas.height = 300;

ctx.lineWidth = radius*2;

var putPoint = function(e){
	
	var posX,posY;
	
	if((e.clientX)&&(e.clientY)){
		posX = e.clientX;
		posY = e.clientY;
	}
	else if(e.targetTouches){
		posX = e.targetTouches[0].pageX;
		posY = e.targetTouches[0].pageY;
		e.preventDefault();
	}
	
	console.log('Sending: ' + posX + ',' + posY);
	
	if(dragging){
		ctx.lineTo(posX, posY);
		ctx.strokeStyle = '#000';	
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.arc(posX, posY, radius, 0, Math.PI*2);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(posX, posY);
	}
	
	var data = {
		x : posX, 
		y : posY,
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

canvas.addEventListener('touchstart', engage,false);
canvas.addEventListener('touchmove', putPoint,false);
canvas.addEventListener('touchend', disengage,false);
canvas.addEventListener('touchcancel', disengage,false);
canvas.addEventListener('mousedown', engage,false);
canvas.addEventListener('mousemove', putPoint,false);
canvas.addEventListener('mouseup', disengage,false);

*/