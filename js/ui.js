
 $("input[type=checkbox]").change(function(e){

	 var target = e.target.id;

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
