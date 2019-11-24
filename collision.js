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
				pointstoother = p1.getNormals()[i]*p2.getPoints()[i2]+p1.getNormals()[i+1]*p2.getPoints()[i2+1]+p1.getNormals()[i+2]*p2.getPoints()[i2+2];

				if(p1axis[i/3] == null){
					p1axis[i/3] = new Array(pointstoother,pointstoother);
				}else{
					if(p1axis[i/3][0] > pointstoother){
						p1axis[i/3][0] = pointstoother;
					}
					if(p1axis[i/3][1] < pointstoother){
						p1axis[i/3][1] = pointstoother;
					}
				}
			}
		}

		/*console.log(p1axis[1][0]);
		console.log(p1axis[1][1]);
		console.log(p1.getMin()[1]);
		console.log(p1.getMax()[1]);*/

		for(var i = 0; i < p1axis.length; i++){
			seperate = (p1axis[i][1] < p1.getMin()[i] || p1axis[i][0] > p1.getMax()[i]);
			//console.log(seperate);
			if(seperate){
				break;
			}
		}

		//console.log(" ");

		if(!seperate){
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
				seperate = (p2axis[i][1] < p2.getMin()[i] || p2axis[i][0] > p2.getMax()[i]);
				//console.log(seperate);
				if(seperate){
					break;
				}
			}
		}

		//console.log(" ");
		//console.log(" ");

		p1.setColliding(seperate);
		p2.setColliding(seperate);
	}
	
}