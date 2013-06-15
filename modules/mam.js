/*
MAM module for communicating with MDM backend
*/
var mam = (function () {
	var configs ={mdmServer:"http://localhost:9763/mdm"};
    var module = function (config) {
		this.configs = config;
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
			log.info(JSON.stringify({"data":data}));
			var result = post(url, JSON.stringify({"data":data}), {
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
			var url =  configs['mdmServer']+'/devices/'+device+'/AppInstall';
			log.info('URL--'+url);
			var result = jsonPost(url, {url:installData});
		},
		
		uninstall: function(uninstallData){
			var url = configs['mdmServer']+'/devices/'+configs['device']+'/AppUNInstall';
			var result = jsonPost(url, {"package":installData});
		},
		
		getDevices: function(email){
			var url = configs['mdmServer']+'/users/devices';
			var data = email;
			var result = jsonPost(url, {email:email});
			return result;
		},
		
		getUserApps: function(email){
			var url = configs['mdmServer']+'/users/apps';
			var data = email;
			var result = jsonPost(url, {email:email});
			return result;
		},
		authenticate: function(username, password){
			
		}
    };
    // return module
    return module;
})();