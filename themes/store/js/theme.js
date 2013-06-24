var theme = (function () {
    var loading, loaded,
        loaderClass = 'loading';

    loading = function (el) {
        var loader;
        //el.children().hide();
        loader = $('.' + loaderClass, el);
        if (loader.length === 0) {
            loader = el.prepend('<div class="overlay loading"><img src="' + caramel.context + '/themes/store/img/preloader-40x40.gif"></div>');
        }
        loader.show();
    };

    loaded = function (el, data) {
        var children;
        $('.' + loaderClass, el).hide();
        children = el.children(':not(.' + loaderClass + ')');
        if (!data) {
            children.show();
            return;
        }
        children.remove();
        el.append(data);
    };

    return {
        loading: loading,
        loaded: loaded
    };
})();

$(function(){
	$(window).bind('load', adjustStoreRight);
	$(window).bind('resize', adjustStoreRight);
})

var adjustStoreRight = function(){
	setTimeout(function(){ 
		($('.store-right').height() < $('.store-left').height()) &&  $('.store-right').height($('.store-left').height() + 15);
		}, 200);
}

