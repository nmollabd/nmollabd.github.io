$(function ($) {
  "use strict";

    jQuery(document).ready(function () {

    $(".toggle-icon").on("click", function () {
        $(".my-navbar").toggleClass("show");
        $(".mainmenu-area").toggleClass("show");
    });

    $("#nav-icon3").click(function () {
        $(this).toggleClass("open");
    });

    $(".my-navbar .mynav-item").on("click", function (e) {
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum + 2;
            $(".my-navbar .mynav-item").removeClass("active");
            $(this).addClass("active");
            $("#main > section.active").removeClass("active");
            $("#main > section:nth-child(" + nthChild + ")").addClass("active");
        }
        e.preventDefault();
    });

    $("#home .pagelink").on("click", function (e) {
        e.preventDefault();
            if (e.target.parentNode.id = "g-p-f-h") {
            $(".my-navbar .mynav-item").removeClass("active");
            $(".my-navbar .mynav-item.portfolio").addClass("active");
            $(".my-navbar .mynav-item .portfolio").addClass("active");
            $(".project-gallery").addClass("active");
        }
    });

    // Ajax On Modal 
    $(".service-area-wrapper").each(function () {
        $(this).magnificPopup({
            delegate: ".service-modal:visible",
            type: "ajax",
            tLoading:
            '<div class="preloader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>',
            mainClass: "mfp-fade",
            closeBtnInside: true,
            midClick: true,
            gallery: {
                enabled: true,
            },
        });
    });

    $('.project-gallery-item').each(function() {
        $(this).magnificPopup({
                delegate: '.pp:visible',
                type: "ajax",
                tLoading: '<div class="preloader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>',
                mainClass: "mfp-fade",
                closeBtnInside: true,
                midClick: true,
                gallery: {
                enabled: true,
            },

            callbacks: {
                ajaxContentAdded: function() {
                    $(".owl-carousel").each(function (index) {
                        var a = $(this);
                            $(this).owlCarousel({
                                    autoplay: a.data('autoplay'),
                                    center: a.data('center'),
                                    autoplayTimeout: a.data('autoplaytimeout'),
                                    autoplayHoverPause: a.data('autoplayhoverpause'),
                                    loop: a.data('loop'),
                                    speed: a.data('speed'),
                                    nav: a.data('nav'),
                                    dots: a.data('dots'),
                                    autoHeight: a.data('autoheight'),
                                    autoWidth: a.data('autowidth'),
                                    margin: a.data('margin'),
                                    stagePadding: a.data('stagepadding'),
                                    slideBy: a.data('slideby'),
                                    lazyLoad: a.data('lazyload'),
                                    navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                                    animateOut: a.data('animateOut'),
                                    animateIn: a.data('animateIn'),
                                    video: a.data('video'),
                                    items: a.data('items'),
                                    responsive:{
                                    0:{items: a.data('items-xs'),},
                                    576:{items: a.data('items-sm'),},
                                    768:{items: a.data('items-md'),},
                                    992:{items: a.data('items-lg'),}
                                } 
                            });
                        });
                    }
                }
            });
        });
    });

    $(window).on('load', function () {
        var preLoder = $("#preloader");
        preLoder.addClass('hide');
    });

    /*** typed */
    new Typed('#typed',{
        strings : ['Front-end Developer', 'Designer'],
        typeSpeed : 100,
        delaySpeed : 150,
        loop : true
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
        appendDots: $('.slider-controls'),
    });

    /*** initial slick slider */
    $('.modal-slider' ).slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        fadeSpeed: 1000,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        appendDots: $('.modal-slider-controls'),
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

    /*** enable lightbox */
    $('.popup-video, .blog-post .media a.video').magnificPopup({
        type: 'iframe',
        preloader: false,
        fixedBgPos: true,
        removalDelay: 500,
        closeBtnInside: false,
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

    $('.gallery-popup').magnificPopup({
        delegate: 'a.popup',
        type: 'image',
        midClick: true,
        preloader: false,
        fixedBgPos: true,
        removalDelay: 500,
        fixedContentPos: true,
        closeBtnInside: false,
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
        },
        image: {

            titleSrc: function(item) {
                var title = item.el.attr('title') ? '<h6 class="title">' + item.el.attr('title') + '</h6>' : '';
                var description = item.el.attr('description') ? item.el.attr('description') : '';

                return title + description;
            }
        },

        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            },
        },
        closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close">Close<span class="icon-cancel"></span></button>',
    });

    /*** Number Counter */
    $('.counter').counterUp({
        delay: 10,
        time: 1000
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
});

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.background = 'transparent'

