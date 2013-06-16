new Log().info('Request received by the app default controller');

navigation = function(){
	return {appTitle: "WSO2 Enterprise Mobile Store"};
}

index = function(){
	response.sendRedirect('/store/console/home');
}