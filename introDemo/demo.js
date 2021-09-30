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
    if (e.activeIndex === 1) {
        swiper.mousewheel.disable();
        curSlide.addEventListener('wheel', function(e) {
            accum1 += e.deltaY;
            console.log(accum1, textBoxIndex);

            if (Math.abs(accum1) > 1000) {
                if (e.deltaY > 0) {
                    console.log('plus')
                    textBoxIndex += 1;
                    if (textBoxIndex < 4 && textBoxIndex > -1) {
                        textBoxes[textBoxIndex].style.opacity = 1;
                    }
                    else {
                        swiper.mousewheel.enable();
                        accum1 = 0;
                    }
                }
                else {
                    console.log('minus');
                    textBoxIndex -= 1;
                    if (textBoxIndex > -1 && textBoxIndex < 4) textBoxes[textBoxIndex].style.opacity = 0;
                    else {
                        swiper.mousewheel.enable();
                        accum1 = 0;
                    }
                }
                accum1 = 0;
                console.log(accum1, textBoxIndex);
            }
            e.preventDefault();
           
            // if (accum > 1000) {
            //     swiper.mousewheel.enable();
            //     accum = 0;
            // }

            // if (accum > 800) {
            //     textBoxes[3].style.opacity = 1;
            // } else {
            //     if (accum > 600) {
            //         textBoxes[2].style.opacity = 1;
            //     } else {
            //         if (accum > 400) {
            //             textBoxes[1].style.opacity = 1;
            //         } else {
            //             if (accum > 200) {
            //                 textBoxes[0].style.opacity = 1;
            //             }
            //         }
            //     }
            // }


            // if (accum < - 1000) {
            //     swiper.mousewheel.enable();
            //     accum = 0;
            // }

            // if (accum < -800) {
            //     textBoxes[0].style.opacity = 0;
            // } else {
            //     if (accum < -600) {
            //         textBoxes[1].style.opacity = 0;
            //     } else {
            //         if (accum < -400) {
            //             textBoxes[2].style.opacity = 0;
            //         } else {
            //             if (accum < -200) {
            //                 textBoxes[3].style.opacity = 0;
            //             }
            //         }
            //     }
            // }
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