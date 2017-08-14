var ctx;
var resolutionScale = window.devicePixelRatio || 1;

var canvas2 = document.getElementById('canvas2');
//var ctx2 = createCanvas("canvas2");
var ctx2 = canvas2.getContext('2d');
//var ctx3 = createCanvas("canvas3");


frameRate = 120;

var tt = "all";

var particles = [];

// var colours2 = new colourPool()
// 	    .add("#b8d072")
//       .add("#f2de6b")
// 			.add("#F9CDAD")
// 			.add("#496b8e")
// 			.add("#71C152")
// 			.add('#FF3300')
// 			.add('#FF6600')
// 			.add("red")

// var colours2 = new colourPool()
// 			.add("#f2de6b")
// 			.add("#3495ba")
// 			.add("#8bc4d5")
// 			.add("#b8d072")
// 			.add('#496b8e')
// 			.add("#f5e267")
// 			.add("#e8a478")
// 			.add('#dd796e')
// 			.add('#ffffff')

// var colours2 = new colourPool()
// 			.add("#3495ba")
// 			.add('#496b8e')
// 			.add("#e7a278")
// 			.add("#dc776d")
// 			.add(rgba(110,229,49, 0.7))
// 			.add(rgba(255,255,0, 0.75))
// 			.add(rgba(255,116,0, 0.8))
// 			//.add(rgba(255,0,0, 0.85))


// var colours2 = new colourPool()
// 		.add('#496b8e')
// 		.add("#708ab4")
// 		.add("#6481a9")
// 		.add("#91a0bd")
// 		.add("#7993c0")
// 		.add("#9ca9c4")
// 		.add("#57779c")
// 		.add('#ffffff')
// 		.add("#dc776d")
// 		.add('#496b8e')
// 		.add('#b8d072')
// 		.add('#f2de6b')

// //browns
var colours = new colourPool()
	    .add("#FFEDC7")
	    .add("#BA8365")
      .add("#F78E9F")
			.add("291728")
			.add('#861D47')
			.add('#BA8365')
			.add("#291728")
			.add("#861D47")

	// 	// pinks
	var colours2 = new colourPool()
				.add("#83AF9B")
				.add("#FE4365")
				.add("#C8C8A9")
				.add("#FC9D9A")
				.add("#F9CDAD")
				.add("#FE4365")
				.add('#FC9D9A')
				//.add('#F9CDAD')

			// var colours2 = new colourPool()
			// 			.add("#ccc")
			// 	    .add("#E0E4CC")
			//       .add("#C8C8A9")
			// 			.add('#83AF9B')
			// 			.add("#A7DBD8")
			// 			.add("#84D3ED")
			// 			.add('#496b8e')

			// var colours2 = new colourPool()
			// 			.add("#ccc")
			// 	    .add("#D1F2A5")
			//       .add("#EFFAB4")
			// 			.add('#FFC48C')
			// 			.add("#FF9F80")
			// 			.add("#F56991")
			// 			.add('#F56991')



	// var colours2 = new colourPool()
	// 			.add("#D16647")
	// 			.add("#4A71C0")
	// 			.add("#7BBC53")
	// 			.add("#288993")
	// 			.add("#41607A")
	// 			.add("#453B52")
	// 			.add('#A7DBD8')
	// 			.add('#E0E4CC')



// console.log(colours);
// console.log(colours.get(0));

var filters = [];

var motorist_colour =  colours.get(0);
var cyclist_colour = colours.get(1);
var pedestrian_colour = colours.get(2);
var ok_colour = colours.get(3);
var injured_colour = colours.get(4);
var killed_colour = colours.get(5);

var c = 0;
var t = "any";
var f = "all";

var heatmapData = [];
var linecount = 0;
var day_start = 5;
var night_start = 18;

	var total_accidents = 0, total_incidents = 0;
	var total_injured = 0, total_deaths = 0, total_ok = 0;
	var total_pedestrians_injured = 0, total_pedestrians_deaths = 0;
	var total_cyclists_injured = 0, total_cyclists_deaths = 0;
	var total_motorists_injured = 0, total_motorists_deaths = 0;
	var pedestrians_injured = 0, cyclists_injured = 0, motorists_injured = 0;
	var pedestrians_killed = 0, cyclists_killed = 0, motorists_killed = 0;

	var pedestrian = 0, cyclist = 0, motorist = 0, ok = 0;
	var injured = 0, killed = 0;

	var filter_motorist = true, filter_cyclist = true, filter_pedestrian = true;

	var monday = 0, tuesday = 0, wednesday = 0, thursday = 0, friday = 0, saturday = 0, sunday = 0;

	var gmap, heatmap, canvasLayer;
	var heatmap, data;


