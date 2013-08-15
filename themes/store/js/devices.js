$(".device-image").each(function(index) {	
	var srcImage = $(this).attr("src");	
	if (!urlExists(srcImage)) {
		$(this).attr("src", "/assets/wso2mobile/img/models/none.png");
	}
});

$(".deviceblock").each(function(index) {	
	
	var device = getURLParameter("devices");	
	if(device != "null"){
		var deviceId = $(this).data("deviceId");
		if(deviceId != device){
			$(this).fadeTo("slow", 0.1);
		}
	}
	
	var srcImage = $(this).attr("src");	
	if (!urlExists(srcImage)) {
		$(this).attr("src", "/assets/wso2mobile/img/models/none.png");
	}
});



$(".deviceblock").click(function(index) {	
	var uri = window.location.pathname + window.location.search;
	var deviceId = $(this).data("deviceId");	
	location.href = updateQueryStringParameter(uri, 'devices', deviceId);
	
});

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
  separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}


function urlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}
