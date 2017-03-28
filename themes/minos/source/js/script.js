(function($) {

    // Caption
    $('.article-entry').each(function(i) {
        $(this).find('img').each(function() {
            if ($(this).parent().hasClass('fancybox')) return;

            var alt = this.alt;

            if (alt) $(this).after('<span class="caption">' + alt + '</span>');

            $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
        });

        $(this).find('.fancybox').each(function() {
            $(this).attr('rel', 'article' + i);
        });
    });

    if ($.fancybox) {
        $('.fancybox').fancybox();
    }

    // Mobile nav
    $('#main-nav-toggle').click(function() {
        $('#header').toggleClass('mobile-on');
    });

    // 右下角目录项
    var toc = $('.artical-toc');
    toc.bind('click', toggleToc);

    function toggleToc(e) {
        var action = false;
        if (e.currentTarget == document) {
            action = true;
        } else {
            action = toc.hasClass('fold');
            e.stopImmediatePropagation();
        }
        if (action) {
            if (toc.hasClass('fold')) {
                toc.removeClass('fold');
                $(document).bind('click', toggleToc);
            } else {
                toc.addClass('fold');
                $(document).unbind('click');
            }
        }
    }
})(jQuery);