var tm = 0;
var count = 0;
var curve, change;
var viz = 1;
var mapLoaded = false;
var start_date = "";


function nextDataPoint(d){

		//console.log(d);

		c = 0;
		var total = 0;
		updateUI(d, 'date_holder');

		if(isCorrectTime(d) && isCorrectDay(d)){

			injured = 0, killed = 0;
			pedestrian = 0, cyclist = 0, motorist = 0, ok = 0;
			pedestrians_injured = 0, cyclists_injured = 0, motorists_injured = 0;
			pedestrians_killed = 0, cyclists_killed = 0, motorists_killed = 0;

			if (d['NUMBER OF PEDESTRIANS INJURED'] != undefined && parseInt(d['NUMBER OF PEDESTRIANS INJURED']) > 0) {

				var n = parseInt(d['NUMBER OF PEDESTRIANS INJURED']);
				total_pedestrians_injured += n;
				pedestrian += n;
				injured += n;
				pedestrians_injured = n;

			}

			if (d['NUMBER OF PEDESTRIANS KILLED'] != undefined && parseInt(d['NUMBER OF PEDESTRIANS KILLED']) > 0) {

				var n = parseInt(d['NUMBER OF PEDESTRIANS KILLED']);
				total_pedestrians_deaths += n;
				pedestrian += n;
				killed += n;
				pedestrians_killed = n;

			}

			if (d['NUMBER OF CYCLIST INJURED'] != undefined && parseInt(d['NUMBER OF CYCLIST INJURED']) > 0) {
				var n = parseInt(d['NUMBER OF CYCLIST INJURED']);
				total_cyclists_injured += n;
				cyclist += n;
				injured += n;
				cyclists_injured = n;
			}

			if(d['NUMBER OF CYCLIST KILLED'] != undefined && parseInt(d['NUMBER OF CYCLIST KILLED']) > 0) {
				var n = parseInt(d['NUMBER OF CYCLIST KILLED']);
				total_cyclists_deaths += n;
				cyclist += n;
				killed += n;
				cyclists_killed = n;
			}

			if(d['NUMBER OF MOTORIST INJURED'] != undefined && parseInt(d['NUMBER OF MOTORIST INJURED']) > 0) {
				var n = parseInt(d['NUMBER OF MOTORIST INJURED']);
				total_motorists_injured += n;
				motorist += n;
				injured += n;
				motorists_injured = n;
			}

			if(d['NUMBER OF MOTORIST KILLED'] != undefined && parseInt(d['NUMBER OF MOTORIST KILLED']) > 0) {
				var n = parseInt(d['NUMBER OF MOTORIST KILLED'])
				total_motorists_deaths += n;
				motorist += n;
				killed += n;
				motorists_killed = n;
			}

			if(killed == 0 && injured == 0) ok = 1;
			total_deaths += killed;
			total_injured += injured;

			if(filters.includes('motorists_checked') && motorists_killed > 0) {
				total += motorists_killed;
				addMarker(d, counter);
				addViz(d, motorists_killed, 'motorists');

			}

			if(filters.includes('motorists_checked') && motorists_injured > 0) {
				total += motorists_injured;
				addViz(d, motorists_injured, 'motorists');
			}

			if(filters.includes('cyclists_checked') && cyclists_killed > 0) {
				total += cyclists_killed;
				addMarker(d, counter);
				addViz(d, cyclists_killed, 'cyclists');
			}
			if(filters.includes('cyclists_checked') && cyclists_injured > 0) {
				total += cyclists_injured;
				addViz(d, cyclists_injured, 'cyclists');
			}

			if(filters.includes('pedestrians_checked') && pedestrians_killed > 0) {
				total += pedestrians_killed;
				addMarker(d, counter);
				addViz(d, pedestrians_killed, 'pedestrians');
			}
			if(filters.includes('pedestrians_checked') && pedestrians_injured > 0) {
				total += pedestrians_injured;
				addViz(d, pedestrians_injured, 'pedestrians');
			}

			if(filters.includes('ok_checked')
			&& (filters.includes('pedestrians_checked')
			|| filters.includes('cyclists_checked')
			|| filters.includes('motorists_checked'))
			&& pedestrians_injured == 0
			&& pedestrians_injured == 0 && pedestrians_killed == 0
			&& cyclists_injured == 0 && cyclists_killed == 0
			&& motorists_injured == 0 && motorists_killed == 0
			){
				addViz(d, 1, 'ok');
			}

		}

	}

	function addViz(d, num, type){

		if(viz == 2) {
			addHeatMapData(d, num)
		} else {
			addCircle(d, num, type);
		}

	}


	function isCorrectDay(d){
		var dt = d.TIME + " " + d.DATE;
		var day_number = getDayNumber(dt);
		if((filters.includes("sun_check") && day_number == 0)
		|| (filters.includes("mon_check") && day_number == 1)
		|| (filters.includes("tues_check") && day_number == 2)
		|| (filters.includes("wed_check") && day_number == 3)
		|| (filters.includes("thurs_check") && day_number == 4)
		|| (filters.includes("fri_check") && day_number == 5)
		|| (filters.includes("sat_check") && day_number == 6)
		|| (!filters.includes("sun_check") && !filters.includes("mon_check") && !filters.includes("tues_check") && !filters.includes("wed_check") && !filters.includes("thurs_check") && !filters.includes("fri_check") && !filters.includes("sat_check"))
		){
			return true;
		}
	}

	function isCorrectTime(d){
		var dt = d.TIME + " " + d.DATE;
		var day_type = getDayType(dt);

		if((filters.includes('day_checked') && isDay(dt))
		|| (filters.includes('night_checked') && !isDay(dt))
		|| (!filters.includes('day_checked') && !filters.includes('night_checked'))
		){
			return true;
		}
	}

	function resetLine(){

		if(data.length >0 && counter < data.length-1) {

			var d = data[counter];
			nextDataPoint(data[counter]);
			counter++;

		}
	}


