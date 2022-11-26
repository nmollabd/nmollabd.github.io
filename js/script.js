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
    if ($( ".header" ).hasClass('transparent')) 
    {
        $(".header .navbar-brand img").attr("src", $(".header .navbar-brand").attr('data-white'));
    }
    else
    {
        $(".header .navbar-brand img").attr("src", $(".header .navbar-brand").attr('data-normal'));
    }

    $(window).scroll(function(){
        if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            $(".header").addClass("stop");
            $(".sidr").addClass("stop");

            if ($( ".header" ).hasClass('transparent')) 
            {
                $(".header .navbar-brand img").attr("src", $(".header .navbar-brand").attr('data-normal'));
            } 
        } 
        else 
        {
            $(".header").removeClass("stop");
            $(".sidr").removeClass("stop");

            if ($( ".header" ).hasClass('transparent')) 
            {
                $(".header .navbar-brand img").attr("src", $(".header .navbar-brand").attr('data-white'));
            }
        }
    });

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

    $('.scrollDown').click(function() {
        var target = $('#primary');
        var space = $(this).data('space');

        if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - space
            }, 1e3, "easeInOutExpo");
        }
    });

     $('.testimonial__slider')
        .slick({
            dots: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            prevArrow: $('.slider-controls .slide-prev'),
            nextArrow: $('.slider-controls .slide-next'),
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 1,
                        autoplay: true,
                    },
                },
            ],
        })
        .on('setPosition', function () {
            $('.testimonial__slider .slick-track')
                .find('.slick-slide')
                .css(
                'height',
            $('.testimonial__slider .slick-track').outerHeight() + 'px'
        );
    });

    jQuery(document).ready(function() {

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

        //Blog Thumbnail Slider 
        $(".blog-thumbnail-slider").slick({
            autoplay: true, 
            prevArrow: '<button type="button" class="slick-prev"><i class="icon-left-open"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon-right-open"></i></button>',
            
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

    /*** Popup Video lightbox */
    $('.popup-video').magnificPopup({
         type: 'iframe',
         preloader: false,
         fixedBgPos: true,
         removalDelay: 500,
         fixedContentPos: true,
         callbacks: {
             beforeOpen: function() {
                 // console.log(this.st.iframe.markup);
                 this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
                 this.st.mainClass = this.st.el.attr('data-effect');
             }
         },

         closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close">Close<span class="icon-close"></span></button>',
    });


    $('.application-select-card').magnificPopup({
        type: 'inline',
        preloader: true,
        fixedBgPos: true,
        removalDelay: 500,
        closeBtnInside: true,
        fixedContentPos: true,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = this.st.el.attr('data-effect');
            },
            buildControls: function() {
                // re-appends controls inside the main container
                $('<button type="button" class="mfp-close">Close <i class="icon-close"></i></button>').appendTo(this.container);

            }
        },
        midClick: true,
    });

    // WOW JS
    jQuery(window).on('load', function() {
        // WOW JS
        new WOW().init();

        // Preloader
        var preLoder = $("#preloader");
        preLoder.fadeOut(0);
    });

    // myCursor    
    // var myCursor    = jQuery('.mouse-cursor');
    
    //     if(myCursor.length){
    //         if ($("body")) {
    //         const e = document.querySelector(".cursor-inner"),
    //             t = document.querySelector(".cursor-outer");
    //         let n, i = 0,
    //             o = !1;
    //         window.onmousemove = function (s) {
    //             o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
    //         }, $("body").on("mouseenter", "a, .ryker_tm_topbar .trigger, .cursor-pointer", function () {
    //             e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
    //         }), $("body").on("mouseleave", "a, .ryker_tm_topbar .trigger, .cursor-pointer", function () {
    //             $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
    //         }), e.style.visibility = "visible", t.style.visibility = "visible"
    //     }
    // }
}(jQuery));