
// STYLE GENERAL POI WINDOW

  var infoWindow = new InfoBubble({
      minHeight: 120,
      minWidth: 300,
      hideCloseButton: true,
      disableAutoPan: true,
      disableAnimation: true,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 8,
      arrowSize: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      maxWidth: 400
  }), d;

var markers = [];
var infowindows = [];


	 window.onload = function(){

	 	var location = {
	         "lat": 40.7090,
	         "lng": -73.85
	     };

	 	var myLatlng = new google.maps.LatLng(location.lat, location.lng);

	 	var mapOptions = {
	 		zoom: 11,
	 		styles: dark,
	 		center: myLatlng,
	 		mapTypeId: google.maps.MapTypeId.ROAD,
	 		disableDefaultUI: false,
	 		scrollwheel: false,
	 		draggable: true,
	 		navigationControl: false,
	 		mapTypeControl: false,
	 		scaleControl: true,
	 		streetViewControl: false,
	 		zoomControl: true,
	 		zoomControlOptions: {
	          position: google.maps.ControlPosition.LEFT_BOTTOM
	     },
	 		disableDoubleClickZoom: false
	 	};

	 	gmap = new google.maps.Map(document.getElementById("map"), mapOptions);

	 	// initialize the canvasLayer
	 	var canvasLayerOptions = {
	 		map: gmap,
	 		resizeHandler: resize,
	 		animate: true,
	 		updateHandler: draw,
	 		resolutionScale: resolutionScale
	 	};

	 	canvasLayer = new CanvasLayer(canvasLayerOptions);
	 	ctx = canvasLayer.canvas.getContext('2d');

	 	ctx.font = "18px Monospace";
	 	ctx.textAlign = "center";
	 	ctx.moveTo(w/2, h/2);
	 	ctx.beginPath();
	 	ctx.lineCap = 'round';
	 	ctx.lineWidth = 2;

	 	google.maps.event.addListener(gmap, "drag", function(){
	 		if(viz !=4) resetMap();
	 	});

	 	google.maps.event.addListener(gmap, "zoom_changed", function(){
	 		if(viz !=4) resetMap();
	 	});

	 	google.maps.event.addListenerOnce(gmap, "idle", function(){

	 		mapLoaded = true;
	 		ctx.clearRect(0, 0, w, h);

	 		loadData();

	 });

	 };



	 function resetMap(){
	 		ctx.clearRect(0,0,w,h);
	 		heatmapData = [];
	 		particles = [];
	 		counter = 0;
	 		active_lines = [];
	 		line = [];
	 		total_pedestrians_injured = 0, total_pedestrians_deaths = 0;
	 		total_cyclists_injured = 0, total_cyclists_deaths = 0;
	 		total_motorists_injured = 0, total_motorists_deaths = 0;
	 		total_deaths = 0, total_injured = 0;
	 		monday = 0, tuesday = 0, wednesday = 0, thursday = 0, friday = 0, saturday = 0, sunday = 0;

	 		for (var i = 0; i < markers.length; i++) {
	 			markers[i].setMap(null);
	 		}

	 		markers = [];
	 		if(heatmap) heatmap.setMap(null);

	 }



function reStyleMap(){

	if ((filters.includes('day_checked')
 		&& filters.includes('night_checked'))
 		|| (!filters.includes('day_checked') && !filters.includes('night_checked'))
 	){

		$('.holder').removeClass('day');
		$('#headline h1').removeClass('daytime');
		gmap.setOptions({styles: dark});
	} else if (isDayFiltered()){
		gmap.setOptions({styles: light});
		$('#headline h1').addClass('daytime');
	 	//$('.holder').addClass('day');
	} else if (filters.includes('night_checked')){
		//$('.holder').removeClass('day');
	 	gmap.setOptions({styles: night});
		$('#headline h1').removeClass('daytime');
	}


}