function loadData(){

	var month = $('#month').val();
	var url = "data/ny_collisions_" + month + ".csv";
	$('.loader').each(function(){
		$(this).show();
	})

	d3.csv(url, function(_data) {

		data = _data;
		start_date = "";
		twirl_counter = 0;
		ctx2.background(0);
		filter();
		nextTwirlDataPoint();
		$('.holder').removeClass('hidden');
		$('.loader').each(function(){
			$(this).hide();
		})
	});

}

function filter() {


	viz = $('#viz_type').val();

	filters = [];
	$('input[type=checkbox]').each(function () {
		if (this.checked) filters.push(this.id);
	});

	//console.log(viz);
	//console.log(filters);

	if(data) {

		counter = 0;

		resetMap();
		reStyleMap();
		deleteMarkers();

		if(viz == 2) addHeatmap();
		resetLine();

	}
}

ctx2.background(0);

function draw() {

	if(data && data.length >0 ) {
			if (page == 1 || page == 2) {
			twirl();
			twirl();
			twirl();
			drawGraph();
			}
			if (page == 3) {
				ctx.clearRect(0, 0, w, h);
				updateParticles();
			}

	}

}


function updateParticles(){

	if(viz == 6) {
		addNew(8)
	} else if (viz == 3 || viz == 4 || viz == 5) {
		addNew(4)
	} else if (viz == 1) {
		addNew(5)
	} else if (viz == 2 || viz == 3) {
		addNew(3)
	}

	for (var i = 0; i < particles.length; i++) {

		var p = particles[i];
		p.update();
		p.draw();

	}
}


function addNew(n){
	for (var i = 0; i < n; i++) {
		resetLine();
	}
}


function addLine(d){

	var pos = getLocs(d, gmap);
	x = pos.x;
	y = pos.y;
	counter++;
	lines = [];
	x1 = x;
	y1 = y;
	x2 = x1, y2 = y1;
	curve = random(-0.3, 0.3);
	change = random(-0.01, 0.01);

	if (config.line_width > 0.1) config.line_width -=0.004;

	curr_line_width = config.line_width;
	s = rgb(randomInt(100,250));

}


function addCircle(d, num, type){
	``
		var p = new Particle(d, num, type);

		if(viz == 1 || viz == 4 || viz == 5 || viz == 6) {
			particles.push(p);
		} else if(!isOverlapping(p)) {
			particles.push(p);
		}

}


