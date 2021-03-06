var socket,
	menu,c,
	save0,
	saveswt = true,
	rgba = [0,0,0,0],
	mouseswt = false,
	scribble = new Scribble();

function setup(){
	c = createCanvas(window.innerWidth-6,window.innerHeight-50);
	background(0,0,0,0);
	
	socket = io.connect("//" + document.location.host || "//localhost:8080");
	socket.on('mouse', newDrawing);
	
	var savebtn = select('#savebt');
	var clear = select('#clear');
	var full = select('#full');
	//savebtn.style('font-size','25pt');
	savebtn.mouseClicked(function(){
		saveCanvas('myCanvas','png');
		return false;
	});
	clear.mouseClicked(clears);
	full.mouseClicked(function(){
		var fs = fullscreen();
		fullscreen(!fs);
		return false;
	});
}

function clears(){
	clear();
	loadPixels();
	return false;
}

function newDrawing(data){
	stroke(255,0,100,50);
	strokeWeight(3);
	scribble.scribbleLine(data.x,data.y,data.px,data.py);
	loadPixels();
}

function mouseDragged(){
	var data = {
		x: mouseX,
		y: mouseY,
		px: pmouseX,
		py: pmouseY
	};
	socket.emit('mouse',data);
	
	stroke(255,255,255,50);
	strokeWeight(3);
	scribble.scribbleLine(mouseX, mouseY, pmouseX, pmouseY);
	//ellipse(pmouseX,pmouseY,2,2);
	//drawingContext.lineWidth = 5;
	loadPixels();
}

function touchMoved(){
	var data = {
		x: touchX, 
		y: touchY,
		px : ptouchX,
		py : ptouchY
	};
	
	socket.emit('mouse',data);
	
	stroke(255,255,255,50);
	strokeWeight(3);
	scribble.scribbleLine(touchX, touchY, ptouchX, ptouchY);
	loadPixels();
	return false;
}
/*function mouseClicked(){
	if(saveswt && mouseX <= save.width && mouseY <= save.height){
		//console.log('a');
		saveswt = false;
		draw();
		saveCanvas(c,'myCanvas', 'png');
	}else{
		saveswt = true;
	}
}*/

function draw(){
	save0 = {
		x : 0,
		y : 0,
		width : 50,
		height : 50
	};
}
function windowResized(e) {
	//if(re.x < e.target.windowWidth || re.y < e.target.windowHeight)
	//	loadPixels();
		
 	resizeCanvas(window.innerWidth-6,window.innerHeight-50);
	updatePixels();
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