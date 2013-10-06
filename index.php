<!DOCTYPE html>
<html>
  <head>
    <title>Take me out</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="common/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="common/css/bootstrap.css" rel="stylesheet" media="screen">
    <link href="common/css/default.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" type="text/css" href="common/css/custom.css">
    <link href="common/css/bootstrap-responsive.css" rel="stylesheet" media="screen">
    <link href="common/css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">

<meta name="description" content="aDescription"/>
<meta name="keywords" content=""/> 
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	</head>
<!-- <link rel="stylesheet" type="text/css" href="/css/master.css" media="screen"/>	 -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="http://code.jquery.com/jquery.js"></script>
    <script src="common/js/bootstrap.js"></script>
    <script src="common/js/bootstrap.min.js"></script>
    <script src="common/js/content.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script type="text/javascript">
 function eventCallBack(data){
 	var websiteURL = data.url;
	document.getElementById("name").innerHTML = data.name;
	document.getElementById("date").innerHTML = data.date;
	document.getElementById("location").innerHTML = data.location; 
	document.getElementById("url").innerHTML = data.url;
	document.getElementById("description").innerHTML = data.description;
	document.getElementById("source").innerHTML = data.source;	
 }
 function getEvent(){
		var result = false;
			$.ajax(
			{
				type: "POST",
				url : "process.php",
				data : {randomNum: "3"},
				dataType: 'json',
				async: true,
				cache: false,
				timeout:3500,
				error: function(x, textStatus, m){
					if (textStatus == "timeout"){
						document.getElementById('test').innerHTML = 'That took too long.<br /> Please Try Again.';
					}
					else {
						document.getElementById('test').innerHTML = 'An error occured.<br /> Please Try Again.';					
					}
					//document.getElementById('animate').style.backgroundImage = "None";
				}
			}).done(function(data){
				eventCallBack(data);
			})
			
}

</script>

</head>
<body>

	<header>
      <div class ="muted main"></div>
    </header>
	    <!--Screen 1 begins-->


   

    <div class ="container screen1">
      
        
        
      <div class ="startpage">
        <button class="btn btn-large btn-primary somewhere" type="submit">Take Me Somewhere!</button>
        <button class="btn btn-large btn-primary surprise"  type="submit"  onclick = getEvent()>Surprise ME!</button>
      </div>
    </div>

    <!--Scren 1 ends-->


    <script>

</script>

    <!--Screen 2 begins-->

    <div class = "container screen2">
 
      <form>
        <div class ="distance">
        <input type ="text" placeholder ="distance">
      </div>
      <div class ="price">
        <input type ="text" placeholder="price">
      </div>
      <div class ="keyword">
        <input type ="search" placeholder="keyword">
      </div>
        <button class="btn btn-large btn-primary go" type="submit">Let's Go!</button>
      </form>
    </div>

    <!--Screen 2 ends-->

    <div class = "container screen3">
    	 <div class="blackscreen">
    	 </div>
	<?php require "EventClass.php" ?>

	<div class= "container screen3">
      
      <div id="blackscreen">
      <div class="transparency">
      </div>

      <div class="container part1">
        <div class="mapholder"> 
         <!--<img src="img/map.png"/>-->
         <div id="map-canvas" ></div>
        </div>
      </div>
       <div id="details"> 
	       	<p style="color:red">Title : <div id="name"></div></p>
	       	<p style="color:red">Date: <div id="date"></div></p>
	       	<p style="color:red">Location: <div id="location"></div></p>
	       	<p style="color:red">Website: <div id="url"></div></p>
	       	<p style="color:red">Description: <div id="description"></div></p>
	       	<p style="color:red">Source: <div id="source"></div></p>
	    </div>
	    <br>

      <div class="container part3">
        <button class ="btn-success btn btn-large somewhereElse" type="submit" onclick = getEvent()>Take me Somewhere Else!</button>
        <button class ="btn-success btn btn-large buyTickets" type-"submit">Buy Tickets</button>
      </div>
      </div>
    </div>

	<?php
	 	$eventObject = new EventClass();
		$result = $eventObject->addFestivals();
		echo $result;
?>

</div>
</body>