function isOverlapping(p2){

	var hit = false;

	for (var i = 0; i < particles.length; i++) {

		var p = particles[i];

		if(p.show && p2.show && p.me != p2.me
			&& (viz == 6 && dist(p.x, p.y, p2.x, p2.y) < p.sticky_sz ||
			viz != 6 && dist(p.x, p.y, p2.x, p2.y) <= (p.sz/2 + p2.sz/2)
			)) {

			hit = true;

			if(viz == 1) {

				if(p2.sz >= p.sz ) {

					p2.sz += p.sz/5;
					if (p2.sz > p2.max_size) p2.sz = p2.max_size;
					p.show = false;
					//p2.c = "orange";

				} else {

					p.sz += p2.sz/2;
					if (p.sz > p.max_size) p.sz = p.max_size;
					p2.show = false;

				}

			} else if(viz == 6) {

				if(p.day == p2.day) {

					if (p2.sz >= p.sz ) {

						p2.sz += p.sz/2;
						if (p2.sz > p2.max_size) p2.sz = p2.max_size;
						p.show = false;
						//p2.c = "orange";

					} else if( p2.sz < p.sz ) {

						p.sz += p2.sz/2;
						if (p.sz > p.max_size) p.sz = p.max_size;
						p2.show = false;

					}
				if (p.sz >= p2.sz) {
					p.show = true;
					p2.show = false;
				} else {
					p2.show = true;
					p.show = false;
				}
				console.log("resetLine");
				resetLine();
				}

			}
			return hit;
		}
	}
}


function getParticleColour(d, type, sz){

	//console.log(isDayFiltered());

	var dt = d.DATE + " "+ d.TIME;
	var date = new Date(dt)
	var day = date.getDay();

	if(isDay(dt)) {
		c = rgb(255 - randomInt(100,250));
	} else {
		c = rgb(randomInt(100,250));
	}

	if(viz == 1) {
		if(isDayFiltered()) {
			c = rgb(100 - sz * 20);
		} else {
			c = rgb(20 + sz * 20);
		}
	}

	if (viz == 3) {
		//console.log(type);
		if(type == "ok") {

			if(isDayFiltered()) {
				c = rgb(60);
			} else {
				c = rgb(80);
			}

		} else {
			if (filters.includes('day_checked') && filters.includes('night_checked')){
				c = rgb(200);
			} else if(isDayFiltered()) {
				c = "#fa7600";
			} else {
				c = rgb(200);
			}

		}

	} else if (viz == 4) {

			if(type == 'motorists'){
				c = motorist_colour;
			} else if(type == 'cyclists'){
				c = cyclist_colour;
			} else if(type == 'pedestrians'){
				c = pedestrian_colour;
			} else {
				c = rgba(0, 0);
			}

	} else if (viz == 5) {

		if(!isDay(dt)) {
			c = "yellow";
		} else {
			c = "#00aef0";
		}
	} else if(viz == 6) {
		c = colours2.get(day);
	}
	//console.log(c);
	return c;
}


