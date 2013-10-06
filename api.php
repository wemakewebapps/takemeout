<?php

function getApi($rand_source)

{
	$title_ident = 'title';

	$date_ident = 'start_time';
	$date_subs = "-9";
	$location_ident = 'venue_address';
	$url_ident = 'url';
	$description_ident = 'description';
	$price_ident = 'price';
	$event_selector = 1;



	switch($rand_source) {

		case 0:
			$data_source = 'City of Toronto';
			//fill in later
			break;

		case 1:


			$catRan = rand(1,20);

			switch ($catRan) {

				case 1: $category = 'music'; break;
				case 2: $category = 'conference'; break;
				case 3: $category = 'comedy'; break;
				case 4: $category = 'learning_education'; break;
				case 5: $category = 'family_fun_kids'; break;
				case 6: $category = 'festival_parades'; break;
				case 7: $category = 'movies_film'; break;
				case 8: $category = 'food'; break;
				case 9: $category = 'fundraisers'; break;
				case 10: $category = 'art'; break;
				case 11: $category = 'holiday'; break;
				case 12: $category = 'books'; break;
				case 13: $category = 'attractions'; break;
				case 14: $category = 'community'; break;
				case 15: $category = 'business'; break;
				case 16: $category = 'outdoors_recreation'; break;
				case 17: $category = 'animals'; break;
				case 18: $category = 'sports'; break;
				case 19: $category = 'sales'; break;
				case 20: $category = 'technology'; break;


			}

			$data_source = 'eventful';
			$api_url = "http://api.eventful.com/rest/events/search?";
			$query_options = array(
				'app_key' => 'kXBDGMzjJqZHxgHS',
				'location' => 'Toronto',
				'include' => 'price',
				'date' => 'Next+month',
				'category' => $category
			);

			break;

		case 2:
			$data_source = 'eventbrite';
			$api_url = "http://www.eventbrite.com/xml/event_search?";
			$query_options = array(
				'app_key' => '6GTN5X2ZC53DUUMADX',
				'city' => 'Toronto',
				'date' => 'This+month',
				'max'  => '50',
			);

			

			break;
		case 3:
			$data_source = 'meetups';
			$api_url = "http://api.meetup.com/2/open_events.xml?";
			$query_options = array(
				'city' => 'Toronto',
				'country' => 'Canada',
				'lat' => '43.661896',
				'lon' => '-79.3952',
			);
			break;
	}


	if ($rand_source != 0)
	{
		//populate url with query options
		foreach($query_options as $name => $option)
		{
			$api_url = $api_url . $name . '=' . $option . '&';
		}

	 	$response = simplexml_load_file($api_url);


		//foreach($response->event as $child) {

		switch($rand_source)
		{
			case 1:
				$child = $response->events->event;
				$title_ident = $child->title;
				$price_ident = $child->price;
				$location_ident = $response->events->event->venue_address;
				$date_ident = $response->events->event->start_time;
				$url_ident = $response->events->event->url;
				$description_ident = $response->events->event->description;


				break;
			case 2:
				//DO NOT merge two following lines... $child needs to exist
				$child = $response->event;

				$total_items = $response->summary->total_items;


				if ($total_items < 50) { $event_selector = rand(0, $total_items - 1); }
				else { $event_selector = rand(0, 49); }



				$id = $response->event[$event_selector]->id;

				$api_url = "http://www.eventbrite.com/xml/event_get?app_key=6GTN5X2ZC53DUUMADX&id=" . $id;


				echo $api_url;

				$response = simplexml_load_file($api_url);
				$date_ident = 'start_date';
				$price_ident = $response->ticket->display_price;
				$location_ident = $response->venue->address;

				$title_ident = $response->title;
				$description_ident = $response->event->description;
				$date_subs = '0';


				break;
		}


		$event_data = array(

			'name' =>  (string)$title_ident,
			'date' => substr($date_ident, 0, $date_subs),
			'location' => (string)$location_ident,
			'url' => (string)$url_ident,
			'description' => strip_tags((string)$description_ident),
			'price' => (string)$price_ident,
			'source' => $data_source,
		);



	//	}



	//	$event_data['url'] = preg_replace('/\\\"/',"\"", $event_data['url']);

		if ($event_data['price'][0] = 0) {
			$event_data['price'] = 'Free';
		}


	//	$event_data = json_encode(array('item' => $event_data));
		$event_data = json_encode($event_data);

	return $event_data;
	}


}

?>

