import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// 데이터 처리
d3.csv("data.csv", function(data){
    var w = window.innerWidth, h = window.innerHeight;

    var radius = 9;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var centerScale = d3.scalePoint().padding(1).range([0, w/2]);     // 넓이만큼 배치
    var forceStrength = 0.12;

    var svg = d3.select("body").append("svg")
        .attr("width", w/2)
        .attr("height", h);

    // 시뮬레이션 생성
    var simulation = d3.forceSimulation()
        .force("collide", d3.forceCollide( function(d){
                    return d.r + 7 
                }).iterations(16) 
        )
        .force("charge", d3.forceManyBody())
        .force("y", d3.forceY().y(h / 2))
        .force("x", d3.forceX().x(w / 4));

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
        .style("fill", function(d, i){ return 'transparent'; })
        .style("stroke", function(d, i){ return 'transparent'; })
        .style("stroke-width", 10)
        .style("pointer-events", "all");

    
    // 원래 위치?
    function ticked() {
        //console.log("tick")
        //console.log(data.map(function(d){ return d.x; }));
        circles
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; });
    }   

    circles = circles.merge(circlesEnter)
    simulation
        .nodes(data)
        .on("tick", ticked)
        .stop();    
    // 나중에 
    function groupBubbles() {
        hideTitles();

        // @v4 Reset the 'x' force to draw the bubbles to the center.
        simulation.force('x', d3.forceX().strength(forceStrength).x(w / 4));

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

    // 3d Globe
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/2/window.innerHeight, 0.1, 1000 );

    
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize( window.innerWidth/2, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Create a new ambient light
    var light = new THREE.AmbientLight( 0x888888 )
    scene.add( light )

    //Create a new directional light
    var light = new THREE.DirectionalLight( 0xfdfcf0, 1 )
    light.position.set(20,10,20)
    scene.add( light )

    const geometry = new THREE.SphereGeometry(3, 50, 50);
    const material = new THREE.MeshPhongMaterial( { 
        map: new THREE.TextureLoader().load('./test.jpg'),
        color: 0xaaaaaa,
        specular: 0xffff,
        shininess: 2
    } );
    const earth = new THREE.Mesh( geometry, material );
    scene.add( earth );

    camera.position.z = 10;
    camera.rotation.z = 0.8;

    let checkOnce = true;
    let checkOnce2 = true;
    let checkOnce3 = true;
    let checkOnce4 = true;
    function animate(){
        if (window.scrollY >= window.innerWidth - 10 && checkOnce) {
            console.log('why so slow');
            // simulation.restart();
            groupBubbles();
            setTimeout(() => {
                d3.selectAll('circle')
                    .style('fill', function(d, i){ return 'blue' })
                    .style('stroke', function(d, i){ return 'blue' });
            }, 200);
            checkOnce = false;
        }
        if (window.scrollY >= window.innerWidth * 2 - 10 && checkOnce2) {
            console.log('second point');
            splitBubbles('Group');
            checkOnce2 = false;
        }
        if (window.scrollY >= window.innerWidth * 3 - 10 && checkOnce3) {
            console.log('third point');
            // groupBubbles();
            // d3.selectAll('circle')
            //     .attr("r", function(d, i){ return 1; })
            //     .style('fill', function(d, i){ return 'gray' })
            //         .style('stroke', function(d, i){ return 'gray' });
            simulation.force('x', d3.forceX().strength(-1).x(w / 4));
                simulation.force('y', d3.forceY().strength(-1).y(h / 2));
                d3.selectAll('circle')
                    .attr("r", function(d, i){ return 2; })
                    .style("fill", function(d, i){ return 'gray'; })
                    .style("stroke", function(d, i){ return 'none'; });
            setTimeout(() => {
                d3.selectAll('circle')
                    .style("fill", function(d, i){ return 'none'; });
            }, 1000);
            checkOnce3 = false;
        }

        var render = function(actions) {
            renderer.render(scene, camera);
            earth.rotation.y += 0.01;
            requestAnimationFrame(render);
        };

        if (window.scrollY >= window.innerWidth * 4 - 10 && checkOnce4) {
            render();
            checkOnce4 = false;
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

    setTimeout(()=>{
        init();
        animate();
    },1000);
});


// Dot Animation
const width = window.innerWidth;
const height = window.innerHeight;

// animation settings
const duration = 3000;

//different ease options
const eases = [ d3.easeCubic ];
let timer;
let currLayout = 1;
let currEase = 0;

//draw each point to the canvas as a circle
function draw( t, points ) {
  ctx.save();
  ctx.clearRect( 0, 0, width, height );
  for (let i = 0; i < points.length; ++i) {
    const point = points[i];
    const radius = 2;
    ctx.beginPath();
    ctx.arc( point.x, point.y, radius, 0, 2*Math.PI, false );
    ctx.closePath();
    ctx.fillStyle = "#bbbbbb";
    ctx.fill()
  }

  ctx.restore();
}


function animate( oldPoints, newPoints, layouts, eases ) {
    // store the source position
    const points = [];
    const shuffledNewPoints = d3.shuffle( newPoints );

    // 지금은 포인트 개수가 같아야 오류 없음
    oldPoints.forEach(( point, i ) => {
        let newPoint = {};
        newPoint.sx = point.x;
        newPoint.sy = point.y;
        // console.log(shuffledNewPoints[i]);
        newPoint.x = newPoint.tx = shuffledNewPoints[i].x;
        newPoint.y = newPoint.ty = shuffledNewPoints[i].y;
        points.push( newPoint );
    });

    let ease = eases[ currEase ];
    timer = d3.timer(( elapsed ) => {
        // compute how far through the animation we are (0 to 1)
        const t = Math.min(1, ease( elapsed / duration ));
        // update point positions (interpolate between source and target)
        points.forEach(point => {
            point.x = point.sx * (1 - t) + point.tx * t;
            point.y = point.sy * (1 - t) + point.ty * t;
        });

        // update what is drawn on screen
        draw( t, points );

        // if this animation is over
        if (t === 1) {
            // stop this timer for this layout and start a new one
            timer.stop();

            // update to use next layout
            currLayout = (currLayout + 1) % layouts.length;
            currEase = ( currEase + 1) % eases.length;

            // start animation for next layout
            setTimeout(animate, 1500, points, layouts[currLayout], layouts, eases );
        }
    });
}

const screenScale = window.devicePixelRatio || 1;
const canvas = d3.select('.canvas')
    .attr( 'width', width * screenScale)
    .attr( 'height', height * screenScale )
    .style( 'width', `${width}px` )
    .style( 'height', `${height}px` )

canvas.node().getContext( '2d' ).scale( screenScale, screenScale );

const ctx = canvas.node().getContext( '2d' );
ctx.globalAlpha = 0.8;

d3.json( "./coordinates-test.json", data => {
    const layouts = [];
    Object.keys( data ).forEach( key => {
        let layout = [];
        data[ key ].forEach( point => {
            layout.push({
                x: point[0],
                y: point[1]
            });
        });
        layouts.push( layout );
    });

    animate( layouts[0], layouts[1], layouts, eases );
});
