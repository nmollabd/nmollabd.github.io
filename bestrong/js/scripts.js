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
		} else {
			$(".header").removeClass("stop");
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

	function RiyaBeautyMobileMenu() {
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
	            gutter = $('.gc-mobile-nav');

	        if ( gutter ) 
	        {
	            gutter.height(header);
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

	RiyaBeautyMobileMenu();

    /*** ScrollDown */
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
    $('.sscroll, .sscroll a').click(function() {
       	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
           	var target = $(this.hash);
           	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           	if (target.length) {
               	$('html,body').animate({
                   scrollTop: target.offset().top - 60
               	}, 1e3, "easeInOutExpo");

               return false;
           }
       	}
    });

	/*** Header height = gutter height */
	function setGutterHeight() {
		var header = document.querySelector('.header'),
			  gutter = document.querySelector('.header-gutter');
		if (gutter) {
			gutter.style.height = header.offsetHeight + 'px';
		}
	}
	window.onload = setGutterHeight;
	window.onresize = setGutterHeight;

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

	/*** Number Counter */
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

	/*** Client Logo Slider */
	$('.ourclients__slider').slick({
		dots: false,
		autoplay: true,
		speed: 5000,
		arrows: false,
		infinite: true,
		slidesToShow: 6,
		autoplaySpeed: 0,
		cssEase: 'linear',
		centerMode: true,
		slidesToScroll: 1,
		responsive: [
		    {
		      	breakpoint: 1200,
		      	settings: {
		        	slidesToShow: 5,
		      	}
		    },
		    {
		      	breakpoint: 992,
		      	settings: {
		        	slidesToShow: 4,
		      	}
		    },
		    {
		      	breakpoint: 768,
		      	settings: {
		        	slidesToShow: 3,
		      	}
		    },
		    {
		      	breakpoint: 576,
		      	settings: {
		        	slidesToShow: 2,
		      	}
		    },
		    {
		      	breakpoint: 480,
		      	settings: {
		        	slidesToShow: 1,
		      	}
		    }
		]
	});

	/*** Testimonials Slider */
	$('.testimonial-slider').slick({
	  	speed: 500,
	  	dots: true,
	  	arrows: true,
	  	infinite: true,
	  	slidesToShow: 1,
	  	autoplay: true,
	  	slidesToScroll: 1,
	  	adaptiveHeight: false,
	});

	/*** inspire-brands-slider */
	$('.inspire-banner-slider').slick({
	  	speed: 500,
	  	fade: true,
	  	dots: true,
	  	arrows: false,
	  	infinite: true,
	  	autoplay: true,
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	});

	/*** Call Sly on frame */
	$('.slyslider__wrapper').each(function(i, l) {

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

    $('.enable_lightbox').magnificPopup({
        type: 'image',
        midClick: true,
        fixedBgPos: true,
        removalDelay: 500,
        fixedContentPos: true,
        closeBtnInside: false,
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

	$('.demo-popup').magnificPopup({
		delegate: 'a',
      	type: 'inline',
		preloader: true,
		fixedBgPos: true,
		removalDelay: 500,
		closeBtnInside: false,
		fixedContentPos: true,
		callbacks: {
		    beforeOpen: function() {
		       this.st.mainClass = 'mfp-request-demo mfp-move-from-top '+this.st.el.attr('data-effect');
		    }
		},
		midClick: true,
		closeOnContentClick: false,
		closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close"><span class="icon-cancel"></span></button>',
    });

	$('.demo-popup-btn').magnificPopup({
      	type: 'inline',
		preloader: true,
		fixedBgPos: true,
		removalDelay: 500,
		closeBtnInside: false,
		fixedContentPos: true,
		callbacks: {
		    beforeOpen: function() {
		       this.st.mainClass = 'mfp-request-demo mfp-move-from-top '+this.st.el.attr('data-effect');
		    }
		},
		midClick: true,
		closeOnContentClick: false,
		closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close"><span class="icon-cancel"></span></button>',
    });

	/*** Image to SVG */
	$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	
	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = $(data).find('svg');
	
	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	
	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');
	        
	        // Check if the viewport is set, else we gonna set it if we can.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }
	
	        // Replace image with new SVG
	        $img.replaceWith($svg);
	
	    }, 'xml');
	
	});

	/*** Get OS */
	var os = ['iphone', 'ipad', 'windows', 'mac', 'linux'];
	var match = navigator.appVersion.toLowerCase().match(new RegExp(os.join('|')));
	if (match) {
	    $('body').addClass(match[0]);
	};

	/*** BrowserDetect */
	var BrowserDetect = {
	    init: function () {
	        this.browser = this.searchString(this.dataBrowser) || "Other";
	        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
	    },
	    searchString: function (data) {
	        for (var i = 0; i < data.length; i++) {
	            var dataString = data[i].string;
	            this.versionSearchString = data[i].subString;

	            if (dataString.indexOf(data[i].subString) !== -1) {
	                return data[i].identity;
	            }
	        }
	    },
	    searchVersion: function (dataString) {
	        var index = dataString.indexOf(this.versionSearchString);
	        if (index === -1) {
	            return;
	        }

	        var rv = dataString.indexOf("rv:");
	        if (this.versionSearchString === "Trident" && rv !== -1) {
	            return parseFloat(dataString.substring(rv + 3));
	        } else {
	            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	        }
	    },

	    dataBrowser: [
	        {string: navigator.userAgent, subString: "Edge", identity: "MSEdge"},
	        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
	        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},  
	        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},  

	        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"}, 
	        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}       
	    ]
	};
	
	BrowserDetect.init();
	document.body.classList.add( BrowserDetect.browser );

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

    // Disable right-click
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

    // Scroll Down Button
    window.addEventListener("load", function() {
        function circularText(txt, radius, container) {
            const deg = 360 / txt.length;
            const div = document.createElement('span');
            div.classList.add('split-text');
            container.appendChild(div);
            txt.split('').forEach((ea, i) => {
                div.innerHTML += `<span style="height:${radius}px;position:absolute;transform:rotate(${deg * i}deg);transform-origin:0 100%">${ea}</span>`;
            });
        }

        const roundTextElements = document.querySelectorAll(".round-text");
        roundTextElements.forEach((roundText) => {
            const dataRound = roundText.getAttribute("data-round");
            const dataRadius = roundText.getAttribute("data-radius");
            circularText(dataRound, dataRadius, roundText);
        });
    });

}(jQuery));