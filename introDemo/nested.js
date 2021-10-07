// Main Swiper 생성
let swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    speed: 1000,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    effect: 'fade',
    watchOverflow: true,
});

// Nested Swiper 생성
let interleaveOffset = 0.5;
let swiper2 = new Swiper(".mySwiper2", {
    direction: 'vertical',
    mousewheel: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    speed: 1000,

    // 텍스트박스 전환 애니메이션
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

// Skip 버튼
let skipBtn = document.querySelector('.skipBtn');
let backBtn = document.querySelector('.backBtn');

skipBtn.addEventListener('click', handleSkip);
function handleSkip() {
    swiper.slideTo(4, 500, false);
}

backBtn.addEventListener('click', handleBack);
function handleBack() {
    swiper.slideTo(0, 500, false);
    swiper.enable();
}


// 슬라이드 별 동작 정의
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

    if (e.activeIndex === 0) {
        skipBtn.style.visibility = 'visible';
        backBtn.style.visibility = 'hidden';
    }

    // Nested slides 구간에서는 swipe/mousewheel 중지
    if (e.activeIndex === 1) {
        skipBtn.style.visibility = 'hidden';
        swiper.mousewheel.disable();
        swiper.disable();
        console.log('swiper disabled');
    }

    // Interactive Chart 구간에서는 mousewheel 중지
    if (e.activeIndex === 2) {
        swiper.mousewheel.disable();
        let accum = 0;
        curSlide.addEventListener('wheel', function(e) {
            accum += e.deltaY;
            console.log(accum);
            if (accum > 5000 || accum < -5000) {
                console.log('swiper enable ing')
                swiper.mousewheel.enable();
                setTimeout(() => accum = 0, 2);
            }
        })
    }

    if (e.activeIndex === 4) {
        skipBtn.style.visibility = 'hidden';
        backBtn.style.visibility = 'visible';
        swiper.mousewheel.disable();
        swiper.disable();
    }
    prevSlide = e.activeIndex;
});

// 중첩된 슬라이드의 앞뒤에서는 Main Swiper 다시 동작
let prevSlide2 = 0;
swiper2.on('slideChange', function(e) {
    if ((e.activeIndex === 4 && e.previousIndex === 3) || e.activeIndex === 0 && e.previousIndex === 1) {
        swiper.mousewheel.enable();
        swiper.enable();
    } 
})

// 회차이동 - 마우스 클릭/호버 동작 정의
let stories = document.querySelectorAll('.story');
let simgs = document.querySelectorAll('.storyImg');
for (let s of simgs) {
    s.addEventListener('click', expandStories);
    s.addEventListener('mouseover', hoverImage);
    s.addEventListener('mouseleave', hoverImage);
    // console.log(s);
    // s.onclick = () => console.log(s);
    // s.addEventListener('click', expandStories);
    // s.addEventListener('mouseover', hoverImage);
    // s.addEventListener('mouseleave', hoverImage);

}

// 마우스 올리면 밝기 전환
function hoverImage(e) {
    let this_story = document.querySelector('.story' + this.id[2]);
    if (this_story.className !== currentClass) {
        if (e.type === 'mouseleave') {
            this_story.children[0].style.filter = 'grayscale() brightness(0.5)';
        }
        else this_story.children[0].style.filter = 'grayscale() brightness(1)';
    }
}


// 클릭 시 너비 변경
let previous;
let previous_img;
let currentClass;
function expandStories() {
    let this_story = document.querySelector('.story' + this.id[2]);
    console.log(this_story)
    let this_id = this_story.className[11];
    console.log(this_id)
    if (previous) {
        previous.style.flex = 1;
        previous_img.style.flex = 1;
        previous.children[0].pause();
        previous.children[0].style.filter = 'grayscale() brightness(0.5)';
        previous_img.children[0].style.transform = 'translate(-50%, 50px)';
        this_story.style.flex = 1.5;
        this.style.flex = 1.5;
        this_story.children[0].style.filter = 'grayscale(0) brightness(1)';
        this_story.children[0].play();
        currentClass = this_story.className;
        this.children[0].style.transform = 'translate(0, 50px)';
    }
    
    previous = this_story;
    previous_img = this;
}


