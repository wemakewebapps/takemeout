/*
This script should run the first time a user runs the site or app.
It will read their selection of preferred categories, then pass
them to a jQuery function that creates a cookie. 

The script contains the following functions:

readDoc(): Reads the HTML for selections made by the user.
readCookie(): Reads pre-existing cookies, calls createCookie if
none is found
createCookie(): Creates cookie based on input from readDoc()

readCookie will be the first to be called. It runs when a button
with id 'next' is clicked. If readCookie does not find a cookie, 
or the cookie is empty, it calls createCookie(readDoc()) and then
returns that cookie.

createCookie() requires an argument that is a list of categories.
This will be given by readDoc()

*/


$(document).ready(function(){

	//Eventlistener
	$("#next").click(function(){
	readCookie();
	console.log($.cookie("prefs"));
	});

	readDoc = function(){
	  //Reads checkboxes, takes their values, and returns a list of them
		var lst = $('input:checked'); 				//Return all currently selected elements
		var retLst = [];
		for(var i = 0; i < lst.length; i++){
			retLst[i] = lst[i].value;					//Get the values
		}
		return retLst;
	}

	createCookie = function(content){
		$.cookie("prefs", content);
	}

	readCookie = function(){

		//Create new cookie if empty or non-existant
		//Changes cookie if selection has changed
		if($.cookie("prefs") === undefined){
			createCookie(readDoc());
			console.log("Cookie 'prefs' not found, created new cookie");
		}
		else if(readDoc() !== $.cookie("prefs")){
			$.removeCookie("prefs");
			createCookie(readDoc());
		}
		return $.cookie("prefs");	
	}
})
