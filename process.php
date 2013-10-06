<?php

	require dirname(__FILE__)."/EventClass.php";
	$randomNum = $_POST["randomNum"];

	$eventObject = new EventClass();
	$result = $eventObject->addFestivals();
	
	echo $result;

?>