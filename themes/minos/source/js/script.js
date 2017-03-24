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
    var toc = document.getElementsByClassName('artical-toc')[0];
    toc.addEventListener('click', toggleToc);

    function toggleToc(e) {
        var action = false;
        if (e.currentTarget == document) {
            action = true;
        } else {
            if (toc.classList.contains('fold')) {
                action = true;
            }
        }
        if (action) {
            if (toc.classList.contains('fold')) {
                toc.classList.remove('fold');
                document.addEventListener('click', toggleToc);
            } else {
                toc.classList.add('fold');
                document.removeEventListener('click', toggleToc);
            }
        }
        if (e.currentTarget == toc)
            e.stopImmediatePropagation();
    }
})(jQuery);