// 비디오 재생 동작 정의
let videoBtn = document.querySelector('.videoBtn');
videoBtn.addEventListener('click', playPause);

let video = document.querySelector('#vid');
console.log(video);

let playIcon = document.querySelector('#iconPlay');
let pauseIcon = document.querySelector('#iconPause');

function playPause() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    playIcon.classList.toggle('hidden');
    pauseIcon.classList.toggle('hidden');
}

// Circular Progress Bar
let r = 42;
let circleBar = document.querySelector('#bar');
circleBar.style.strokeDashoffset = 2*Math.PI*r;
circleBar.style.strokeDasharray = 2*Math.PI*r;

video.addEventListener('timeupdate', setTime);
function setTime() {
    let percentage = (video.currentTime/video.duration);
    let offsetValue = 2*Math.PI*r*(1-percentage);
    document.querySelector('#bar').style.strokeDashoffset = offsetValue;
}

// 소리 on/off 동작 정의
let soundBtn = document.querySelector('.soundBtn');
let upIcon = document.querySelector('#vUp');
let muteIcon = document.querySelector('#vMute');
soundBtn.addEventListener('click', soundToggle);
function soundToggle() {
    video.toggleAttribute('muted');
    upIcon.classList.toggle('hidden');
    muteIcon.classList.toggle('hidden');
}

// 시작 버튼 누르면 swipe next
let beginBtn = document.querySelector('.beginBtn');
beginBtn.addEventListener('click', () => swiper.slideNext());


// 맵박스
mapboxgl.accessToken = 'pk.eyJ1IjoibWlsYTAwYSIsImEiOiJja3Rja3Jxc2syNm9vMndxbmpvZGV6MzB5In0.11d_WVqUzpskNtJg-Kuamw';

// map 생성
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mila00a/cku4wlhul21hv17pe5x2op9xx', // style URL
    center: [126.999, 37.580], // starting position [lng, lat]
    zoom: 8.5, // starting zoom
    pitch: 30,
});

