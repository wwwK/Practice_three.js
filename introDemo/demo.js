let swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let prevSlide = 0;

const textBoxes = document.querySelectorAll('.textBox');
let textBoxIndex = -1;

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

    let accum1 = 0;
    let toggle = true;
    let count = 0;
    if (e.activeIndex === 1) {
        textBoxes[0].style.opacity = 1;
        swiper.mousewheel.disable();
        curSlide.addEventListener('wheel', function(e) {
            accum1 += e.deltaY;
            console.log('before', accum1);
            if (count > 5) {
                swiper.mousewheel.enable();
                count = 0;
            }
            if (Math.abs(accum1) >= 500) {
                console.log('over 500');
                accum1 = 0;
                console.log('after', accum1);
                textBoxes[0].style.opacity = toggle ? 1 : 0;
                toggle = !toggle;
                count += 1;
            }
        })
    }

    if (e.activeIndex === 2) {
        swiper.mousewheel.disable();
        let accum2 = 0;
        curSlide.addEventListener('wheel', function(e) {
            accum2 += e.deltaY;
            console.log(accum2);
            if (accum2 > 1000 || accum2 < -1000) {
                console.log('swiper enable ing')
                swiper.mousewheel.enable();
                setTimeout(() => accum2 = 0, 2);
            }
        })
    }
    prevSlide = e.activeIndex;
});

let startBtn = document.querySelector('.startButton');
startBtn.addEventListener('click', function() {
    swiper.slideNext();
})