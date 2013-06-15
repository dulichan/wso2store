/*
MAM module for communicating with MDM backend
*/
var mam = (function () {
	var configs ={mdmServer:"localhost", user:"test"};
    var module = function (configs) {
		this.configs = mergeRecursive(this.configs,configs);
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
			var result = post(url, {data:data}, {
				"Content-Type": "application/json",
			    "User-Agent" : "Jaggery-XHR",
			    "Country" : "LK"
			}, 'json');
			return result;
    }
    // prototype
    module.prototype = {
        constructor: module,
        install: function(installData){
			var url = configs['mdmServer']+'devices/"+configs['device']+"/AppInstall';
			var result = jsonPost(url, {url:installData});
		},
		
		uninstall: function(uninstallData){
			var url = configs['mdmServer']+'devices/"+configs['device']+"/AppUNInstall';
			var result = jsonPost(url, {"package":installData});
		},
		
		getDevices: function(email){
			var url = configs['mdmServer']+'/mdm/store/users/devices';
			var data = email;
			var result = jsonPost(url, {email:email});
			return result;
		},
		
		getUserApps: function(email){
			var url = configs['mdmServer']+'/mdm/store/users/apps';
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