map.on('load', () => {
    // 서울시
    map.addSource('seoul', {
        type: 'vector',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        url: 'mapbox://mila00a.8sphyxbx'    // tileset
    });
    map.addLayer({
        'id': 'mila00a.8sphyxbx',
        'type': 'fill-extrusion',
        'source': 'seoul',
        'source-layer': 'seoul-aydgzk',
        'paint': {
            'fill-extrusion-color': 'white',
            'fill-extrusion-height': 0,
            'fill-extrusion-height-transition': { // 높이 전환 효과
                duration: 1000,
            },
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0
          },
    });

    // 안산시
    map.addSource('ansan', {
        type: 'vector',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        url: 'mapbox://mila00a.9nexet42'
    });
    map.addLayer({
        'id': 'mila00a.9nexet42',
        'type': 'fill-extrusion',
        'source': 'ansan',
        'source-layer': 'ansanNew-a5o1uc',
        'paint': {
            'fill-extrusion-color': 'white',
            'fill-extrusion-height': 0,
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0,
            'fill-extrusion-height-transition': {
                duration: 1000,
            },
          },
    });

    // 원곡동
    map.addSource('wongok', {
        type: 'vector',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        url: 'mapbox://mila00a.7mohgpja'
    });
    map.addLayer({
        'id': 'mila00a.7mohgpja',
        'type': 'fill-extrusion',
        'source': 'wongok',
        'source-layer': 'wongok-1hvtxh',
        'paint': {
            'fill-extrusion-color': 'white',
            'fill-extrusion-height': 0,
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0,
            'fill-extrusion-height-transition': {
                duration: 1000,
            },
          },
    });

    // 추가한 layer를 road layer 밑으로 이동
    // map.moveLayer('mila00a.8sphyxbx', "road-path-bg");
    // map.moveLayer('mila00a.9nexet42', "road-path-bg");
    map.moveLayer('mila00a.8sphyxbx', "road-simple");
    map.moveLayer('mila00a.9nexet42', "road-simple");

    // 퍼센트 처리
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const pctValue = document.getElementById("pctVal");

    // 서울
    document.querySelector('#b1').addEventListener('click', function(e) {
        this.style.zIndex = -1;
        console.log('b1 clicked');
        animateValue(pctValue, 0, 12, 1000);
        map.flyTo({
            // These options control the ending camera position: centered at
            // the target, at zoom level 9, and north up.
            center: [126.991, 37.529],
            zoom: 10,
            bearing: 0,
             
            // These options control the flight curve, making it move
            // slowly and zoom out almost completely before starting
            // to pan.
            speed: 1.5, // make the flying slow
            curve: 1, // change the speed at which it zooms out
             
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: (t) => t,
             
            // this animation is considered essential with respect to prefers-reduced-motion
            essential: true
        });
        setTimeout(() => {
            map.setPaintProperty('mila00a.8sphyxbx', 'fill-extrusion-height', 1200);
            map.setPaintProperty('mila00a.8sphyxbx', 'fill-extrusion-opacity', 1);

        }, 1500);
    });

    // 안산
    document.querySelector('#b2').addEventListener('click', function(e) {
        this.style.zIndex = -1;
        animateValue(pctValue, 12, 25, 1000);
        map.setPaintProperty('mila00a.8sphyxbx', 'fill-extrusion-height', 0);
        setTimeout(() => map.setPaintProperty('mila00a.8sphyxbx', 'fill-extrusion-opacity', 0), 500);
        setTimeout(() => {
            map.flyTo({
                center: [126.715, 37.268],
                zoom: 9,
                bearing: 0,
                speed: 1, // make the flying slow
                curve: 1, // change the speed at which it zooms out
                easing: (t) => t,
                 
                // this animation is considered essential with respect to prefers-reduced-motion
                essential: true
            });
        }, 300);
        setTimeout(() => {
            map.flyTo({
                center: [126.715, 37.268],
                zoom: 11,
                bearing: 0,
                 
                speed: 1, // make the flying slow
                curve: 1, // change the speed at which it zooms out
                easing: (t) => t,
                 
                // this animation is considered essential with respect to prefers-reduced-motion
                essential: true
            });
        }, 500);
        setTimeout(() => { 
            map.setPaintProperty('mila00a.9nexet42', 'fill-extrusion-height', 1200);
            map.setPaintProperty('mila00a.9nexet42', 'fill-extrusion-opacity', 1);
        }, 1200);
        setTimeout(() => {
            map.flyTo({
                center: [126.715, 37.268],
                zoom: 11,
                bearing: 0,
                 
                speed: 1, // make the flying slow
                curve: 1, // change the speed at which it zooms out
                easing: (t) => t,
                 
                // this animation is considered essential with respect to prefers-reduced-motion
                essential: true
            });
        }, 500);
        console.log('b2 clicked');
    });

    // 원곡동
    document.querySelector('#b3').addEventListener('click', function(e) {
        this.style.zIndex = -1;
        map.setPaintProperty('mila00a.9nexet42', 'fill-extrusion-height', 0);
        setTimeout(() => map.setPaintProperty('mila00a.9nexet42', 'fill-extrusion-opacity', 0), 500);
        setTimeout(() => {
            map.flyTo({
                center: [126.793, 37.337],
                zoom: 12,
                bearing: 0,
                 
                speed: 1, // make the flying slow
                curve: 1, // change the speed at which it zooms out
                easing: (t) => t,
                 
                // this animation is considered essential with respect to prefers-reduced-motion
                essential: true
            });
        }, 700);
        setTimeout(() => {
            map.setPaintProperty('mila00a.7mohgpja', 'fill-extrusion-height', 1200);
            map.setPaintProperty('mila00a.7mohgpja', 'fill-extrusion-opacity', 1);
            animateValue(pctValue, 25, 73, 1000);
        }, 1000);
        console.log('b3 clicked');
    });

    // 원곡초
    document.querySelector('#b4').addEventListener('click', function(e) {
        this.style.zIndex = -1;
        map.setPaintProperty('mila00a.7mohgpja', 'fill-extrusion-height', 0);
        setTimeout(() => map.setPaintProperty('mila00a.7mohgpja', 'fill-extrusion-opacity', 0), 500);
        setTimeout(() => {
            map.flyTo({
                center: [126.796, 37.330],
                zoom: 18,
                bearing: 0,
                pitch: 60,
                speed: 2.5, // make the flying slow
                curve: 1, // change the speed at which it zooms out
                easing: (t) => t,
                
                // this animation is considered essential with respect to prefers-reduced-motion
                essential: true
            });
        }, 500);
        setTimeout(() =>{
            map.setPaintProperty('add-3d-buildings', 'fill-extrusion-height', 100);
            animateValue(pctValue, 73, 91, 1000);
        }, 2200);
        console.log('b4 clicked');
    });


    const layers = map.getStyle().layers;
    console.log(layers);
    // const labelLayerId = layers.find(
    //         (layer) => layer.type === 'symbol' && layer.layout['text-field']
    // ).id;

    // layer 제거
    // map.removeLayer('settlement-major-label');
    // map.removeLayer('settlement-minor-label');
    // map.removeLayer('settlement-subdivision-label');
    // map.removeLayer('natural-point-label');
    

    // 3d 건물 layer
    map.addLayer(
        {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#fff',
                
                // Use an 'interpolate' expression to
                // add a smooth transition effect to
                // the buildings as the user zooms in.
                'fill-extrusion-height': 0,
                // 'fill-extrusion-height': [
                //     'interpolate',
                //     ['linear'],
                //     ['zoom'],
                //     15,
                //     0,
                //     15.05,
                //     ['get', 'height']
                // ],
                // 'fill-extrusion-base': [
                //     'interpolate',
                //     ['linear'],
                //     ['zoom'],
                //     15,
                //     0,
                //     15.05,
                //     ['get', 'min_height']
                // ],
                'fill-extrusion-base': 5,
                'fill-extrusion-opacity': 1,
                'fill-extrusion-height-transition': {
                    duration: 1000
                },
            }
        },
        // labelLayerId
    );
});





