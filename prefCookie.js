/*
Was looking for a bug, found a much clearer way to write the code.
It now relies on eventlisteners primarily. Cookies are created or
updated when button with id 'next' is clicked. Will not work unless
jQuery and jQueryCookie is imported in the document.

The script now works with paragraphs instead of checkboxes. This will
make it prettier. The element type can be changed though. Currently
it will bold the categories that have been saved in the cookie or that
are clicked. I was thinking maybe we'd rather want to do this with
a background color change or something, so I've made the code relatively
easy to alter. It's just some css changing after all.
Working copy up at kinectuofthack.com/TMO/htmlParagraph.html

"id" is either checked or unchecked.
"title" contains the category name.
"category" is the classnames of the paragraphs.


Classes that need to be in CSS:

#accordion{
	width: 30em;
}
#accordion h3{
	background-color: #B3C0C9;
	font-size: 1em;
	font-family: Arial;
}
#accordion div{
	line-height: 2em;
	font-family: Helvetica;
}
.unchecked{
	font-weight: default;
}
.checked{
	font-weight: bold;
}

*/

$(document).ready(function(){
	readCookie = function(){
		return $.cookie("prefs").split(',');
	}

	delCookie = function(){
		$.removeCookie("prefs");
	}
	
	/*Declare list variable. This is used for
	cookie creation. Initialized as empty
	if prefs does not already exist.*/
	if($.cookie('prefs') !== undefined){
		var list = readCookie();
	}
	else{
		var list = []
	}

	highlightPrefs = function(){
		var prefs = list;
		var doc = $('.category');
		for(var i = 0; i < prefs.length; i++){
			for(var j = 0; j < doc.length; j++){
				if(prefs[i] === doc[j].title){
					doc[j].id = "checked";
				}
				else{
					console.log(doc[j] + "removed");
					doc[j].id = "unchecked";
				}
			}
		}
	}



	//Click listener for p
	$(".category").click(function()
	{
		if(this.id === "unchecked")
		{
			this.id = "checked";	//For CSS
			list.push(this.title); 	//The actual category name is stored as title
			console.log(this.title + " appended to list"); //For debug
		}
		else
		{
			this.id = "unchecked";	//For CSS

			//Remove from list
			var removalIndex = list.indexOf(this.title);	//Only counts first occurance
			if(removalIndex !== -1){
				list.splice(removalIndex, 1);	
			}

			console.log("no element appended"); //For debug
		}
	});

	//Click listener for 'next' button, creates cookie from list
	$("#next").click(function()
	{
		$.cookie("prefs", list);
		console.log("cookie is now " + $.cookie("prefs"));
	});
	
	//For del button, removes cookie.
	$("#del").click(function(){
		list = '';
		delCookie();
		highlightPrefs();
	})
	highlightPrefs();

});
