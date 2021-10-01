let swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    speed: 1000,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let interleaveOffset = 0.5;
let swiper2 = new Swiper(".mySwiper2", {
    direction: 'vertical',
    mousewheel: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    speed: 1000,
    on: {
        progress: function() {
          var swiper = this;
          console.log('swipers progress');
          console.log(swiper.progress);
          let slides = swiper.slides;
          for (var i = 0; i < slides.length; i++) {
            var slideProgress = slides[i].progress;
            console.log(slides[i].querySelector('.test'));
            if (slideProgress>= 0) {
                slides[i].querySelector('.test').style.opacity = slideProgress === 0 ? 1 : 0;
            }
            else {
                slides[i].querySelector('.test').style.opacity = 0;
            }
            console.log('slides[' + i + '] progress');
            console.log(slides[i].progress);
          }      
        },
        touchStart: function() {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
            swiper.slides[i].querySelector('.test').style.transition = '';
          }
        },
        setTransition: function(speed) {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector('.test').style.transition = speed + 'ms';
          }
        },
    }
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
        swiper.disable();
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
    if ((e.activeIndex === 4 && e.previousIndex === 3) || e.activeIndex === 0 && e.previousIndex === 1) {
        swiper.mousewheel.enable();
        swiper.enable();
    } 
})