// 가로 스크롤 interactive
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = window.innerWidth*2 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function tweenDash() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    console.log(i(0));
    return function(t) { return i(t) };
}

function transition(path) {
    path.transition()
        .duration(7500)
        .attrTween("stroke-dasharray", tweenDash)
        .on("end", () => path.call(transition));
}

function render() {
    console.log(window.pageYOffset);
    // path.attr('stroke-dasharray', calculateLength);

    window.requestAnimationFrame(render);
}

// window.requestAnimationFrame(render);


//Read the data
d3.csv("./AAPL.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.Date), close : d.Close }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.close; })])
      .range([ height, 0 ]);
    svg.append("g")
      .attr('fill', 'gray')
      .call(d3.axisLeft(y));


    // Add the line
    let path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "skyblue")
        .attr("stroke-width", 3)
        .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.close) })
        )
        .attr('opacity', 0);
    //    .attr('stroke-dasharray', '15 ,1763.913818359375');

       let strokeValue = d3.interpolateString("0," + path.node().getTotalLength(), path.node().getTotalLength() + "," + path.node().getTotalLength());
       console.log(strokeValue(0.9));

       let calc = d3.interpolateNumber(0, width - width/4);

       let wholeHeight = window.innerHeight * 3;

       const container = document.querySelector('#chartCon');

       let translateVal = 0;
       let accumVal = 0;
       container.addEventListener('wheel', function(event) {
           console.log(event.deltaY);
           accumVal += event.deltaY;
           console.log('check chartCon?');
           path.attr('opacity', 1)
                .attr('stroke-dasharray', strokeValue(accumVal/5000));

            svg
                .transition()
                .duration(100)
                .attr('transform', 'translate(' + (60-calc(accumVal/5000) + ', 0)'));
        })
})