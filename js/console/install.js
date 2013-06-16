selectedApp = "";
selectedAction ="";


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
	
	var serverURL = "/store/"
	
	var urls =
		{
			"appDetails": "api/apps/{0}",
			"devicesList": "apis/deviceslist.json",
			"installApp": "api/devices/{0}/apps/{1}/{2}"			
		};
	
	arguments[0] = urls[item];		
	return serverURL + String.format.apply(this, arguments);
	
}




$(document).ready(function() {
	loadApp();
	loadDevicesList();
});


function loadApp(){
	
	appId = getURLParameter("app");
	isRemove = getURLParameter("remove");
	
	
	jQuery.ajax({
	      url: getServiceURLs("appDetails", appId), 
	      type: "GET",
	      dataType: "json",
	      success: function(app) {
	      	 var template = Handlebars.compile($("#hbs-install-app").html());
	      	 if(isRemove == 'true'){
	      	 	$("#install-app").html(template({app:app, isRemove:isRemove}));
	      	 }else{
	      	 	$("#install-app").html(template({app:app}));
	      	 }
	      	 
	      	 $(function () { $('.rateit').rateit({ max: 5, step: 0.5, readonly:"true", value:4.5}); });
	      	 
	      	 $('#application-tab a').click(function(e) {
				e.preventDefault();
				$(this).tab('show');
			 });
			 
			 
			  $(".btn-install").click(function() {
  			  	appId = $(this).data("appid");
				selectedApp = appId;
				selectedAction ="install";
			 }); 
			 
			 
			 $(".btn-remove").click(function() {
  			  	appId = $(this).data("appid");
				selectedApp = appId;
				selectedAction ="remove";
			 }); 

  			
	      }				      
	});
	
}




function loadDevicesList(){
	
	jQuery.ajax({
	      url: getServiceURLs("devicesList"), 
	      type: "GET",
	      dataType: "json",
	      success: function(devices) {	      	
  			 var template = Handlebars.compile($("#hbs-devices-list-modal").html());
  			 $("#devices-list-ui-modal").html(template({devices:devices})); 
  			 
  			 $(".device-img").click(function() {
  			  	deviceId = $(this).data("deviceid");
			  	jQuery.ajax({
				      url: getServiceURLs("installApp", deviceId, selectedApp, selectedAction), 
				      type: "POST",
				      dataType: "json",				     
				      success: function(apps) {
				      	 
				      }				      
				});			
			 }); 			
	      }				      
	});
	
	
	
				
	
	
}