function addMarker(d, i){

				c++;

				var accidentLatlng = new google.maps.LatLng(d.LATITUDE, d.LONGITUDE);
				var txt = makeInfoWindowContent(d);

				var icon = chooseIcon(d);

				if (viz != 8) {
					var marker = markers[total_deaths];
					marker = new google.maps.Marker({
		    		position: accidentLatlng,
						icon: icon,
						map: gmap,
						animation: google.maps.Animation.DROP,
					});
					markers.push(marker);
					google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {

		 			return function() {
				 	infoWindow.setContent(makeInfoWindowContent(d));
				 	infoWindow.open(gmap, marker);
					}

	})(marker, i));


	google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
	 return function() {
			 infoWindow.setContent(makeInfoWindowContent(data[i]));
			 infoWindow.close(gmap, marker);
	 }
	})(marker, i));
	}
}


 function deleteMarkers(){
 	for (var i = 0; i < markers.length; i++) {
 		markers[i].setMap(null);
 	}
 	markers = [];
 }

	 function addHeatMapData(d, total){
	 	//console.log("addHeatMapData");
	 	var loc = new google.maps.LatLng(d.LATITUDE, d.LONGITUDE);
	 	for (var i = 0; i < total; i++) {
	 		heatmapData.push(loc);
	 	}
	 	addLocCross(d, loc)
	 }



	 function chooseIcon(d){

	 	var icon = 'img/red_cross.png';

	 	if(viz == 5){
	 		var dt = d.DATE + " " + d.TIME;
	 		if(isDay(dt)) {
	 			icon = 'img/blue_cross.png';
	 		} else {
	 			icon = 'img/yellow_cross.png';
	 		}

	 	} else if (viz == 4){
	 		if(pedestrians_killed > 0) {
	 			icon = 'img/pink_cross.png';
	 		} else if(cyclists_killed > 0) {
	 			icon = 'img/green_cross.png';
	 		} else if(motorists_killed > 0) {
	 			icon = 'img/blue_cross2.png';
	 		}

	 	} else if (viz == 2) {

	 		icon = 'img/cross.png';

	 	} else if (viz == 3) {

	 		icon = 'img/cross.png';

	 	}

	 	return icon;

	 }



	var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":67}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
	var day = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];



	var night =
	[{ "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
        ]
    },


    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000",
								"visibility": "off"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },

        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
						{
                "color": "#000000"
            },

        ]
    },
		{
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000"
            },
            {
                "lightness": 1
            }
        ]
    }
];


var dark = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },

        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-100"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "gamma": "0.00"
            },
            {
                "lightness": "74"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 0
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 0
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 0
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];

//
// var light = [
//     {
//         "featureType": "administrative",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "color": "#f2f2f2"
//             },
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "saturation": -100
//             },
//             {
//                 "lightness": 45
//             },
//             {
//                 // "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
// 		{
// 				"featureType": "road.highway",
// 				"elementType": "labels",
// 				"stylers": [
// 						{
// 								"visibility": "off"
// 						}
// 				]
// 		},
//
//     {
//         "featureType": "road.arterial",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "transit",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "color": "#ffffff"
//             },
//             {
//                 "visibility": "on"
//             }
//         ]
//     }
// ];

var light = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
		{
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#fff"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
		{
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": "96"
            }
        ]
    },
		{
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 85
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
						{
								"saturation": -60
						},
						{
								"lightness": 45
						},
            {
                "visibility": "on"
            }
        ]
    }
];


var light = [
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
						{
                "color": "#fff"
            },
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
						{
                "saturation": -100
            },
						{
                "lightness": 200
            },
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]


/////////////////////////////////////

// var gradient = [					// rgba colors for the gradient
// 'rgba(0,255,255,0)','rgba(0,255,255,0.5)','rgba(0,191,255,0.5)','rgba(0,127,255,0.5)',
// 'rgba(0,63,255,0.5)','rgba(0,0,223,0.5)','rgba(0,0,191,0.5)','rgba(0,0,159,0.5)',
// 'rgba(0,0,127,0.5)','rgba(63,0,91,0.5)','rgba(191,0,31,0.5)','rgba(255,255, 255,1)',
// ];
// var gradient = [
// 'rgba(0,0,0,0)', 'rgba(0,127,255,0.5)', 'rgba(255,0,0,0.5)', 'rgba(255,255, 255,1)'
// ];

var gradient = ['rgba(0,0,0,0)', 'rgba(110,229,49, 0.7)', 'rgba(255,255,0, 0.75)', 'rgba(255,116,0, 0.8)', 'rgba(255,0,0, 0.85)'];

var gradient = [
rgba(0,0), '#fdee7c', '#f9d663', '#f2b353', '#ed9346', '#e76e34', '#d3542d', '#99442a', '#543730'
];
// var gradient = [
// 'rgba(0,0,0,0)', '#FFFF00', 'rgba(255,255, 255,1)'
// ]
