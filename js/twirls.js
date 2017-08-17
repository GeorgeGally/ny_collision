var twirl_counter = -1;
var seed = String(Math.random()).split('.')[1]
var r = random( seed )
var simplex = new SimplexNoise( r )
//var simplex = new SimplexNoise();
var simplex3 = simplex.noise3D.bind(simplex)
var s = rgb(randomInt(255), randomInt(255), randomInt(255));
var lines = [];
var linecounter = 0;
var hit, curr_line_width;

var config = {
    margin: 0.8,
    activeLines : 0,
    line_width: 0,
    max_line_width: 4.6,
    random : random,
    simplex3 : simplex3,
    maxAngle : Math.PI * 0.4,
    lineLength : 3,
    simplexScale : 0.2,
    simplexDepthScale : 0.001,
  }

	var x1 = x2 = 0, y1 = y2 = 0;

  function nextTwirlDataPoint(){
  		if(data && data.length >0 && twirl_counter < data.length-1) {
        twirl_counter++;
  			var d = data[twirl_counter];
        var pos = getLocs(d, gmap);
      	x = x1 = x2 = pos.x;
      	y = y1 = y2 = pos.y;
        if(!checkHit()) {
          lines[twirl_counter] = new Array();
          resetTwirl();
        } else {
          nextTwirlDataPoint();
          return;
        }
  		}

  }




function twirl(){

  if(twirl_counter < data.length-1) {
  //console.log(lines);
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

	curr_line_width = config.max_line_width * Math.sin(linecounter/60);

	linecounter++;
  ctx2.lineWidth = curr_line_width;
  ctx2.strokeStyle = s;
	 // && x1 < w && x1 > 0 && y1 < h && y1 > 0

  if (!checkHit() && !selfHit()) {
  	ctx2.line(x1, y1, x2, y2);;
  	var new_line = {
    	x: x1, y: y1
  	}
    //console.log(twirl_counter);
    //console.log(lines[twirl_counter]);
    if(!lines[twirl_counter]) {
      lines[twirl_counter][0] = new_line;
    } else {
      lines[twirl_counter].push(new_line);
    }

    //console.log(lines);
  }

	var d = data[twirl_counter];
	updateTwirlUI(d);
  }
}


function selfHit(){

  if (lines[twirl_counter] != undefined && lines[twirl_counter].length > 0) {

    for (var i = 1; i < lines[twirl_counter].length; i++) {
      var p = lines[twirl_counter][i];
      var p2 = lines[twirl_counter][i-1];
      hit = checkIntersection(x1, y1, x2, y2, p.x, p.y, p2.x, p2.y );

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

    for (var j = 0; j < lines.length; j++) {

			var lines2 = lines[j];

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



function updateTwirlUI(d){

	var dt = d.DATE + ", " + d.TIME;
	var full_date = getDateTime(d);
	if (start_date == "") start_date = full_date;

	$('#twirl_date_holder').html("<b>New York Vehicle Collisions:</b><br>"
	+ start_date + " - <br>" + end_date + " ");
}



function resetTwirl(){
  curve = random(-0.3, 0.3);
  change = random(-0.01, 0.01);
  //if (config.line_width > 0.1) config.line_width -=0.004;
  curr_line_width = config.line_width;

  s = rgb(randomInt(100,250));
  linecounter = 2;
}
