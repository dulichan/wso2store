selectedApp = "";
selectedAction ="";
selectedPlatform="";
selected_Platform = "";

String.format = function() {
  var s = arguments[0]; 
  for (var i = 0; i < arguments.length - 1; i++) {       
    var reg = new RegExp("\\{" + i + "\\}", "gm");             
    s = s.replace(reg, arguments[i + 1]);
  }

  return s;
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

$(document).ready(function() {
	
	var appId = getURLParameter("appid");
	var platform = getURLParameter("device_plat");
	if(platform === 'null'){
		platform = "";
	}	
	platform = platform.toLowerCase();
	selected_Platform = platform;
	
	if(appId != "null" ){
		$('#myDevices').modal('show');
		selectedApp = appId;
		selectedAction = "install";
	}
	
	loadMenu();
	//loadCategoryList();
	loadRecommendedAppList();
	loadMyAppList();
	loadDevicesList();
	
		
	
});

function getServiceURLs(item){
	
	var serverURL = "/store/"
	
	var urls =
		{
			"categoryList": "apis/categorylist.json",
			"recommandedAppList": "api/popular{0}",
			"myAppList": "api/users/current/apps{0}",
			"menuList": "apis/menuList.json",
			"devicesList": "api/users/current/devices{0}",
			"devicesListByPlatform": "api/users/current/devices?platform={0}",
			"installApp": "api/devices/{0}/apps/{1}/{2}"
		};
	
	arguments[0] = urls[item];		
	return serverURL + String.format.apply(this, arguments);
	
}


$("#devices-button").click(function() {
	$("#devices-bar").toggle(1000);
});


$("#device-list-close").click(function() {
	$("#devices-bar").hide(1000);	
});












function loadCategoryList(){
	
	jQuery.ajax({
	      url: getServiceURLs("categoryList"), 
	      type: "GET",
	      dataType: "json",
	      success: function(categories) {
	      	 var template = Handlebars.compile($("#hbs-category-list").html());
	      	 $("#category-list").html(template({categories:categories}));
  			
	      }				      
	});
	
}


function loadMenu(){	
	
	var platform = getURLParameter("platform");
	if(platform === 'null'){
		platform = "";
	}	
	platform = platform.toLowerCase();
	
	jQuery.ajax({
	      url: getServiceURLs("menuList"), 
	      type: "GET",
	      dataType: "json",
	      success: function(menus) {
	      	 var template = Handlebars.compile($("#hbs-menu-list").html());
	      	 $("#menu-list").html(template({menus:menus, active: platform}));
  			
	      }				      
	});
	
}


function loadRecommendedAppList(){
	
	var platform = getURLParameter("platform");
	if(platform === 'null'){
		platform = "";
	}else{
		platform = "?platform=" + platform;
	}
	platform = platform.toLowerCase();
	
	 device = getURLParameter("device");
		if(device === 'null'){
			device = 0;
		}
	
	
	
	
	jQuery.ajax({
	      url: getServiceURLs("recommandedAppList", platform), 
	      type: "GET",
	      dataType: "json",
	      success: function(apps) {
	      	 var template = Handlebars.compile($("#hbs-app-list").html());
	      	 $("#recommanded-app-list").html(template({apps:apps}));
	      	 $(function () { $('.rateit').rateit({ max: 5, step: 0.5, readonly:"true", value:4.5}); });
  			 $(".ellipsis").ellipsis();
  			 
  			  appId = $(this).data("appid");
  			
  			 
  			   $(".btn-install").click(function() {
					appId = $(this).data("appid");
					selectedPlatform = $(this).data("platform");
					selectedApp = appId;
					selectedAction = "install";
					
					
					if(device <= 0){	  					
	  					 $('#myDevices').modal('show');	  					 
	  				 }else{
	  					Messenger().post("App is sent to the device");
	  					jQuery.ajax({
						      url: getServiceURLs("installApp", device, selectedApp, selectedAction), 
						      type: "POST",
						      dataType: "json",				     
						      success: function(apps) {
						      	 
						      }				      
						});
	  				 }	
					
					
					jQuery.ajax({
					      url: getServiceURLs("devicesListByPlatform", selectedPlatform), 
					      type: "GET",
					      dataType: "json",
					      success: function(devices) {					      	
				  			 var template = Handlebars.compile($("#hbs-devices-list-modal").html());
				  			 $("#devices-list-ui-modal").html(template({devices:devices})); 
				  			 
				  			 
				  			 $(".device-img").click(function() {
				  			  	deviceId = $(this).data("deviceid");
				  			  	Messenger().post("App is sent to the device");
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
					
					
					
					
			 });  
  			
	      }				      
	});
	
	
}


function loadMyAppList(){
	
	var platform = getURLParameter("platform");
	if(platform === 'null'){
		platform = "";
	}else{
		platform = "?platform=" + platform;
	}
	platform = platform.toLowerCase();
	
	
	var device = getURLParameter("device");
	if(device === 'null'){
		device = "";
	}else{
		device = "?deviceid=" + device;
	}

	
	jQuery.ajax({
	      url: getServiceURLs("myAppList", device), 
	      type: "GET",
	      dataType: "json",
	      success: function(apps) {
	      	 var template = Handlebars.compile($("#hbs-my-app-list").html());
	      	 $("#newest-app-list").html(template({apps:apps}));
	      	 $(function () { $('.rateit').rateit({ max: 5, step: 0.5, readonly:"true", value:4.5}); });
  			 $(".ellipsis").ellipsis();
  			 
  			 device = getURLParameter("device");
  			if(device === 'null'){
  				device = 0;
  			}
  			
  			 
  			  $(".btn-remove").click(function() {
  				appId = $(this).data("appid");
				selectedPlatform = $(this).data("platform");
				selectedApp = appId;
				selectedAction = "uninstall";
				
				if(device <= 0){	  					
 					 $('#myDevices').modal('show');	  					 
 				 }else{
 					Messenger().post("App is sent to the device");
 					jQuery.ajax({
					      url: getServiceURLs("installApp", device, selectedApp, selectedAction), 
					      type: "POST",
					      dataType: "json",				     
					      success: function(apps) {
					      	 
					      }				      
					});
 				 }	
				
				
				jQuery.ajax({
				      url: getServiceURLs("devicesListByPlatform", selectedPlatform), 
				      type: "GET",
				      dataType: "json",
				      success: function(devices) {					      	
			  			 var template = Handlebars.compile($("#hbs-devices-list-modal").html());
			  			 $("#devices-list-ui-modal").html(template({devices:devices})); 
			  			 
			  			 
			  			 $(".device-img").click(function() {
			  			  	deviceId = $(this).data("deviceid");
			  			  	Messenger().post("App is sent to the device");
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
				
				
				
			 }); 
  			
	      }				      
	});
	
	
}


function loadDevicesList(){
	
	var platform = getURLParameter("platform");
	if(platform === 'null'){
		platform = "";
	}else{
		platform = "?platform=" + platform;
	}
	platform = platform.toLowerCase();
	
	 device = getURLParameter("device");
	if(device === 'null'){
		device = 0;
	}
	
	jQuery.ajax({
	      url: getServiceURLs("devicesList", platform), 
	      type: "GET",
	      dataType: "json",
	      success: function(devices) {
	      	 var template = Handlebars.compile($("#hbs-devices-list").html());
	      	 $("#devices-list-ui").html(template({devices:devices, device: device}));	      	       	 
  			 $('#devices-list-ui').jcarousel(); 			 
  			 
  			 
  						
	      }				      
	});	
	
	
	if(selected_Platform === 'null'){
		selected_Platform = "";
	}else{
		selected_Platform = "?platform=" + selected_Platform;
	}
	selected_Platform = selected_Platform.toLowerCase();
	
	jQuery.ajax({
	      url: getServiceURLs("devicesList", selected_Platform), 
	      type: "GET",
	      dataType: "json",
	      success: function(devices) {
	      				 
			 var template = Handlebars.compile($("#hbs-devices-list-modal").html());
			 $("#devices-list-ui-modal").html(template({devices:devices, device: device})); 
			 
			 $(".device-img").click(function() {
				  	deviceId = $(this).data("deviceid");
				  	Messenger().post("App is sent to the device");
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



Handlebars.registerHelper('viewImage', function(image, options) {
	var url = "/assets/wso2mobile/img/models/" + image + ".png";
	if(imageExist(url)){
		return url;
	}else{
		return "/assets/wso2mobile/img/models/none.png";
	}
	
});

function imageExist(url) 
{
   var img = new Image();
   img.src = url;
   return img.height != 0;
}


Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    operator = options.hash.operator || "==";

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});