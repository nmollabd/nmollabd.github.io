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

        //ProgressBar 
        // jQuery(".progress-bar").ProgressBar(); 
    });

        
    var myCursor    = jQuery('.mouse-cursor');
    
        if(myCursor.length){
            if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
                t = document.querySelector(".cursor-outer");
            let n, i = 0,
                o = !1;
            window.onmousemove = function (s) {
                o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
            }, $("body").on("mouseenter", "a, .ryker_tm_topbar .trigger, .cursor-pointer", function () {
                e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
            }), $("body").on("mouseleave", "a, .ryker_tm_topbar .trigger, .cursor-pointer", function () {
                $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
            }), e.style.visibility = "visible", t.style.visibility = "visible"
        }
    }

}(jQuery));