var Particle = function(d, num, type){
	//console.log(d);
	//console.log(num);
	this.sz = num + 3;

	var pos = getLocs(d, gmap);
	this.x = pos.x;
	this.y = pos.y;

	this.type = type;

	this.sz = 1 + num * 1.1;

	this.max_size = randomInt(30, 40);

	this.on = true;
	this.show = true;
	this.me = frameCount;
	var dt = d.DATE + " " + d.TIME;
	var date = new Date(dt)
	this.day = date.getDay();

	if(viz == 1) {
		this.on = false;
		this.sz = 3 + num * 1.1;
	} else if(viz == 2) {
		this.sz = 4;
		this.on = false;

	} else if(viz == 3) {
		this.on = false;
		this.sz = 2 + this.sz + num * 1.1;
		if(this.type != "ok") this.sz+=1;
		this.max_size = randomInt(20, 25);

	} else if(viz == 4) {
		this.on = false;
		this.sz = 16;

	} else if(viz == 5) {
		this.on = false;

	} else if(viz == 6) {
		this.sticky_sz = 12;
		if (this.day == 0) this.day = 7;
	}

	this.c = getParticleColour(d, type, this.sz);

	this.update = function(){

		if(viz == 1) {
			isOverlapping(this);
		} else if((viz == 6) && this.show) {
			isOverlapping(this);
		} else if(this.on && isOverlapping(this)) {
			this.on = false;
			resetLine();
		}

		if(this.show && this.on && this.sz < 30) {
			this.sz += 0.02;
		} else if (this.on && this.sz >= 30){
			this.on = false;
			//resetLine();
		}

	}


	this.draw = function(){

		if(viz == 1 && this.show) {
			ctx.strokeStyle = this.c;
			ctx.lineWidth = 1;
			ctx.strokeEllipse(this.x, this.y, this.sz, this.sz);
		} else if (viz == 2){
			ctx.fillStyle = this.c;
			ctx.fillEllipse(this.x, this.y, this.sz, this.sz);
		} else if (viz == 3){
			if(!isDayFiltered() && this.type != "ok") {
				ctx.fillStyle = rgb(0);
				ctx.cross(this.x + 2, this.y + 2, this.sz/4, this.sz);
			} else {
				ctx.fillStyle = rgba(0, 0.3);
				ctx.cross(this.x + 1, this.y + 1, this.sz/4, this.sz);
			}
			ctx.fillStyle = this.c;
			ctx.cross(this.x, this.y, this.sz/4, this.sz);
		} else if (viz == 4){

			ctx.fillStyle = this.c;
			//console.log(this.c);
			// ctx.centreFillRect(sticky(this.x,this.sz), sticky(this.y,this.sz), this.sz, this.sz);
			ctx.fillEllipse(sticky(this.x,this.sz), sticky(this.y,this.sz)-0.5, this.sz, this.sz);
			ctx.fillStyle = "#333";
			ctx.font = "10px Arial";
			ctx.textAlign = "center";

			if(this.type != "ok") {
				if (this.type == "pedestrians") {
					var t = "P";
				} else if (this.type == "cyclists") {
					var t = "C";
					//ctx.fillStyle = "#333";
				} else {
					var t = "M";
				}

				ctx.fillText(t, sticky(this.x, this.sz), sticky(this.y, this.sz) + this.sz/4);

			}

		} else if (viz == 5){
			ctx.fillStyle = this.c;
			ctx.LfillEllipse(this.x, this.y, this.sz, this.sz);

		} else if (viz == 6 && this.show){

			ctx.font = "10px Arial";
			ctx.textAlign = "center";
			ctx.fillStyle = this.c;
			ctx.centreFillRect(sticky(this.x, this.sticky_sz), sticky(this.y, this.sticky_sz), this.sticky_sz, this.sticky_sz);

			if(isDayFiltered()) {
				ctx.fillStyle = "#fff";
			} else {
				ctx.fillStyle = "#333";
			}

			ctx.fillText(this.day, sticky(this.x, this.sticky_sz), sticky(this.y, this.sticky_sz) + 3.2);
		}

	}

}





function addHeatmap(){
	console.log("addHeatmap");

	heatmapData = new google.maps.MVCArray();
	heatmap = new google.maps.visualization.HeatmapLayer({
			data: heatmapData,
			opacity: 0.6,
			dissipating: true,
			maxIntensity: 140,
			radius: 40,
			gradient: gradient
	});

	heatmap.setMap(gmap);
}


function updateTwirlUI(d){

	var dt = d.TIME + " " + d.DATE;
	var full_date = getDate(d.TIME + " " + d.DATE, 1);
	if (start_date == "") start_date = full_date;

	$('#twirl_date_holder').html("<b>New York Vehicle Collisions:</b><br>"
	+ start_date + " - <br>" + full_date + " ");
}


var headline_array = ['Collision Density', 'Heatmap', 'Injuries &amp; Close Calls', 'Most Dangerous Places for Pedestrians, Cyclists &amp; Motorists', 'Day vs Night', 'Most Dangerous Day of the Week'];

