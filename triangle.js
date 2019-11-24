function Triangle(px,py,pz,psize){
	var position;
	var positionAtrib;
	var colorAtrib;
	var size;
	var points;
	var vertexBuffer;
	var indexBuffer;
	var colorBuffer;
	var normals;
	var dot;
	var magnitude;
	var temp;
	var colliding;

	this.getSize = function(){
		return size;
	}

	this.getPosition = function(){
		return position;
	}

	this.getPoints = function(){
		return points;
	}

	this.getNormals = function(){
		return normals;
	}

	this.getMin = function(){
		return min;
	}

	this.getMax = function(){
		return max;
	}

	position = new vector3(px,py,pz);
	size = psize;
	colliding = false;

	var points = new Float32Array([
		position.x() - size, position.y(), 0.0,
		position.x(), position.y() - size, 0.0,
		position.x() + size, position.y(), 0.0
		]);

	vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);

	var indices = new Uint16Array([0,1,2]);

	indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);

	var normals = new Float32Array([
		-(points[4]-points[1]), points[3]-points[0], points[5]-points[2],
		-(points[7]-points[4]), points[6]-points[3], points[8]-points[5],
		-(points[7]-points[1]), points[6]-points[0], points[8]-points[2]
		]);

	var colors = new Float32Array([
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0
		]);

	colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,colors,gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);

	var collidingColors = new Float32Array([
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0
		]);

	var min = new Array(normals.length/3);
	var max = new Array(normals.length/3);

	for(var i = 0; i < normals.length; i+=3){
		for(var i2 = 0; i2 < points.length; i2+=3){
			temp = normals[i]*points[i2]+normals[i+1]*points[i2+1]+normals[i+2]*points[i2+2];

			if(min[i/3] == null){
				min[i/3] = temp;
			}

			if(max[i/3] == null){
				max[i/3] = temp;
			}

			if(min[i/3] > temp){
				min[i/3] = temp;
			}

			if(max[i/3] < temp){
				max[i/3] = temp;
			}
		}
	}

	console.log(" ");

	this.setPosition = function(x,y,z){
		position = new vector3(x,y,z);

		points = new Float32Array([
		position.x() - size, position.y(), 0.0,
		position.x(), position.y() - size, 0.0,
		position.x() + size, position.y(), 0.0
		]);

		min = new Array(normals.length/3);
		max = new Array(normals.length/3);

		for(var i = 0; i < normals.length; i+=3){
			for(var i2 = 0; i2 < points.length; i2+=3){
				temp = normals[i]*points[i2]+normals[i+1]*points[i2+1]+normals[i+2]*points[i2+2];

				if(min[i/3] == null){
					min[i/3] = temp;
				}

				if(max[i/3] == null){
					max[i/3] = temp;
				}

				if(min[i/3] > temp){
					min[i/3] = temp;
				}

				if(max[i/3] < temp){
					max[i/3] = temp;
				}
			}
		}

		//console.log(" ");

		vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);
	}

	this.setColliding = function(pcolliding){
		colliding = pcolliding;
	}

	this.draw = function(){
		if(!colliding){
			colorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER,collidingColors,gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER,null);
		}else{
			colorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER,colors,gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER,null);
		}

		gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

		positionAtrib = gl.getAttribLocation(shaderProgram,"aposition");
		gl.vertexAttribPointer(position,3,gl.FLOAT,false,0,0);
		gl.enableVertexAttribArray(position);

		gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);

		colorAtrib = gl.getAttribLocation(shaderProgram,"acolor");
		gl.vertexAttribPointer(colorAtrib,3,gl.FLOAT,false,0,0);
		gl.enableVertexAttribArray(colorAtrib);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);

		gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
	}
}