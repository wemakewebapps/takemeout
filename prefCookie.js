/*
Was looking for a bug, found a much clearer way to write the code.
It now relies on eventlisteners primarily. Cookies are created or
updated when button with id 'next' is clicked. Will not work unless
jQuery is imported in the document.

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
*/

Classes that need to be in CSS:

$(document).ready(function(){
	readCookie = function(){
		return $.cookie("prefs").split(',');
	}

	delCookie = function(){
		$.removeCookie("prefs");
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

	if($.cookie('prefs') !== undefined){
		var list = readCookie();
	}
	else{
		var list = []
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

	$("#del").click(function(){
		list = '';
		delCookie();
		highlightPrefs();
	})
	highlightPrefs();

});
