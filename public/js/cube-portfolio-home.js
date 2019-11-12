(function($, window, document, undefined) {
    'use strict';

    // init cubeportfolio
    $('#js-grid-agency').cubeportfolio({
        filters: '#js-filters-agency',
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: 'slideLeft',
        gapHorizontal: 35,
        gapVertical: 15,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1500,
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 2
        }, {
            width: 480,
            cols: 1
        }],
        caption: 'zoom',
        displayType: 'fadeIn',
        displayTypeSpeed: 100
    });
})(jQuery, window, document);