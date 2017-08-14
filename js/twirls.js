var twirl_counter = 0;
var seed = String(Math.random()).split('.')[1]
var r = random( seed )
var simplex = new SimplexNoise( r )
var simplex3 = simplex.noise3D.bind(simplex)

var config = {
    margin: 0.8,
    activeLines : 0,
    line_width: 4,
    random : random,
    simplex3 : simplex3,
    maxAngle : Math.PI * 0.2,
    lineLength : 3,
    simplexScale : 0.2,
    simplexDepthScale : 0.001,
  }

	var x1 = w/2, y1 = h/2;
	var x2 = w/2, y2 = h/2;


  var s = rgb(randomInt(255), randomInt(255), randomInt(255));
  var lines = [];
  var active_lines = [];
  var hit, curr_line_width;
  var simplex = new SimplexNoise();



function twirl(){

  if (chance(20)) {
    change  = simplex.noise3D(x1, y1, tm) * 0.0005;
  }

  curve += change;
  tm+= curve;

  x2 = x1, y2 = y1;

  var noise = simplex3(
    x1 * config.simplexScale,
    y1 * config.simplexScale,
    lines.length * config.simplexDepthScale
  )

  var theta = noise * Math.PI * 2;

  x1 = x1 + Math.cos( tm ) * config.lineLength;
  y1 = y1 + Math.sin( tm ) * config.lineLength

	curr_line_width = 4.5 * Math.sin(linecount/60);

	linecount++;
  ctx2.lineWidth = curr_line_width;
  ctx2.strokeStyle = s;
	 // && x1 < w && x1 > 0 && y1 < h && y1 > 0
  if (!checkHit()) {
		//if (!selfHit()){
  	ctx2.line(x1, y1, x2, y2);;
  	var l = {
    	x: x1, y: y1
  	}
  	lines.push(l);
		//}
  } else {
  	active_lines.push(lines);
  }

	var d = data[twirl_counter];
	updateTwirlUI(d);
}






function selfHit(){

  if (lines.length > 0) {

    for (var i = 1; i < lines.length; i++) {

      hit = checkIntersection(x1, y1, x2, y2, lines[i].x, lines[i].y, lines[i-1].x, lines[i-1].y );

      if (hit!= undefined && hit!= false) {
        //resetLine();
				//twirl();
				//console.log("twirl");
				return true;
        //break;
      }
  }

  }
}





function checkHit(){
    var is_hit = false;

    for (var j = 0; j < active_lines.length; j++) {

			var lines2 = active_lines[j];

			if (lines2.length > 0) {

				for (var i = 1; i < lines2.length; i++) {

      		hit = checkIntersection(x1, y1, x2, y2, lines2[i].x, lines2[i].y, 		lines2[i-1].x, lines2[i-1].y );

      		if (hit!= undefined && hit!= false) {
						nextTwirlDataPoint();
        		return true;
      		}

				}

  	}
}

return is_hit;

}




function nextTwirlDataPoint(){

		if(data && data.length >0 && twirl_counter < data.length-1) {

			var d = data[twirl_counter];

				addLine(d);
				linecount = 2;
        active_lines.push(lines);
				twirl_counter++;

		}

}
