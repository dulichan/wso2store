var configs = require('/dataconf.json');
var server = require('/modules/server.js');
server.init(configs);

var user = require('/modules/user.js');
user.init(configs);

var store = require('/modules/store.js');
store.init({});