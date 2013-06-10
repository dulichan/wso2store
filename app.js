var caramel = require('caramel').caramel;

caramel.configs({
    context: '/store',
    cache: true,
    negotiation: true,
    themer: function () {
        return 'store';
    }/*,
    languagesDir: '/i18n',
    language: function() {
        return 'si';
    }*/
});

var configs = require('/store.json');
var server = require('/modules/server.js');

server.init(configs);

var user = require('/modules/user.js');
user.init(configs);

var store = require('/modules/store.js');
store.init({

});