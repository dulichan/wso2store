var render = function (theme, data, meta, require) {
    
    
    theme('1-column', {
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