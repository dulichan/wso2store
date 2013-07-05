/*
MAM module for communicating with MDM backend
*/
var mam = (function () {
	var log = new Log();
	var configs = require('/dataconf.json');
	var conf;
    var module = function (config) {
		conf= config;
    };
    function mergeRecursive(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor == Object) {
                    obj1[p] = MergeRecursive(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }
	
	//Tunnel communicating to the MDM server 
	function jsonPost(postUrl, postData){
        	var url = postUrl;
			var data = postData;
			//data = {url:"http://10.200.3.163:9763/publisher/uploads/app.apk"};
			data = JSON.stringify({"data":data});

			var result = post(url, data, {
				"Content-Type": "application/json",
			    "User-Agent" : "Jaggery-XHR",
			    "Country" : "LK"
			});
			return result;
    }
    // prototype
    module.prototype = {
        constructor: module,
        install: function(installData, device){
			var url =  configs.mdm.api+'/devices/'+device+'/AppInstall';
			var result = jsonPost(url, {url:installData});
		},
		installiOS:  function(type, url, device){
			var url =  configs.mdm.api+'/devices/'+device+'/AppInstall';
			var result = jsonPost(url, {type:type,identity:url});
		},
		installWebClip: function(installData,title, device){
			var url =  configs.mdm.api+'/devices/'+device+'/operations/WEBCLIP';
			var result = jsonPost(url, {url:installData, title:title});
		},
		uninstall: function(uninstallData,device){
			var url = configs.mdm.api+'/devices/'+device+'/AppUNInstall';
			var result = jsonPost(url, {"package":installData});
		},
		getDevices: function(email){
			var url = configs.mdm.api+'/store/users/devices';
			var data = email;
			var result = jsonPost(url, {email:email});
			log.info(result);
			return result;
		},
		
		getUserApps: function(email){
			var url = configs.mdm.api+'/store/users/apps';
			var data = email;
			var result = jsonPost(url, {email:email});
			return result;
		},
		authenticate: function(username, password){
			var url =  configs.mdm.api+'/users/authenticate';
			var data = JSON.stringify({username:username, password:password});
			log.info("Authenticate url "+url);
			var result = post(url, data, {
				"Content-Type": "application/json",
			    "User-Agent" : "Jaggery-XHR",
			    "Country" : "LK"
			});
			return result;
		}
    };
    // return module
    return module;
})();