$(document).ready(function() {
    new Swiper('.swiper-container', {
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 20,
        speed: 3000,

        autoplay: {
            delay: 3000,
        },

        breakpoints: {

            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            },

            991: {
                slidesPerView: 2,
                spaceBetween: 20
            },

            575: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });
});