let swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let swiper2 = new Swiper(".mySwiper2", {
    direction: 'vertical',
    mousewheel: true,
}) 

let prevSlide = 0;

swiper.on('slideChange', function (e) {
    let curSlide;
    let previous;
    if (prevSlide < e.activeIndex) {
        curSlide = document.querySelector('.swiper-slide-next');
        previous = false;
    }
    else {
        curSlide = document.querySelector('.swiper-slide-prev');
        previous = true;
    }

    // Nested Slides
    if (e.activeIndex === 1) {
        swiper.mousewheel.disable();
        console.log('swiper disabled');
    }
    if (e.activeIndex === 2) {
        swiper.mousewheel.disable();
        let accum = 0;
        curSlide.addEventListener('wheel', function(e) {
            accum += e.deltaY;
            console.log(accum);
            if (accum > 1000 || accum < -1000) {
                console.log('swiper enable ing')
                swiper.mousewheel.enable();
                setTimeout(() => accum = 0, 2);
            }
        })
    }
    prevSlide = e.activeIndex;
});

let prevSlide2 = 0;
swiper2.on('slideChange', function(e) {
    let curSlide2;
    if (prevSlide2 < e.activeIndex) {
        console.log('choose next');
        curSlide2 = document.querySelector('.swiper-slide-next');
    }
    else {
        curSlide2 = document.querySelectorAll('.swiper-slide-prev')[1];
        console.log('choose prev');
    }

    console.log(curSlide2)
    console.log(curSlide2.ariaLevel[0]);
    console.log(prevSlide2);
    if ((curSlide2.ariaLevel[0] === '5' && prevSlide2 === 3) || curSlide2.ariaLevel[0] === '1' && prevSlide2 === 1) {
        console.log('testenable')
        curSlide2.addEventListener('wheel', swiperEnable);
    }
    prevSlide2 = e.activeIndex;
})

function swiperEnable() {
    console.log('swiper enabled');
    swiper.mousewheel.enable();
    this.removeEventListener('wheel', swiperEnable);
}