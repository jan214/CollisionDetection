const cvs = document.getElementById("canvas");
const gl = cvs.getContext('webgl');

/*var vertices = new Float32Array([
   -0.5,0.5,0.0,
   -0.5,-0.5,0.0,
   0.5,-0.5,0.0,
   0.5,0.5,0.0 
]);

var indices = new Uint16Array([3,2,1,3,1,0]);*/

var collision = new Collision();

//var square1 = new Square(1.0,0.0,0.0,0.25,0);
var square2 = new Square(0.0,0.0,0.0,0.1,20);
var triangle1 = new Triangle(-0.8,0.75,0.0,0.1,0);

window.addEventListener("keydown", keydown);

document.getElementById("canvas").addEventListener("mousemove",function(event){
	function getMousePos(canvas, event) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}

	var pos = getMousePos(canvas, event);
	triangle1.setPosition(((pos.x/cvs.width)*2-1),(-((pos.y/cvs.height)*2-1))+triangle1.getSize()*0.2,triangle1.getPosition().z());
});

function keydown(){
	if(event.keyCode == 65){
		console.log("A");
		triangle1.setPosition(triangle1.getPosition().x()-0.01,triangle1.getPosition().y(),triangle1.getPosition().z());
	}

	if(event.keyCode == 68){
		console.log("D");
		triangle1.setPosition(triangle1.getPosition().x()+0.01,triangle1.getPosition().y(),triangle1.getPosition().z());
	}

	if(event.keyCode == 87){
		console.log("W");
		triangle1.setPosition(triangle1.getPosition().x(),triangle1.getPosition().y()+0.01,triangle1.getPosition().z());
	}

	if(event.keyCode == 83){
		console.log("S");
		triangle1.setPosition(triangle1.getPosition().x(),triangle1.getPosition().y()-0.01,triangle1.getPosition().z());
	}
}

document.getElementById("rotinput").addEventListener("change",function(){
	if(document.getElementById("rotinput").value <= 360){
		square2.setRotation(document.getElementById("rotinput").value);
	}else{
		document.getElementById("rotinput").value = 360;
		square2.setRotation(360);
	}

	if(document.getElementById("rotinput").value >= 0){
		square2.setRotation(document.getElementById("rotinput").value);
	}else{
		document.getElementById("rotinput").value = 0;
		square2.setRotation(0);
	}
});

document.getElementById("siinput").addEventListener("change",function(){
	if(document.getElementById("siinput").value <= 1){
		square2.setSize(document.getElementById("siinput").value);
	}else{
		document.getElementById("siinput").value = 1;
		square2.setSize(1);
	}

	if(document.getElementById("siinput").value >= 0.1){
		square2.setSize(document.getElementById("siinput").value);
	}else{
		document.getElementById("siinput").value = 0.1;
		square2.setSize(0.1);
	}
});

/*var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER,null);

var indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);*/

var verCode = "attribute vec3 aposition;"+
			  "attribute vec3 acolor;"+
			  "varying vec3 color;"+
"void main(){"+
"color = acolor;"+
"gl_Position = vec4(aposition,1.0);"+
"}";

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader,verCode);
gl.compileShader(vertShader);

if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(vertShader));
}

var fragCode = 
	"precision mediump float;"+
	"varying vec3 color;"+
	"void main(){"+
	"gl_FragColor = vec4(color,1.0);"+
"}";

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader,fragCode);
gl.compileShader(fragShader);

if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(fragShader));
}

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram,vertShader);
gl.attachShader(shaderProgram,fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

/*gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);*/

function loop(){
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	//collision.col(square2,triangle1);
	//collision.col(square1,triangle1);
	//console.log(triangle1.getPosition().y());
	collision.col(triangle1,square2);

	//square1.draw();
	square2.draw();
	triangle1.draw();
	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);