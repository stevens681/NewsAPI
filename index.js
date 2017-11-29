/*global $*/
var selCountry;
var selCategory = ["business", "entertainment", "gaming", "general", "health-and-medical", "music", "politics", "science-and-nature", "sport", "technology"];

function selectCategory() {
	for (var i = 0; i < selCategory.length; i++) {
		var category = document.createElement("OPTION");
		category.setAttribute("value", selCategory[i]);
		category.innerHTML = selCategory[i];
		document.getElementById('category').appendChild(category);
	}
}
$(document).ready(function() {
	selectCategory();
	var catSelecteed = document.getElementById("category").vale;
	$.ajax({
		method: "GET",
		url: "https://newsapi.org/v2/sources?",
		data: {
			category: catSelecteed,
			country: "us",
			language: "en",
			apiKey: "86e3aed7c0b945a59bbb5359948503fe"
		},
		success: function(data) {
			if (data.status === "ok") {
				console.log(data);
				for (var i = 0; i < data.sources.length; i++) {
					var source = document.createElement("OPTION");
					source.setAttribute("value", data.sources[i].id);
					source.innerHTML = data.sources[i].name;
					document.getElementById('selection').appendChild(source);
				}
			} else {
				alert(data.message);
			}
		}
	});
	$('#source').submit(function(event) {
		event.preventDefault();
		var newsId = document.getElementById("selection").value;
		$.ajax({
			method: "GET",
			url: "https://newsapi.org/v2/top-headlines?sources=" + newsId,
			data: {
				category: catSelecteed,
				country: "us",
				language: "en",
				apiKey: "86e3aed7c0b945a59bbb5359948503fe"
			},
			success: function(headLine) {
				if (headLine.status === "ok") {
					console.log(headLine);
					for (var i = 0; i < headLine.articles.length; i++) {
						var list = document.createElement("LI");
						var url = headLine.articles[i].url;
						list.innerHTML = headLine.articles[i].title + '<br>' + "sources: " + '<a target="_blank" href= "' + url + '">Click here</a>';
						document.getElementById("headlines").appendChild(list);
					}
				}
			}
		});
	});
	// .done(function(msg){
	//     alert("Data Saved: " + msg);
	// });
})