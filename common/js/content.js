var curScreen;
var map;

function setScreen(curScreen){
	if (true) {};
}

function switchScreen2(){
	//$(".container").removeClass(".screen1 .screen2 .screen3").addClass("screen3");
	$(".screen1").hide("slow");
	$(".screen1").attr("display", "none");	
	//$(".screen1").css("display","none");
	$( ".screen3" ).show( "bounce", { times: 2, distance: 20 }, "slow" );
	google.maps.event.trigger(map, "resize");
}

function switchScreen1(){
	$(".screen1").hide("slow");
	$( ".screen2" ).show( "bounce", { times: 1, distance: 20 }, "slow" );
}

function switchScreen3(){
	$(".screen2").hide("slow");
  	$( ".screen3" ).show( "bounce", { times: 1, distance: 20 }, "slow" );
}

function initialize(){
	var myLatlng = new google.maps.LatLng(43.7000, -79.4);
	var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(44.5, -82),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  	map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  	var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });

}


function clickevents() {

	$(".surprise").on("click", function(){
		switchScreen2();
	});

	$(".somewhere").on("click", function(){
		switchScreen1();
	});
	$(".go").on("click", function(){
		switchScreen3();
	});


}


$(document).on("ready", function(){
	google.maps.event.addDomListener(window, 'load', initialize);
	clickevents();


});