new Log().info('Request received by the app default controller');

navigation = function(){
	return {appTitle: "WSO2Mobile Developer Console"};
}

index = function(){
	response.sendRedirect('/store/console/home');
}