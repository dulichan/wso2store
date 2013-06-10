var renderAssets, mouseStop;

(function () {
    renderAssets = function (data) {
        var el = $('.store-left');
        caramel.css($('head'), data.body['sort-assets'].resources.css, 'sort-assets');
        caramel.code($('head'), data.body['assets'].resources.code);
        async.parallel({
            assets: function (callback) {
                caramel.render('assets', data.body.assets.context, callback);
            },
            paging: function (callback) {
                caramel.render('pagination', data.body.pagination.context, callback);
            },
            sort: function (callback) {
                caramel.render('sort-assets', {}, callback);
            }
        }, function (err, result) {
            theme.loaded(el, result.sort);
            el.append(result.assets);
            el.append(result.paging);
            caramel.js($('body'), data.body['assets'].resources.js, 'assets', function () {
                mouseStop();
            });
            caramel.js($('body'), data.body['sort-assets'].resources.js, 'sort-assets', function () {
                updateSortUI();
            });
            $(document).scrollTop(0);
        });
    };

    mouseStop = function () {
        var id;
        $('.asset').mousestop(function () {
            var that = $(this);
            id = setTimeout(function () {
                that.find('.asset-details').animate({
                    top: 1
                }, 200);
            }, 300);
        }).mouseleave(function () {
                clearTimeout(id);
                $(this).find('.asset-details').animate({top: 200}, 200);
            });
    };
}());
