var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let prevSlide = 0;

swiper.on('slideChange', function (e) {
    let curSlide;
    if (prevSlide < e.activeIndex) {
        console.log('next element');
        console.log(document.querySelector('.swiper-slide-next'));
        curSlide = document.querySelector('.swiper-slide-next');
    }
    else {
        console.log('previous element');
        console.log(document.querySelector('.swiper-slide-prev'));
        curSlide = document.querySelector('.swiper-slide-prev');
    }
    if (e.activeIndex === 2) {
        swiper.mousewheel.disable();
        let accum = 0;
        curSlide.addEventListener('wheel', function(e) {
            accum += e.deltaY;
            console.log(accum);
            if (accum > 1000 || accum < -1000) {
                swiper.mousewheel.enable();
                setTimeout(() => accum = 0, 500);
            }
        })
    }
    prevSlide = e.activeIndex;
});