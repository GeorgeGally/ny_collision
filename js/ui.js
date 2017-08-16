
function isDayOn(){
  //console.log(filters);
	if((filters.includes('day_checked') && !filters.includes('night_checked'))
  || (!filters.includes('day_checked') && !filters.includes('night_checked'))
  || (filters.includes('day_checked') && filters.includes('night_checked'))
  ) {
		return true;
	}
}


 $("input[type=checkbox]").change(function(e){


	 var target = e.target.id;
   //console.log(target);
	 if(target == "all_accidents"){
	 	if($('#all_accidents').is(':checked')) {
		 	turnAllChecked(true);
			turnMain(true);
			turnSubs("injured", true);
			turnSubs("killed", true);
			turnDays(true);
	 } else if(target == "all_accidents" ) {
		 	turnAllChecked(false);
		 	turnSubs("injured", false);
			turnSubs("killed", false);
			turnMain(false);
			turnDays(false);
	 }
}
	if(target == "total_injured" && $('#total_injured').is(':checked')) {
		turnSubs("injured", true);
	}

	if(target == "total_injured" && !$('#total_injured').is(':checked')) {
		$('#all_accidents').prop( "checked", false );
		turnSubs("injured", false);
	}

	if(target == "total_killed" && $('#total_killed').is(':checked')) {
		turnSubs("killed", true);
	}

	if(target == "total_killed" && !$('#total_killed').is(':checked')) {
		$('#all_accidents').prop( "checked", false );
		turnSubs("killed", false);
	}

	if(target == "ok_checked" && $('#ok_checked').is(':checked')) {
		$('#all_accidents').prop( "checked", true );
	}

	if(target == "ok_checked" && !$('#ok_checked').is(':checked')) {
		$('#all_accidents').prop( "checked", false );
	}

	if((target == "total_injured" || target == "total_killed" || target == "ok_checked") && ($('#total_injured').is(':checked') && $('#total_killed').is(':checked') && $('#ok_checked').is(':checked'))) {
		$('#all_accidents').prop( "checked", true );
		turnMain(true);
		turnSubs("injured", true);
		turnSubs("killed", true);

	}

	if(target == "pedestrians_checked") {

			if($('#pedestrians_checked').is(':checked')) {
				$('#pedestrians_injured').prop( "checked", true );
				$('#pedestrians_killed').prop( "checked", true );
			} else {
				$('#pedestrians_injured').prop( "checked", false );
				$('#pedestrians_killed').prop( "checked", false );
				turnOffAllChecked();
			}

	}

	if(target == "pedestrians_injured" || target == "pedestrians_killed"){

			if ($('#pedestrians_injured').is(':checked') && $('#pedestrians_killed').is(':checked') ){
				$('#pedestrians_checked').prop( "checked", true );
		} else if( !$('#pedestrians_injured').is(':checked') || !$('#pedestrians_killed').is(':checked')) {
				$('#pedestrians_checked').prop( "checked", false );
				turnOffAllChecked()
		}
	}



if(target == "cyclists_checked") {

		if($('#cyclists_checked').is(':checked')) {
			$('#cyclists_injured').prop( "checked", true );
			$('#cyclists_killed').prop( "checked", true );
		} else {
			$('#cyclists_injured').prop( "checked", false );
			$('#cyclists_killed').prop( "checked", false );
			turnOffAllChecked();
		}

}

if(target == "cyclists_injured" || target == "cyclists_killed"){

		if ($('#cyclists_injured').is(':checked') && $('#cyclists_killed').is(':checked') ){
			$('#cyclists_checked').prop( "checked", true );
	} else if( !$('#cyclists_injured').is(':checked') || !$('#cyclists_killed').is(':checked')) {
			$('#cyclists_checked').prop( "checked", false );
			turnOffAllChecked()
	}
}


if(target == "motorists_checked") {

		if($('#motorists_checked').is(':checked')) {
			$('#motorists_injured').prop( "checked", true );
			$('#motorists_killed').prop( "checked", true );
		} else {
			$('#motorists_injured').prop( "checked", false );
			$('#motorists_killed').prop( "checked", false );
			turnOffAllChecked();

		}

}

if(target == "motorists_injured" || target == "motorists_killed"){

		if ($('#motorists_injured').is(':checked') && $('#motorists_killed').is(':checked') ){
			$('#motorists_checked').prop( "checked", true );
	} else if( !$('#motorists_injured').is(':checked') || !$('#motorists_killed').is(':checked')) {
			$('#motorists_checked').prop( "checked", false );
			turnOffAllChecked()
	}
}



	if(target == "days_checked") {

			if($('#days_checked').is(':checked')) {
				turnDays(true);
			} else {
				turnDays(false);
			}

	}


	if(target == "mon_check" || target == "tues_check" || target == "wed_check" || target == "thurs_check" || target == "fri_check" || target == "sat_check" || target == "sun_check"){

		if ($('#mon_check').is(':checked') && $('#tues_check').is(':checked') && $('#wed_check').is(':checked') && $('#thurs_check').is(':checked') && $('#fri_check').is(':checked') && $('#sat_check').is(':checked') && $('#sun_check').is(':checked') ){
				$('#days_checked').prop( "checked", true );
		} else if (!$('#mon_check').is(':checked') || !$('#tues_check').is(':checked') || !$('#wed_check').is(':checked') || !$('#thurs_check').is(':checked') || !$('#fri_check').is(':checked') || !$('#sat_check').is(':checked') || !$('#sun_check').is(':checked') ){
			$('#days_checked').prop( "checked", false );
			turnOffAllChecked()
		}
}

	if($('#pedestrians_checked').is(':checked') && $('#cyclists_checked').is(':checked') && $('#motorists_checked').is(':checked') && $('#days_checked').is(':checked')  ) {
		$('#all_accidents').prop( "checked", true );
		turnAllChecked(true)
	}

	 filter();
 })






 function turnMain(val){
 	$('#motorists_checked').prop( "checked", val );
 	$('#cyclists_checked').prop( "checked", val );
 	$('#pedestrians_checked').prop( "checked", val );
 	filter_pedestrian = val;
 	filter_cyclist = val;
 	filter_motorist = val;
 }


 function turnOffAllChecked(){
 	$('#all_accidents').prop( "checked", false );
 	turnAllChecked(false)
 }



 	function turnDays(val){
 		$('#mon_check').prop( "checked", val );
 		$('#tues_check').prop( "checked", val );
 		$('#wed_check').prop( "checked", val );
 		$('#thurs_check').prop( "checked", val );
 		$('#fri_check').prop( "checked", val );
 		$('#sat_check').prop( "checked", val );
 		$('#sun_check').prop( "checked", val );
 		$('#days_checked').prop( "checked", val );
 	}

  function turnAllChecked(val){
  	//$('#total_injured').prop( "checked", val );
  	//$('#total_killed').prop( "checked", val );
  	//$('#ok_checked').prop( "checked", val );
 	if(val == true) {
 		turnMain(true);
 		turnSubs("injured", true);
 		turnSubs("killed", true);
 	}
  }


  function turnSubs(type, val){
  	$('#motorists_' + type).prop( "checked", val );
  	$('#cyclists_' + type).prop( "checked", val );
  	$('#pedestrians_' + type).prop( "checked", val );
 	if(val == false) {
 		turnMain(false);
 	}
  }



  function updateUI(d){

  	var dt = d.TIME + " " + d.DATE;
  	var full_date = getDateTime(d);

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
