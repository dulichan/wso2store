/*
MAM module for fully communicating with MDM backend
*/
var mam = (function () {
    var module = function () {
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
	
    // prototype
    module.prototype = {
        constructor: module,
        
        jsonPost: function(postUrl, postData){
        	var url = postUrl;
			var data = postData;
			var result = post(url, data, {
				"Content-Type": "application/json",
			    "User-Agent" : "Jaggery-XHR",
			    "Country" : "LK"
			}, 'json');
			return result;
        },
        
        install: function(){
			var url = 'devices/{deviceid}/AppInstall';
			var installData = "";
			var result = jsonPost(url, installData);
		},
		
		uninstall: function(){
			var url = 'devices/{deviceid}/AppUNInstall';
			var uninstallData = "";
			var result = jsonPost(url, uninstallData);
		},
		
		getDevices: function(email){
			var url = 'devices/{deviceid}/AppUNInstall';
			var data = email;
			var result = jsonPost(url, data);
		}
    };
    // return module
    return module;
})();