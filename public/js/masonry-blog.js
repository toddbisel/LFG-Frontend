$(document).ready(function() {
      /* ======= Blog page masonry ======= */
    /* Ref: http://desandro.github.io/masonry/index.html */
    
    var $container = $('.masonry-grid');
    $container.imagesLoaded(function(){
        $container.masonry({
            itemSelector : '.masonry-item'
        });
    });
});



