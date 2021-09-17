let mainSlider = document.querySelector('.main-slider');
let innerSliderOne = document.querySelector('.inner-slider-one');
let innerSliderTwo = document.querySelector('.inner-slider-two');
let images = [...document.querySelectorAll('svg')];
let imageItems = [];

let current = 0;
let target = 0;
let ease = 0.075;

window.addEventListener('resize', init);

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}

function init(){
    // 너비 만큼 스크롤 해야 하니까
    document.body.style.height = `${mainSlider.getBoundingClientRect().width - ( window.innerWidth - window.innerHeight)}px`;
}

function transformElement(el, transform){
    el.style.transform = transform;
}

let checkOnce = true;
function animate(){
    console.log(window.scrollY >= window.innerWidth-1);
    if (window.scrollY >= window.innerWidth - 1 && checkOnce) {
        cluster();
        checkOnce = false;
    }
    target = window.scrollY;
    current = lerp(current, target, ease).toFixed(2);
    // console.log(current);
    transformElement(mainSlider, `translate3d(${-current}px, 0, 0)`);
    transformElement(innerSliderTwo, `translate3d(${-(current* 1.1).toFixed(2)}px, 0, 0)`);

    for (let i = 0; i < imageItems.length; i++){
        imageItems[i].render();
        if(current < target - 50 || current > target + 50){
            transformElement(imageItems[i].el, `scale(0.8)`)
        }else{
            transformElement(imageItems[i].el, `scale(1)`)
        }
    }
    requestAnimationFrame(animate);
}



let options = {
    rootMargin: '0px',
    threshold: .9
}

class ImageItem{
    constructor(el){
        this.el = el;
        this.isVisible = false;
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => this.isVisible = entry.isIntersecting);
        }, options)
        this.observer.observe(this.el)
        this.current = 150;
        this.target = 150;
        this.ease = 0.1
        this.setDisplacement();
    }

    setDisplacement(){
        this.el.querySelector('feDisplacementMap').scale.baseVal = this.current;    
    }

    render(){

        if(this.isVisible && this.target != 0){
           this.target = 0;
            this.el.classList.add('active');
        }
        this.current = lerp(this.current, this.target, this.ease).toFixed(2);
        this.el.querySelector('feDisplacementMap').scale.baseVal = this.current;
        
    }
}


images.forEach(image => {
    imageItems.push(new ImageItem(image))
})


setTimeout(()=>{
    init();
    animate();
},1000)

// Cluster

function cluster() {
    console.log('inside cluster');
    var w = window.innerWidth, h = window.innerHeight;

    var radius = 9;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var centerScale = d3.scalePoint().padding(1).range([0, w/2]);     // 넓이만큼 배치
    var forceStrength = 0.1;

    var svg = d3.select("body").append("svg")
        .attr("width", w/2)
        .attr("height", h);

    // 시뮬레이션 생성
    var simulation = d3.forceSimulation()
        .force("collide", d3.forceCollide( function(d){
                    return d.r + 8 
                }).iterations(16) 
        )
        .force("charge", d3.forceManyBody())
        .force("y", d3.forceY().y(h / 2))
        .force("x", d3.forceX().x(w / 4));

    // 데이터 처리
    d3.csv("data.csv", function(data){
        data.forEach(function(d){
            d.r = radius;
            d.x = w / 2;
            d.y = h / 2;
        })
        
        console.table(data); 
        
        var circles = svg.selectAll("circle")
            .data(data, function(d){ return d.ID ;});
        
        var circlesEnter = circles.enter().append("circle")
            .attr("r", function(d, i){ return d.r; })
            .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
            .attr("cy", function(d, i){ return 250; })
            // .style("fill", function(d, i){ return color(d.Location); })
            // .style("stroke", function(d, i){ return color(d.Location); })
            .style("fill", function(d, i){ return color(0); })
            .style("stroke", function(d, i){ return color(0); })
            .style("stroke-width", 10)
            .style("pointer-events", "all");

        circles = circles.merge(circlesEnter)
        
        // 원래 위치?
        function ticked() {
            //console.log("tick")
            //console.log(data.map(function(d){ return d.x; }));
            circles
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; });
        }   

        simulation
            .nodes(data)
            .on("tick", ticked);
        
        // 나중에 
        function groupBubbles() {
            hideTitles();

            // @v4 Reset the 'x' force to draw the bubbles to the center.
            simulation.force('x', d3.forceX().strength(forceStrength).x(w / 2));

            // @v4 We can reset the alpha value and restart the simulation
            simulation.alpha(1).restart();
        }
        
        // 그룹 나누기
        function splitBubbles(byVar) {
        
            centerScale.domain(data.map(function(d){ return d[byVar]; }));

            console.log(byVar);

            d3.selectAll('circle')
                .style('fill', function(d, i){ return color( eval('d.' + byVar) )})
                .style('stroke', function(d, i){ return color( eval('d.' + byVar) )});
            
            if(byVar == "all"){
                hideTitles();
            } else {
                showTitles(byVar, centerScale);
            }
            
            // @v4 Reset the 'x' force to draw the bubbles to their year centers
            simulation.force('x', d3.forceX().strength(forceStrength).x(function(d){ 
                return centerScale(d[byVar]);
            }));

            // @v4 We can reset the alpha value and restart the simulation
            simulation.alpha(0.75).restart();
        }
        
        function hideTitles() {
            svg.selectAll('.title').remove();
        }

        function showTitles(byVar, scale) {
            // Another way to do this would be to create
            // the year texts once and then just hide them.
            var titles = svg.selectAll('.title')
                .data(scale.domain());
            
            titles.enter().append('text')
                .attr('class', 'title')
                .merge(titles)
                .attr('x', function (d) { return scale(d); })
                .attr('y', 40)
                .attr('text-anchor', 'middle')
                .text(function (d) { return byVar + ' ' + d; });
            
            titles.exit().remove() 
        }
    })
}
