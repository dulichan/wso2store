$(".device-image").each(function(index) {	
	var srcImage = $(this).attr("src");	
	if (!urlExists(srcImage)) {
		$(this).attr("src", "/assets/wso2mobile/img/models/none.png");
	}
});

function urlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}