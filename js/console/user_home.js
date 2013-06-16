selectedApp = "";
selectedAction ="";

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
	
	var appId = getURLParameter("app");
	
	if(appId != "null" ){
		$('#myDevices').modal('show');
		selectedApp = appId;
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
			"recommandedAppList": "api/popular",
			"myAppList": "api/newest",
			"menuList": "apis/menuList.json",
			"devicesList": "apis/deviceslist.json",
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
	
	jQuery.ajax({
	      url: getServiceURLs("menuList"), 
	      type: "GET",
	      dataType: "json",
	      success: function(menus) {
	      	 var template = Handlebars.compile($("#hbs-menu-list").html());
	      	 $("#menu-list").html(template({menus:menus}));
  			
	      }				      
	});
	
}


function loadRecommendedAppList(){
	
	jQuery.ajax({
	      url: getServiceURLs("recommandedAppList"), 
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
					selectedApp = appId;
					selectedAction = "install";
			 });  
  			
	      }				      
	});
	
	
}


function loadMyAppList(){
	
	jQuery.ajax({
	      url: getServiceURLs("myAppList"), 
	      type: "GET",
	      dataType: "json",
	      success: function(apps) {
	      	 var template = Handlebars.compile($("#hbs-my-app-list").html());
	      	 $("#newest-app-list").html(template({apps:apps}));
	      	 $(function () { $('.rateit').rateit({ max: 5, step: 0.5, readonly:"true", value:4.5}); });
  			 $(".ellipsis").ellipsis();
  			 
  			 
  			
  			 
  			  $(".btn-remove").click(function() {
  			  	appId = $(this).data("appid");
				selectedApp = appId;
				selectedAction = "remove";
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
	      	 var template = Handlebars.compile($("#hbs-devices-list").html());
	      	 $("#devices-list-ui").html(template({devices:devices}));	      	       	 
  			 $('#devices-list-ui').jcarousel();
  			 
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