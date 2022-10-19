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

    $('body').scrollspy({ 
        offset: 60,
        target: '.header, .sidr',
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

}(jQuery));