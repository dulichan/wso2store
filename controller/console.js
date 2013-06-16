home = function(appController){
	return {
		layout:'1-column',
		title:'Your Apps',
		jsfile: 'console/home.js',
		partials:{
			header:appController.navigation()
		},
		data:{
			name:"Chan",
			quote:"I was a king I had a gold throne",
			apps:[
				{name:"Bookhub",status:"Published", price:"Free", totalInstalls:2034, rating:5}
			]
		}
	};
}



user_home = function(appController){
	return {
		layout:'1-column',
		title:'Your Apps',
		jsfile: 'console/user_home.js',
		partials:{
			header:appController.navigation()
		},
		data:{
			name:session.get('user').name
		}
	};
}


install = function(appController){
	return {
		layout:'1-column-nosearch',
		title:'Your Apps',
		jsfile: 'console/install.js',
		partials:{
			headernosearch:appController.navigation()
		},
		data:{
			
		}
	};
}


login = function(appController){	
	return {
		layout:'1-column-nosearch',
		title:'Your Apps',
		jsfile: 'console/login.js',
		partials:{
			headernosearch:appController.navigation()
		},
		data:{
			
		}
	};
}

logout = function(appController){
	response.sendRedirect("/store/api/users/unauthenticate");
}




manager = function(){
	//response.sendRedirect('/publisher/console/list');
	return {name:"Chan", quote:"I was a king I had a gold throne"};
}
upload = function(){
	return {name:"Chan", quote:"I was a king I had a gold throne"};
}