(function ($) {
    var ua = window.navigator.userAgent;
    var isIE = /MSIE|Trident/.test(ua);

    if ( !isIE ) {
        //IE specific code goes here
        "use strict";
    }

    /** Adobe typekit font */
    try{Typekit.load({ async: true });}catch(e){};

    /*** Sticky header */
    $(window).scroll(function(){
        if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            $(".header").addClass("stop");
            $(".sidr").addClass("stop");
        } else {
            $(".header").removeClass("stop");
            $(".sidr").removeClass("stop");
        }
    });

    /*** Sticky header */
    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    const searchBar = $('.search-wrap');
    let lastScroll = 100;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0)
        {
            body.classList.remove(scrollUp);
            return;
        }
        if (currentScroll > lastScroll && !body.classList.contains(scrollDown))
        {
            // down
            body.classList.remove(scrollUp);
            body.classList.add(scrollDown);
            searchBar.removeClass('search-show');
        }
        else if ( currentScroll < lastScroll && body.classList.contains(scrollDown) )
        {
            // up
            body.classList.remove(scrollDown);
            body.classList.add(scrollUp);

        }
        lastScroll = currentScroll;
    });


    /*** Sidr Menu */
    $('.mobile-navbar-toggler .navbar-toggle').sidr({
        name: 'sidr-main',
        side: 'right',
        source: '#sidr',
        displace: false,
        renaming: false,
    });

    $('.navbar-toggle.in').on('click', function(e){
        e.preventDefault();
        $.sidr('close', 'sidr-main');
    });

    $(window).scroll(function(){
        if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            $.sidr('close', 'sidr-main');
            $("header").addClass('transparent');
            $("header").css("transition", "");
            $('ul.navbar-nav > li.dropdown.personal-desktop-menu').removeClass('show');
            $('ul.navbar-nav > li.dropdown.personal-desktop-menu .navbar-toggle').removeClass("in")
        }
    });

    /** Sidr submenu */
    function goingClearMobileMenu() {
        var $nav = $(".navbar-mobile"),
            $back_btn = $nav.find(" > li.dropdown > ul.dropdown-menu").prepend("<li class='dropdown-back'><div class='control'>Back<span class='icon-arrow-right'></span></div></li>");

        // For Title
        $('.navbar-mobile li.dropdown > a').each(function(){
            $(this).siblings("ul").find("li.dropdown-back").prepend("<div class='title'><a>" + $(this).text() +"</a></div>");
        });

        // open sub-level
        $('.navbar-mobile li.dropdown > a .dropdown-toggle').on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            $(this).parent().parent().addClass("is-open");
            $(this).parents().find( '.navbar-mobile' ).addClass("is-parent");


            var header = $(this).parent().parent().find('ul.dropdown-menu').height(),
                gutter = $('.remi-mobile-navbar');

            if ( gutter ) 
            {
                gutter.height(header+15);
            }
        });

        // go back
        $back_btn.on("click", ".dropdown-back", function(e) {
            e.stopPropagation();
            $(this)
            .parents(".is-open")
            .first()
            .removeClass("is-open");

            var header = $(this).parents(".is-parent").first().height();

            $(this)
            .parents(".is-parent")
            .first()
            .removeClass("is-parent");

            var gutter = $('.remi-mobile-navbar');

            setTimeout(function() {
                if (gutter) {
                    gutter.height(header);
                } 
            }, 200);
        });
    }

    goingClearMobileMenu();


    /*** Hover Nav menu */
    function navbarHover() {

        var screensize = $(window).width(),
            $header = $('.header');
        $('ul.navbar-nav > li.dropdown.personal-desktop-menu .navbar-toggle').click(function(e){
            e.preventDefault();
            $(this).toggleClass('in')
            if ( $header.hasClass('transparent') ) 
            {
                $header.removeClass('transparent');
                $header.css("transition", "none")
            }else {
                $header.addClass('transparent');
                $header.css("transition", "")
            }

            $(this).parent().toggleClass('show')
        })
    }

    navbarHover();

    /*** Smooth scroll */
    $('.sscroll, .sscroll a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                   scrollTop: target.offset().top
                }, 1e3, "easeInOutExpo");

               return false;
           }
        }
    });

    /*** enable lightbox */
    $('.popup-video').magnificPopup({
        type: 'iframe',
        preloader: false,
        fixedBgPos: true,
        removalDelay: 500,
        closeBtnInside: true,
        fixedContentPos: true,
        callbacks: {
            beforeOpen: function() {
                // console.log(this.st.iframe.markup);
                this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close">Close<span class="icon-cancel"></span></button>',
    });

    $('.enable_lightbox').magnificPopup({
        type: 'image',
        midClick: true,
        fixedBgPos: true,
        removalDelay: 500,
        fixedContentPos: true,
        tLoading: 'Loading image #%curr%...',
        image: {
            verticalFit: true,
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.find('img').attr('alt');
            }
        },
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = 'mfp-move-from-top vertical-middle enable-lightbox-wrapper';
            },
            buildControls: function() {
              // re-appends controls inside the main container
              // this.contentContaine.append(this.arrowLeft.add(this.arrowRight));
            }
        },
        closeOnContentClick: true,
        midClick: true,
        closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close">Close<span class="icon-cancel"></span></button>',
    });

    /*** progressbar */
    var bars = document.querySelectorAll('.progressbar-wrap > .progressbar');
    console.clear();

    setInterval(function(){
      bars.forEach(function(bar){
        var getWidth = parseFloat(bar.dataset.progress);
        
        for(var i = 0; i < getWidth; i++) {
          bar.style.width = i + '%';
        }
      });
    }, 500);

    /*** Number Counter */
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    $('.scrollDown').click(function() {
        var target = $('#primary');
        var space = $(this).data('space');

        if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - space
            }, 1e3, "easeInOutExpo");
        }
    });

   
    // trigger scroll
    $('a.scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var o = $(this.hash);
            if ((o = o.length ? o : $("[name=" + this.hash.slice(1) + "]")).length) return $("html, body").animate({
                scrollTop: o.offset().top - 70
            }, 1e3, "easeInOutExpo"), !1
        }
    });

    /*** Smooth scroll */
    $('.sscroll, .sscroll a').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 60
                }, 1e3, "easeInOutExpo");

                return false;
            }
        }
    });

    /*** Smooth scroll */
    $('.smoothScroll').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 60
                }, 1e3, "easeInOutExpo");

                return false;
            }
        }
    });

    /*** initial slick slider */
    $('.testimonial-slider' ).slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        fadeSpeed: 1000,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        // appendDots: $('.slider-controls'),
    });

    /*** lastNobullet */
    function lastNobullet() {
        var lastElement = false;
        $(".last_no_bullet li").each(function() {
            if (lastElement && lastElement.offset().top != $(this).offset().top) {
                $(lastElement).addClass("no_bullet");
            } else {
                $(lastElement).removeClass("no_bullet");
            }
            lastElement = $(this);
        }).last().addClass("no_bullet");
    };
    lastNobullet();

    $(window).resize(function(){
        lastNobullet();
    });

    /*** Enable Masonry */
    var $grid = $('.masonry').masonry({
        itemSelector: '.col',
        columnWidth: '.col',
        horizontalOrder: true,
    });

    function productMasonry() {
        var $grid = $('.product-masonry, .partnership-masonry');
        $(window).resize(function() {
            if ($(window).width() > 1199) {
                // initialize
                $grid.masonry({
                  itemSelector: '.col-item',
                  columnWidth: '.col-xl-3',
                  horizontalOrder: false,
                  isAnimated: true,
                  // percentPosition: true,
                });

                $grid.masonry('reloadItems');
                $grid.masonry('layout');

                // layout Masonry after each image loads
                $grid.imagesLoaded().progress( function() {
                  $grid.masonry('layout');
                });
            }else {
                $grid.masonry();
                $grid.masonry('destroy');
            }
        }).resize()
        
    }
    productMasonry();

    /*** Generated by CoffeeScript 1.9.2 */
    function stickyKit() {
        var reset_scroll;

        $(function() {
            return $("[data-sticky_column]").stick_in_parent({
                parent: "[data-sticky_parent]",
                offset_top: 160,
                bottoming: true,
            });
        });

        reset_scroll = function() {
            var scroller;
            scroller = $("body,html");
            scroller.stop(true);

            if ($(window).scrollTop() !== 0) {
                scroller.animate({
                    scrollTop: 0
                }, "fast");
            }
            return scroller;
        };

        window.scroll_it = function() {
            var max;
            max = $(document).height() - $(window).height();

            return reset_scroll().animate({
                scrollTop: max
            }, max * 3).delay(100).animate({
                scrollTop: 0
            }, max * 3);
        };

        window.scroll_it_wobble = function() {
            var max, third;
            max = $(document).height() - $(window).height();
            third = Math.floor(max / 3);

            return reset_scroll().animate({
                scrollTop: third * 2
            }, max * 3).delay(100).animate({
                scrollTop: third
            }, max * 3).delay(100).animate({
                scrollTop: max
            }, max * 3).delay(100).animate({
                scrollTop: 0
            }, max * 3);
        };

        $(window).on("load", (function(_this) {
            return function(e) {
                return $(document.body).trigger("sticky_kit:recalc");
            };
        })(this));

        $(window).on("resize", (function(_this) {
            return function(e) {
                return $(document.body).trigger("sticky_kit:recalc");
            };
        })(this));
    }

    var window_width = $(window).width();

    if (window_width < 1199) {
        $(document.body).trigger("sticky_kit:detach");
    } else {
        stickyKit();
    }

    $( window ).resize(function() {
        window_width = $( window ).width();
        if (window_width < 1199) {
            $(document.body).trigger("sticky_kit:detach");
        } else {
            stickyKit();
        }
    });

    /*** typed */
    new Typed('#typed',{
        strings : ['Graphic Designer', 'Juaylary Retach', 'Digital Marketing'],
        typeSpeed : 100,
        delaySpeed : 150,
        loop : true
    });

    /*** Number Counter */
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

}(jQuery));