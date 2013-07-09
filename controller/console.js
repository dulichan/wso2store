home = function(appController){
	return {
		layout:'1-column',
		title:'Your Apps',
		jsfile: 'console/home.js',
		hasSearch: true,
		partials:{
			header:appController.navigation()
		},
		data:{
			apps:[
				{name:"Bookhub",status:"Published", price:"Free", totalInstalls:2034, rating:5}
			]
		}
	};
}



user_home = function(appController){
	var user = session.get('user');
	if(user==undefined){
		response.sendRedirect('/store');
	}
	return {
		layout:'1-column',
		title:'Your Apps',
		jsfile: 'console/user_home.js',
		hasSearch: true,
		partials:{
			header:appController.navigation()
		},
		data:{name:user.first_name}
	};
}


install = function(appController){
	var user = session.get('user');
	var data;
	if(user!=undefined){
		data={name:user.first_name};
	}
	return {
		layout:'1-column-nosearch',
		title:'Your Apps',
		jsfile: 'console/install.js',
		partials:{
			headernosearch:appController.navigation()
		},
		data:data
	};
}


login = function(appController){
	return {
		layout:'1-column-nosearch',
		title:'Your Apps',
		partials:{
			headernosearch:appController.navigation()
		},
		data:{
			"current_install_app":request.getParameter('appid'),
			"current_install_platform":request.getParameter('platform')
		}
	};
}

logout = function(appController){
	response.sendRedirect("/store/api/users/unauthenticate");
}




manager = function(){
	//response.sendRedirect('/publisher/console/list');
	return {};
}
upload = function(){
	return {};
}