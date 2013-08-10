var resources = function (block, page, area, meta) {
    return {
        template: 'assets.hbs',
        js: ['asset-core.js', 'asset-helpers.js', 'assets.js'],
        css: ['assets.css'],
        code: ['store.asset.hbs']
    };
};

var currentPage = function (assetsx,ssox,userx, devicesx) {
    var outx  = {
        'assets': assetsx,
        'sso': ssox,
        'user': userx,
        'devices': devicesx
    };
    
    return outx;
};

