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

    /*** Hover Nav menu */
    function navbarHover() {

        var screensize = $(window).width(),
            $header = $('.header');

        $('ul.navbar-nav:not(.navbar-mobile) > li.dropdown').hover(function() 
        {

            $header.removeClass('transparent');
            // $(this).addClass('show');
            $(this).find('.dropdown-menu').show().parents('.dropdown').addClass('show');

            // if ( $header.hasClass('white') ) 
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

    $('.scrollDown').click(function() {
        var target = $('#primary');
        var space = $(this).data('space');

        if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - space
            }, 1e3, "easeInOutExpo");
        }
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
}(jQuery));