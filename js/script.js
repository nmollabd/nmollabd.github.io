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
    if ($( ".header" ).hasClass('white')) 
    {
        $(".header .navbar-brand img").attr("src", $(".header .navbar-brand").attr('data-white'));
    }

    $(window).scroll(function(){
        if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            $(".header").addClass("stop");
            $(".sidr").addClass("stop");

            if ($( ".header" ).hasClass('white')) 
            {
                $(".header .navbar-brand img").attr("src", $(".header .navbar-brand").attr('data-normal'));
            } 
        } else {
            $(".header").removeClass("stop");
            $(".sidr").removeClass("stop");

            if ($( ".header" ).hasClass('white')) 
            {
                $(".header .navbar-brand img").attr("src", $(".header .navbar-brand").attr('data-white'));
            }
        }
    });

    /*** Sticky header */
    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
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
        } 
        else if ( currentScroll < lastScroll && body.classList.contains(scrollDown) ) 
        {
            // up
            body.classList.remove(scrollDown);
            body.classList.add(scrollUp);
        }

        lastScroll = currentScroll;
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
        $(".team-slider .slider-area").slick({
            autoplay: true, 
            dots: false,
            slidesToShow: 5,
            arrows: false,
            autoplaySpeed: 1000,

            responsive : [
                {
                    breakpoint: 1200, 
                    settings: {
                        slidesToShow: 4,
                    }
                },

                {
                    breakpoint: 992, 
                    settings: {
                        slidesToShow: 3,
                    }
                },

                {
                    breakpoint: 768, 
                    settings: {
                        slidesToShow: 2,
                    }
                },

                {
                    breakpoint: 481, 
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

    /*** testiamonialSlide*/
    var swiper = new Swiper(".testiamonialSlide", {
        spaceBetween: 30,
        autoplay: false,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    /*** Search bar */
    $('.header-search').on('click', '.search-toggle', function(e) {
        e.preventDefault();
        var selector = $(this).data('selector');
        $(selector).toggleClass('show').find('.search-input').focus();
    });

    // // Disable right-click
    // document.addEventListener('contextmenu', (e) => e.preventDefault());
    // function ctrlShiftKey(e, keyCode) {
    //     return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    // }

    // document.onkeydown = (e) => {
    //     // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U

    //     if (
    //         event.keyCode === 123 ||
    //         ctrlShiftKey(e, 'I') ||
    //         ctrlShiftKey(e, 'J') ||
    //         ctrlShiftKey(e, 'C') ||
    //         (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
    //     )

    //     return false;
    // };
}(jQuery));