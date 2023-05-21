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
    function portfolioMobileMenu() {
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

    portfolioMobileMenu();


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

    /*** Sly  */
    $('.break-room-slider-wrapper').each(function(i, l) {

        var $sly_frame = $(this),
            $slide = $sly_frame.children('.slyslider').eq(0),
            $sly_wrap  = $sly_frame.parent();

        $(this).sly({
            smart: 1,
            speed: 300,
            horizontal: 1,
            mouseDragging: 1,
            releaseSwing: 1,
            touchDragging: 1,
            itemNav: 'basic',
            scrollBy: 1,
            clickBar: 1,
            swingSpeed: 0.2,
            elasticBounds: 1,
            dragHandle: 1,
            dynamicHandle: 1,
            sbSize: 80,
            activateMiddle: 1,
            easing: 'easeOutExpo',
            scrollBar: $sly_wrap.find('.slyslider__scrollbar'),
            prev: $sly_wrap.find('.prev'),
            next: $sly_wrap.find('.next'),
        });
    });

    /*** initial slick slider */
    $('.testimonial-slider' ).slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        fadeSpeed: 1000,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        appendDots: $('.slider-controls'),
    });

    
    /*** Header height = gutter height */
    function setGutterHeight(){
        var header = document.querySelector('.header'),
              gutter = document.querySelector('.header-gutter'),
              banner = document.querySelector('.banner');
        if (gutter) {
            gutter.style.height = header.offsetHeight + 'px';
        }
    }
    window.onload = setGutterHeight;
    window.onresize = setGutterHeight;


    /*** tab */
    $('.solutions-business__navbar .navbar-nav li').click(function () {
        var navId = $(this).attr('data-nav');

        $('.solutions-business__body .tab-content').removeClass('show');
        $('.solutions-business__navbar .navbar-nav li').removeClass('show');

        $(this).addClass('show');
        $(".solutions-business__body #" + navId).addClass('show');
    });

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

let themeToggler = document.querySelector('.theme-toggler');
themeToggler.onclick = () =>{
    themeToggler.classList.toggle('active');
    if(themeToggler.classList.contains('active')) {
        document.body.classList.add('active');
    } else{
        document.body.classList.remove('active');
    }
}

document.querySelectorAll('.theme-colors .color').forEach(color => {
    color.onclick = () => {
        let background = color.style.background;
        document.querySelector(':root').style.setProperty('--main-color', background);
    }
}); 

let theme = document.querySelector('.switcher-themes');
document.querySelector('#theme-open').onclick = () => {
    theme.classList.add('active');
    document.body.style.paddingRight = '0px';
}

document.querySelector('#theme-close').onclick = () => {
    theme.classList.remove('active');
    document.body.style.paddingRight = '0px';
}