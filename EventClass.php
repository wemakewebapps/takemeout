<?php 

class EventClass {
	var $allTorontoEvents = array();
	var $simpleXML; 
	function EventClass(){
		$this->simpleXML = simplexml_load_file('toronto_events.xml');
	}
	function addFestivals(){
		function randomIndex($counter){
			list($usec, $sec) = explode(' ', microtime());
			$seed = (float) $sec + ((float) $usec * 100000);
			srand($seed);
			$rand = rand(0,$counter-1);
			return $rand;
		
		}
		$counter = 0;

		$allEvents = array();
		foreach($this->simpleXML->viewentry as $event){
			$counter++;
			 $aName = $event->entrydata[0]->text;
			 $aDate = $event->entrydata[5]->text;
			 $aURL = $event->entrydata[18]->text;
			 $aLocation = $event->entrydata[13]->text;
			 $aAddress = $event->entrydata[15]->text;
			 $aLongDescription = $event->entrydata[10]->text;
			 $arr = array('name' => (string)$aName,'date' => (string)$aDate, 'location'=>(string)$aLocation . "; " . $aAddress, 'url' => (string)$aURL, 'description' => (string)$aLongDescription, 'price' => "", 'source' => 'City of Toronto');
			 array_push($allEvents, $arr);

		}
		return json_encode($allEvents[randomIndex($counter)]);
	}

};



?>