function updateUI(d){

	var dt = d.TIME + " " + d.DATE;
	var full_date = getDate(d.TIME + " " + d.DATE, 1);

	//console.log(dt + " : " + full_date);

	if (start_date == "") start_date = full_date;

	$('#viz_date_holder').html("<b>New York Vehicle Collisions:<br>"
		+ headline_array[viz-1] + "</b><br>"
		+ start_date + " - <br>" + full_date + " ");

  $('#all .total .count').html(counter);
	$('#all .ok .count').html(total_injured);
	$('#all .injured .count').html(total_injured);
	$('#all .killed .count').html(total_deaths);

	$('#pedestrians .injured .count').html(total_pedestrians_injured);
	$('#pedestrians .killed .count').html(total_pedestrians_deaths);

	$('#cyclists .injured .count').html(total_cyclists_injured);
	$('#cyclists .killed .count').html(total_cyclists_deaths);

	$('#motorists .injured .count').html(total_motorists_injured);
	$('#motorists .killed .count').html(total_motorists_deaths);

	addDay(d);

  if(killed == 0) {
    $('#all .killed .bullet').removeClass('active');
  } else {
    $('#all .killed .bullet').addClass('active');
  }

  if(injured == 0) {
    $('#all .injured .bullet').removeClass('active');
  } else {
    $('#all .injured .bullet').addClass('active');
  }

	if(ok == 0) {
		$('#all .ok .bullet').removeClass('active');
	} else {
		$('#all .ok .bullet').addClass('active');
	}

  if(pedestrians_injured == 0) {
    $('#pedestrians .injured .bullet').removeClass('active');
  } else {
    $('#pedestrians .injured .bullet').addClass('active');
  }

	if(pedestrians_killed == 0) {
    $('#pedestrians .killed .bullet').removeClass('active');
  } else {
    $('#pedestrians .killed .bullet').addClass('active');
  }

	if(cyclists_injured == 0) {
    $('#cyclists .injured .bullet').removeClass('active');
  } else {
    $('#cyclists .injured .bullet').addClass('active');
  }

  if(cyclists_killed == 0) {
    $('#cyclists .killed .bullet').removeClass('active');
  } else {
    $('#cyclists .killed .bullet').addClass('active');
  }

	if(motorists_injured == 0) {
		$('#motorists .injured .bullet').removeClass('active');
  } else {
		$('#motorists .injured .bullet').addClass('active');
  }

  if(motorists_killed == 0) {
		$('#motorists .killed .bullet').removeClass('active');
  } else {
		$('#motorists .killed .bullet').addClass('active');
  }


}


function isDayFiltered(){
	if((filters.includes('day_checked') && !filters.includes('night_checked')) || (filters.includes('day_checked') && filters.includes('night_checked'))) {
		return true;
	}
}

function getDayType(dt){
	if(isDay(dt)) {
		return day_type = "day";
	} else {
		return day_type = "night";
	}
}



function addDay(d){

	var dt = d.TIME + " " + d.DATE;
	var day_type = getDayType(dt);
	var day_number = getDayNumber(dt);


	$('#days .mon .count').html(monday);
	$('#days .tues .count').html(tuesday);
	$('#days .wed .count').html(wednesday);
	$('#days .thurs .count').html(thursday);
	$('#days .fri .count').html(friday);
	$('#days .sat .count').html(saturday);
	$('#days .sun .count').html(sunday);

	$('#days .day .bullet').removeClass('active');
	$('#days .night .bullet').removeClass('active');
	$('#days .mon .bullet').removeClass('active');
	$('#days .tues .bullet').removeClass('active');
	$('#days .wed .bullet').removeClass('active');
	$('#days .thurs .bullet').removeClass('active');
	$('#days .fri .bullet').removeClass('active');
	$('#days .sat .bullet').removeClass('active');
	$('#days .sun .bullet').removeClass('active');

	if(frameCount%2 == 0) {

		if (isDay(dt)) {
			$('#days .day .bullet').addClass('active');
		} else {
			$('#days .night .bullet').addClass('active');
		}

		if (day_number == 1) {
			monday++;
			$('#days .mon .bullet').addClass('active');
		}
		if (day_number == 2) {
			tuesday++;
			$('#days .tues .bullet').addClass('active');
		}
		if (day_number == 3) {
			wednesday++;
			$('#days .wed .bullet').addClass('active');
		}
		if (day_number == 4) {
			thursday++;
			$('#days .thurs .bullet').addClass('active');}
		if (day_number == 5) {
			friday++;
			$('#days .fri .bullet').addClass('active');}
		if (day_number == 6) {
			saturday++;
			$('#days .sat .bullet').addClass('active');}
		if (day_number == 7 || day_number == 0) {
			sunday++;
			$('#days .sun .bullet').addClass('active');}

	}
}


