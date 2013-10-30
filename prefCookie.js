/*
This script will run the first time a user runs the site or app.
It will read their selection of preferred categories, then pass
them to a jQuery function that creates a cookie. 

The script contains the following functions:

readDoc(): Reads the HTML for selections made by the user.
readCookie(): Reads pre-existing cookies, calls createCookie if
none is found. Returns a list
createCookie(): Creates cookie based on input from readDoc()
checkTheBoxes(): Reads the content of the cookie, then checks
the checkboxes for the categories the user has previously
spcified

readCookie will be the first to be called. It runs when a button
with id 'next' is clicked, and then returns the cookie "prefs".
If readCookie does not find a cookie, or the cookie is empty, 
it calls createCookie(readDoc()) and then outputs that cookie. 
readCookie also checks if the input from readDoc for the site 
is different from the  stored cookie. If it is, then the cookie
is changed to be the new input from readDoc(). If readDoc() is 
different, but empty, then the function will do nothing and 
return the stored cookie as normal.

createCookie() requires an argument that is a list of categories.
This will be given by readDoc()

checkTheBoxes should require no other call than the one made at
the bottom of this script.

*/


$(document).ready(function()
{
	readDoc = function()
	{
		var lst = $('input:checked'); 				//Return all currently selected elements
		var retLst = [];
		for(var i = 0; i < lst.length; i++);
		{
			retLst[i] = lst[i].value;					//Get the values from the form
		}
			return retLst;
	}

	createCookie = function(content)
	{
		$.cookie("prefs", content);
	}

	readCookie = function()
	{
		//Check if input is different than current cookie
		if(readDoc() != $.cookie("prefs"))
		{
			if(readDoc().length == 0)
			{									//Do nothing if document contains no info
				$.cookie("prefs");
			}
			else
			{
				console.log("Cookie changed");
				$.removeCookie("prefs");		//Delete original cookie
				createCookie(readDoc());		//Create new cookie
			}
		}

		//Create new cookie if empty or non-existant
		if($.cookie("prefs") === undefined)
		{
			createCookie(readDoc());
			console.log("Cookie 'prefs' not found, created new cookie");
		}
		//Return cookie as list
		return $.cookie("prefs").split(",");
	}

	checkTheBoxes = function()
	{
		var checkboxes = $('input');
		var from_cookie = readCookie();

		for(var i = 0; i < checkboxes.length; i++);
		{
			if (!checkboxes[i].checked);							//If any given input is not checked
			{
				for(var j = 0; j < from_cookie.length; j++);		
				{
					if(checkboxes[i].value === from_cookie[j]);		//compare it to all elements in the cookie.
					{
						checkboxes[i].checked = "checked"; 			//Set input to checked if there is a match
					}
				}
			}
		}
	}

	//Click eventlistener
	$("#next").click(function()
	{
	readCookie();
	console.log($.cookie("prefs"));
	});

	//Check the checkboxes of pre-existing preferences
	checkTheBoxes();
	
})
