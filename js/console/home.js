



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
			"categoryList": "apis/categorylist.json",
			"topAppList": "api/popular",
			"newestAppList": "api/newest",
			"menuList": "apis/menuList.json"
		};
	
	arguments[0] = urls[item];		
	return serverURL + String.format.apply(this, arguments);
	
}


$(document).ready(function() {
	loadMenu();
	//loadCategoryList();
	loadTopAppList();
	loadNewestAppList();
});




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


function loadTopAppList(){
	
	jQuery.ajax({
	      url: getServiceURLs("topAppList"), 
	      type: "GET",
	      dataType: "json",
	      success: function(apps) {
	      	 var template = Handlebars.compile($("#hbs-app-list").html());
	      	 $("#top-app-list").html(template({apps:apps}));
  			 $(function () { $('.rateit').rateit({ max: 5, step: 0.5, readonly:"true", value:4.5}); });
  			 $(".ellipsis").ellipsis();
  			 
  			 			
  			
	      }				      
	});
	
	
}


function loadNewestAppList(){
	
	jQuery.ajax({
	      url: getServiceURLs("newestAppList"), 
	      type: "GET",
	      dataType: "json",
	      success: function(apps) {
	      	 var template = Handlebars.compile($("#hbs-app-list").html());
	      	 $("#newest-app-list").html(template({apps:apps}));
  			 $(function () { $('.rateit').rateit({ max: 5, step: 0.5, readonly:"true", value:4.5}); });
  			 $(".ellipsis").ellipsis();
  			 
  			 
	      }				      
	});
	
	
}

