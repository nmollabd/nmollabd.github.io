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

// Clock
const deg = 6;
const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const setClock = () => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    min.style.transform = `rotateZ(${mm}deg)`;
    sec.style.transform = `rotateZ(${ss}deg)`;
};
setClock();
setInterval(setClock, 1000);

// DOMContentLoaded
window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);

window.requestAnimationFrame = 
    window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function (callback) {
        window.setTimeout(callback, 1000/60);
    };

var canvas, ctx, w, h, particles = [], probability = 0.04,
    xPoint, yPoint;

function onLoad() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    
    window.requestAnimationFrame(updateWorld);
} 

function resizeCanvas() {
    if (!!canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
} 

function updateWorld() {
    update();
    paint();
    window.requestAnimationFrame(updateWorld);
} 

function update() {
    if (particles.length < 500 && Math.random() < probability) {
        createFirework();
    }
    var alive = [];
    for (var i=0; i<particles.length; i++) {
        if (particles[i].move()) {
            alive.push(particles[i]);
        }
    }
    particles = alive;
} 

function paint() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (var i=0; i<particles.length; i++) {
        particles[i].draw(ctx);
    }
} 

function createFirework() {
    xPoint = Math.random()*(w-200)+100;
    yPoint = Math.random()*(h-200)+100;
    var nFire = Math.random()*50+100;
    var c = "rgb("+(~~(Math.random()*200+55))+","
         +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
    for (var i=0; i<nFire; i++) {
        var particle = new Particle();
        particle.color = c;
        var vy = Math.sqrt(25-particle.vx*particle.vx);
        if (Math.abs(particle.vy) > vy) {
            particle.vy = particle.vy>0 ? vy: -vy;
        }
        particles.push(particle);
    }
} 

function Particle() {
    this.w = this.h = Math.random()*4+1;
    
    this.x = xPoint-this.w/2;
    this.y = yPoint-this.h/2;
    
    this.vx = (Math.random()-0.5)*10;
    this.vy = (Math.random()-0.5)*10;
    
    this.alpha = Math.random()*.5+.5;
    
    this.color;
} 

Particle.prototype = {
    gravity: 0.05,
    move: function () {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.alpha -= 0.01;
        if (this.x <= -this.w || this.x >= screen.width ||
            this.y >= screen.height ||
            this.alpha <= 0) {
                return false;
        }
        return true;
    },
    draw: function (c) {
        c.save();
        c.beginPath();
        
        c.translate(this.x+this.w/2, this.y+this.h/2);
        c.arc(0, 0, this.w, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        
        c.closePath();
        c.fill();
        c.restore();
    }
} 