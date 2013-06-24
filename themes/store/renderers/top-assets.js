var render = function (theme, data, meta, require) {
    
    
    theme('2-column-right', {
        title: data.title,
        navigation: [
            {
                partial: 'navigation',
                context: data.navigation
            }
        ],
       
        body: [
            {
                partial: 'top-assets',
                context: data.topAssets
            }
        ],
        right: [
            {
                partial: 'recent-assets',
                context: data.recentAssets
            }
        ]
    });
};