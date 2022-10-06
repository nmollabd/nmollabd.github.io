(function ($) {
    var ua = window.navigator.userAgent;
    var isIE = /MSIE|Trident/.test(ua);

    if ( !isIE ) {
        //IE specific code goes here
        "use strict";
    }

    $('[data-toggle="tooltip"]').tooltip();

    /*** Navbar Menu */
    $('.navbar-toggle').sidr({
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
        }
    });

    //Sticky Header 
    $(window).on("scroll", function(){
        var ScrollBarPose = $(window).scrollTop(); 
        var HeaderHeight = $(".header").height();
        if( ScrollBarPose > HeaderHeight ) {
            $(".header").addClass("sticky"); 
        } else {
            $(".header").removeClass("sticky");
        }
    });

        /*** Hover Nav menu */
    function navbarHover() {

        var screensize = $(window).width(),
            $header = $('.header');

        $('ul.navbar-nav:not(.navbar-mobile) > li.dropdown').hover(function() 
        {

            $header.removeClass('transparent');
            // $(this).addClass('show');
            $(this).find('.dropdown-menu').show().parents('.dropdown').addClass('show');

            if ( $header.hasClass('white') ) 
            {
                $header.addClass('white-remove');
                $header.removeClass('white');
            }
        }, 
        function() 
        {
            var $this = $(this);
            $header.addClass('transparent');
            // $(this).removeClass('show');
            // $(this).removeClass('show').find('.dropdown-menu').delay(5000).hide();
            $(this).removeClass('show');
            setTimeout(function() { 
               $this.find('.dropdown-menu').hide()
            }, 200);

            if ( $header.hasClass('white-remove') ) 
            {
                $header.addClass('white');
                $header.removeClass('white-remove');
            }
        });
    }

    $(window).on("load resize", function() {
        navbarHover();
    });

    /*** Header height = gutter height */
    function setGutterHeight(){
        var header = document.querySelector('.header'),
              gutter = document.querySelector('.header-gutter');
        if (gutter) {
            gutter.style.height = header.offsetHeight + 'px';
        }
    }
    window.onload = setGutterHeight;
    window.onresize = setGutterHeight;

    jQuery(document).ready(function() {
        
        //Hero Slider
        $(".hero-slider").slick({
            autoplay: true, 
            dots: true, 
            arrows: false,
            fade: true,
        })

        //Testimonial Slider 
        $(".testimonial-section .slider-area").slick({
            autoplay: true, 
            dots: true,
            slidesToShow: 3,
            arrows: false,
            responsive : [
                {
                    breakpoint: 1200, 
                    settings: {
                        slidesToShow: 2,
                    }
                }, 
                {
                    breakpoint: 575, 
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        //Porfolio Single Slider 
        $(".img-slider").slick({
            autoplay: true, 
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>'
        }); 

        $(".portfolio-slider").slick({
            autoplay: true, 
            slidesToShow: 3, 
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
            responsive: [
                {
                    breakpoint: 992, 
                    settings: {
                        slidesToShow: 2,
                    }
                }, 
                {
                    breakpoint: 768, 
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        //Blog Thumbnail Slider 
        $(".blog-thumbnail-slider").slick({
            autoplay: true, 
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
            
        });


        //ScrollTop 
        $(window).on("scroll", function(){
            var scrollBar = $(window).scrollTop(); 
            if( scrollBar > 500 ) {
                $(".scrolltop").fadeIn(); 
            } else {
                $(".scrolltop").fadeOut();
            }
        });

        $(".scrolltop").click(function(){
            $("html,body").animate({
                scrollTop: 0,
            }, 1500, 'swing');
        });

        //ScrollDown 
        $(".scrolldown a").on("click", function(e){
            e.preventDefault();
            var hashDistance = $(this.hash).offset().top - 130;
            $("body,html").animate({
                scrollTop: hashDistance,
            }, 1500);
        }); 
    });

    /** Sidr submenu */
    function portfolioMobileMenu() {
        var $nav = $(".navbar-mobile"),
            $back_btn = $nav.find(" > li.dropdown > ul.dropdown-menu").prepend("<li class='dropdown-back'><div class='control'>Back<span class='icon-arrow-right'></span></div></li>");

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
                gutter = $('.gc-mobile-nav');

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

            var gutter = $('.gc-mobile-nav');

            setTimeout(function() {
                if (gutter) {
                    gutter.height(header);
                } 
            }, 200);
        });
    }

    portfolioMobileMenu();

    // WOW JS
    jQuery(window).on('load', function() {

        // WOW JS
        new WOW().init();

        // Preloader
        var preLoder = $("#preloader");
        preLoder.fadeOut(0);

        //ProgressBar 
        // jQuery(".progress-bar").ProgressBar(); 
    });
}(jQuery));