function makeInfoWindowContent(d){

	var dt = getDate(d.TIME + " " + d.DATE, 1);

	var txt = '<div class="info_content" class="text-center">';
	txt += "<div class='info_date'>" + dt + "</div><br>";
	txt += "<h3>"
	if(d['BOROUGH'] != "") txt += d.BOROUGH;
	if(d['CROSS STREET NAME'] != "") txt += ": " + d['CROSS STREET NAME'];
	txt +="</h3>";


	txt += "<div class='info_injuries half-top'>";

	txt += "<span style='color: #496b8e'>";
	if(d['NUMBER OF PEDESTRIANS INJURED'] != undefined && parseInt(d['NUMBER OF PEDESTRIANS INJURED']) != 0) {
		txt += "Cyclists Injured: " + d['NUMBER OF PEDESTRIANS INJURED'] + " ";
	}

	if(d['NUMBER OF PEDESTRIANS KILLED'] != undefined && parseInt(d['NUMBER OF PEDESTRIANS KILLED']) != 0) {
		txt += "Pedestrians Killed: " + d['NUMBER OF PEDESTRIANS KILLED'] + "<br>";
	}
	txt += "</span>";

	txt += "<span style='color: #496b8e'>";

	if(d['NUMBER OF CYCLIST INJURED'] != undefined && parseInt(d['NUMBER OF CYCLIST INJURED']) != 0) {
		txt += "Cyclists Injured: " + d['NUMBER OF CYCLIST INJURED'] + " ";
	}

	if(d['NUMBER OF CYCLIST KILLED'] != undefined && parseInt(d['NUMBER OF CYCLIST KILLED']) != 0) {
		txt += "Cyclists Killed: " +d['NUMBER OF CYCLIST KILLED'] + "<br>";
	}
	txt += "</span>";

	txt += "<span style='color: #496b8e'>";

	if(d['NUMBER OF MOTORIST INJURED'] != undefined && parseInt(d['NUMBER OF MOTORIST INJURED']) != 0) {
		txt += "Motorists Injured: " +d['NUMBER OF MOTORIST INJURED'] + " ";
	}

	if(d['NUMBER OF MOTORIST KILLED'] != undefined && parseInt(d['NUMBER OF MOTORIST KILLED']) != 0) {
		txt += "Motorists Killed: " + d['NUMBER OF MOTORIST KILLED'] + "<br>";
	}
	txt += "</span>";



	if(d["CONTRIBUTING FACTOR VEHICLE 1"] != "" && d["CONTRIBUTING FACTOR VEHICLE 2"] != "") {
		txt +="<h4>Contributing Factors: ";
		if(d["CONTRIBUTING FACTOR VEHICLE 1"] != "" && d["CONTRIBUTING FACTOR VEHICLE 1"] != "Unspecified") txt += d["CONTRIBUTING FACTOR VEHICLE 1"] + " ";
		if(d["CONTRIBUTING FACTOR VEHICLE 2"] != "" && d["CONTRIBUTING FACTOR VEHICLE 2"] != "Unspecified") txt += d["CONTRIBUTING FACTOR VEHICLE 2"] + " ";
		if(d["CONTRIBUTING FACTOR VEHICLE 3"] != "" && d["CONTRIBUTING FACTOR VEHICLE 3"] != "Unspecified") txt += d["CONTRIBUTING FACTOR VEHICLE 3"] + " ";
		txt +="</h4>";
	}


	txt +='</div>';

	return txt;
;
}




	 $('.close').on('click',function(){
	 	$('.holder').toggleClass('hidden');
	 	if($('.holder').hasClass('hidden')) {
	 		$('.close').html("+");
	 	} else {
	 		$('.close').html("x");
	 	}
	 })



	 function drawGraph(){

	   var pos = map(counter, 0, data.length, 0, w);
	   ctx2.fillStyle = "#0f94c7";
	   ctx2.fillRect(0, 0, pos, 6);

	 }

var page = 1;

	 $(document).ready(function() {
	 	$('#fullpage').fullpage({
			navigation: true,
			keyboardScrolling: true,
			scrollBar: true,
			//scrollOverflowReset: true,
			afterLoad: function( anchorLink, index){
				//console.log(index);
				page = index;
			},
			onLeave: function(index, nextIndex, direction){

				var leavingSection = $(this);
				if(index == 1 && direction =='down'){
				 page = 2;
				 nextTwirlDataPoint();
			 } else if(index == 2 && direction =='down'){
					page = 3;
					filter();
				} else if(index == 3 && direction == 'up'){

					page = 2;
					nextTwirlDataPoint();
				} else if(index == 3){
					page = 3;
				}
			//console.log(page);
		}
		});
	 });
