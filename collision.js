function Collision(){

	var pointstoother;
	var p1p2dot;
	var p1magnitude;
	var p1collidep2;
	var p2collidep1;

	var p1axis;
	var p2axis;

	var seperate;

	this.col = function(p1,p2){
		p1axis = new Array(p1.getNormals().length/3);

		for(var i = 0; i < p1.getNormals().length; i+=3){
			for(var i2 = 0; i2 < p2.getPoints().length; i2+=3){
				//project all points onto all normals(axis)
				pointstoother = p1.getNormals()[i]*p2.getPoints()[i2]+p1.getNormals()[i+1]*p2.getPoints()[i2+1]+p1.getNormals()[i+2]*p2.getPoints()[i2+2];

				if(p1axis[i/3] == null){
					//if this is the first loop only fill the array with the values
					p1axis[i/3] = new Array(pointstoother,pointstoother);
				}else{
					//else check the new values against the old values and keep the min max of those
					if(p1axis[i/3][0] > pointstoother){
						p1axis[i/3][0] = pointstoother;
					}
					if(p1axis[i/3][1] < pointstoother){
						p1axis[i/3][1] = pointstoother;
					}
				}
			}
		}

		for(var i = 0; i < p1axis.length; i++){
			//check if the points of the polygon1 lay inside the min max of the other polygon2
			seperate = (p1axis[i][1] < p1.getMin()[i] || p1axis[i][0] > p1.getMax()[i]);
			if(seperate){
				break;
			}
		}

		if(!seperate){
			//if all points of polygon1 lay inside polygon2 check the other way around, if points of polygon2 lay inside polygon1
			p2axis = new Array(p2.getNormals().length/3);

			for(var i = 0; i < p2.getNormals().length; i+=3){
				for(var i2 = 0; i2 < p1.getPoints().length; i2+=3){
					p1p2dot = p2.getNormals()[i]*p1.getPoints()[i2]+p2.getNormals()[i+1]*p1.getPoints()[i2+1]+p2.getNormals()[i+2]*p1.getPoints()[i2+2];

					pointstoother = p1p2dot;

					if(p2axis[i/3] == null){
						p2axis[i/3] = new Array(pointstoother,pointstoother);
					}else{
						if(p2axis[i/3][0] > pointstoother){
							p2axis[i/3][0] = pointstoother;
						}
						if(p2axis[i/3][1] < pointstoother){
							p2axis[i/3][1] = pointstoother;
						}
					}
				}
			}

			for(var i = 0; i < p2axis.length; i++){
				//check again if all points in polygon2 lay inside min max of polygon1
				seperate = (p2axis[i][1] < p2.getMin()[i] || p2axis[i][0] > p2.getMax()[i]);
				if(seperate){
					break;
				}
			}
		}
		//if all points lay inside seperate = false, else if there is a point found outside seperate = true
		p1.setColliding(seperate);
		p2.setColliding(seperate);
	}
	
}