const mouse = {
    x: undefined,
    y: undefined
}   
window.addEventListener('mousemove',e =>{
    mouse.x = e.x
    mouse.y = e.y
  
})

// Código abaixo cria um objeto circulo individual
function Circle(x, y, radius = 10, speedX = 5, speedY = 5, maxRadius = 10) {
    this.x = x
    this.y = y
    this.radius = radius
    this.speedX = speedX
    this.speedY = speedY
    this.maxRadius = maxRadius
    this.minRadius = radius

    this.draw = () => { //desenha o circulo
        context.beginPath()
        context.strokeStyle = '#FFC107'
        context.fillStyle = 'transparent'
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.stroke()
        context.fill()
        context.closePath()
    }

    this.update = () => { // verifica a colisao e muda o sinal da velocidade
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.speedX = -this.speedX
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speedY = -this.speedY
        }
        this.x += this.speedX
        this.y += this.speedY

        //efeito do mouse
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y> -50){
            if(this.radius < this.maxRadius){
                this.radius +=1
            }
        }else if(this.radius > this.minRadius){
            this.radius -= 1
        }

        this.draw() //chama o metodo draw
    }
}

let circleArr = []

for (let i = 0; i < 500; i++) {//a quantidade de loops determina a quantidade de bolinhas
    let radius = Math.random() * 3 + 1
    let x = Math.random() * (canvas.width - radius * 2.5) + radius//randomização do x
    let y = Math.random() * (canvas.height - radius * 2.5) + radius
    let speedX = Math.random() * 1
    let speedY = Math.random() * 1

    circleArr.push(new Circle(x, y, radius, speedX, speedY))//adiciona um novo circulo a cada posição do array
}

const animate = () => {
    requestAnimationFrame(animate)// faz um loop infinito
    context.clearRect(0, 0, canvas.width, canvas.height) //limpa todo o canvas
    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update()// tualiza a posição de cada bolinha e desenha ela na tela
    }

}
animate()


/*** Cursor */
const cursor = document.querySelector('#cursor');

if ( cursor ) {
    
    const cursorCircle = cursor.querySelector('.cursor__circle');

    const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
    const pos = { x: 0, y: 0 }; // cursor's coordinates
    const speed = 0.4; // between 0 and 1

    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    window.addEventListener('mousemove', updateCoordinates);

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
            Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.15;
        const accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    }

    const updateCursor = () => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);

        pos.x += diffX * speed;
        pos.y += diffY * speed;

        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);

        const rotate = 'rotate(' + angle +'deg)';
        const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

        cursor.style.transform = translate;
    };

    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    const cursorModifiers = document.querySelectorAll('[cursor-class]');

    cursorModifiers.forEach(curosrModifier => {
        curosrModifier.addEventListener('mouseenter', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.add(className);
        });

        curosrModifier.addEventListener('mouseleave', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.remove(className);
        });
    });

    const anchorLinks = document.querySelectorAll('a[href], button');

    anchorLinks.forEach(curosrModifier => {
        curosrModifier.addEventListener('mouseenter', function() {
            const className = 'anchor';
            cursor.classList.add(className);
        });

        curosrModifier.addEventListener('mouseleave', function() {
            const className = 'anchor';
            cursor.classList.remove(className);
        });
    });
}

wowjs = new WOW({
    boxClass:     'wow',      // default
    animateClass: 'animate__animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
});

wowjs.init();

$(function() {

    $(".products").mixItUp();

        var inputText;
        var $matching = $();

        // Delay function
        var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })();

        $("#input").keyup(function(){
            // Delay function invoked to make sure user stopped typing
            delay(function(){
                inputText = $("#input").val().toLowerCase();

                // Check to see if input field is empty
                if ((inputText.length) > 0) {            
                $( '.mix').each(function() {
                $this = $("this");

                // add item to be filtered out if input text matches items inside the title   
                if($(this).children('.title').text().toLowerCase().match(inputText)) {
                $matching = $matching.add(this);
            }

            else {
                // removes any previously matched item
                $matching = $matching.not(this);
            }
        });

            $(".products").mixItUp('filter', $matching);
        }

            else {
                // resets the filter to show all item if input is empty
                $(".products").mixItUp('filter', 'all');
            }
        }, 200 );
    });
})