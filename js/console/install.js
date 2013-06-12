function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

String.format = function() {
  var s = arguments[0]; 
  for (var i = 0; i < arguments.length - 1; i++) {       
    var reg = new RegExp("\\{" + i + "\\}", "gm");             
    s = s.replace(reg, arguments[i + 1]);
  }

  return s;
}



function getServiceURLs(item){
	
	var serverURL = "/store/apis/"
	
	var urls =
		{
			"appDetails": "appinfo.json?app={0}"			
		};
	
	arguments[0] = urls[item];		
	return serverURL + String.format.apply(this, arguments);
	
}




$(document).ready(function() {
	loadApp();
});


function loadApp(){
	
	appId = getURLParameter("app");
	
	jQuery.ajax({
	      url: getServiceURLs("appDetails", appId), 
	      type: "GET",
	      dataType: "json",
	      success: function(app) {
	      	 var template = Handlebars.compile($("#hbs-install-app").html());
	      	 $("#install-app").html(template({app:app}));
	      	 
	      	 $('#application-tab a').click(function(e) {
				e.preventDefault();
				$(this).tab('show');
			 });

  			
	      }				      
	});
	
}