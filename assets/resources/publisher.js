String.format = function() {
  var s = arguments[0]; 
  for (var i = 0; i < arguments.length - 1; i++) {       
    var reg = new RegExp("\\{" + i + "\\}", "gm");             
    s = s.replace(reg, arguments[i + 1]);
  }

  return s;
}



$(document).ready(function() {
	
	getPublisherAppList();
		
		
	
});


function getServiceURLs(item){
	
	var serverURL = "apis/"
	
	var urls =
		{
			"publisherAppList": "publisher_applist.json"			
		};
	
	arguments[0] = urls[item];		
	return serverURL + String.format.apply(this, arguments);
	
}


function getPublisherAppList(){
	// jQuery.ajax({
	// 	      url: getServiceURLs("publisherAppList"), 
	// 	      type: "GET",
	// 	      dataType: "json",
	// 	      success: function(apps) {
	// 	      	 var template = Handlebars.compile($("#hbs-publisher-app-list").html());
	// 	      	 $("#publisher-app-list").html(template({apps:apps}));
	//   			
	// 	      }				      
	// 	});
}
