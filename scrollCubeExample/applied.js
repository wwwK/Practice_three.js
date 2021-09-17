import * as THREE from '../node_modules/three/build/three.module.js';

// 변수
let container;
let camera;
let renderer;
let scene;
let box;

function threeSetup() {
    container = document.querySelector('.scene.one');

    //Create scene
    scene = new THREE.Scene();

    const fov = 90;     // field of view
    const aspect = container.clientWidth/container.clientHeight;    //비율(화면에 맞게)
    const near = 0.9;
    const far = 1000;

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


    //Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,  // 들쭉날쭉한 테두리를 없애주는 것
      alpha: true     // 투명도 포함
    });

    // 화면 크기에 맞게
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // 큐브 생성
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshNormalMaterial();
    var box = new THREE.Mesh( geometry, material );
    box.scale.set(1.0, 1.0, 1.0);
    box.position.set(0.0, 0.0, 0.0);

    var box2 = new THREE.Mesh( geometry, material );
    box2.scale.set(1.0, 1.0, 1.0);
    box2.position.set(-1.1, 0.0, 0.0);

    var box3 = new THREE.Mesh( geometry, material );
    box3.scale.set(1.0, 1.0, 1.0);
    box3.position.set(1.1, 0.0, 0.0);

    var box4 = new THREE.Mesh( geometry, material );
    box4.scale.set(1.0, 1.0, 1.0);
    box4.position.set(0.0, 1.1, 0.0);

    var box5 = new THREE.Mesh( geometry, material );
    box5.scale.set(1.0, 1.0, 1.0);
    box5.position.set(0.0, -1.1, 0.0);

    var box6 = new THREE.Mesh( geometry, material);
    box6.scale.set(1.0, 1.0, 1.0);
    box6.position.set(1.1, 1.1, 0.0);
    
    var box7 = new THREE.Mesh( geometry, material);
    box7.scale.set(1.0, 1.0, 1.0);
    box7.position.set(-1.1, 1.1, 0.0);

    var box8 = new THREE.Mesh( geometry, material);
    box8.scale.set(1.0, 1.0, 1.0);
    box8.position.set(1.1, -1.1, 0.0);

    var box9 = new THREE.Mesh( geometry, material);
    box9.scale.set(1.0, 1.0, 1.0);
    box9.position.set(-1.1, -1.1, 0.0);

    // left
    var boxl = new THREE.Mesh( geometry, material );
    boxl.scale.set(1.0, 1.0, 1.0);
    boxl.position.set(0.0, 0.0, -1.1);

    var boxl2 = new THREE.Mesh( geometry, material );
    boxl2.scale.set(1.0, 1.0, 1.0);
    boxl2.position.set(-1.1, 0.0, -1.1);

    var boxl3 = new THREE.Mesh( geometry, material );
    boxl3.scale.set(1.0, 1.0, 1.0);
    boxl3.position.set(1.1, 0.0, -1.1);

    var boxl4 = new THREE.Mesh( geometry, material );
    boxl4.scale.set(1.0, 1.0, 1.0);
    boxl4.position.set(0.0, 1.1, -1.1);

    var boxl5 = new THREE.Mesh( geometry, material );
    boxl5.scale.set(1.0, 1.0, 1.0);
    boxl5.position.set(0.0, -1.1, -1.1);

    var boxl6 = new THREE.Mesh( geometry, material);
    boxl6.scale.set(1.0, 1.0, 1.0);
    boxl6.position.set(1.1, 1.1, -1.1);
    
    var boxl7 = new THREE.Mesh( geometry, material);
    boxl7.scale.set(1.0, 1.0, 1.0);
    boxl7.position.set(-1.1, 1.1, -1.1);

    var boxl8 = new THREE.Mesh( geometry, material);
    boxl8.scale.set(1.0, 1.0, 1.0);
    boxl8.position.set(1.1, -1.1, -1.1);

    var boxl9 = new THREE.Mesh( geometry, material);
    boxl9.scale.set(1.0, 1.0, 1.0);
    boxl9.position.set(-1.1, -1.1, -1.1);

    // right
    var boxr = new THREE.Mesh( geometry, material );
    boxr.scale.set(1.0, 1.0, 1.0);
    boxr.position.set(0.0, 0.0, 1.1);

    var boxr2 = new THREE.Mesh( geometry, material );
    boxr2.scale.set(1.0, 1.0, 1.0);
    boxr2.position.set(-1.1, 0.0, 1.1);

    var boxr3 = new THREE.Mesh( geometry, material );
    boxr3.scale.set(1.0, 1.0, 1.0);
    boxr3.position.set(1.1, 0.0, 1.1);

    var boxr4 = new THREE.Mesh( geometry, material );
    boxr4.scale.set(1.0, 1.0, 1.0);
    boxr4.position.set(0.0, 1.1, 1.1);

    var boxr5 = new THREE.Mesh( geometry, material );
    boxr5.scale.set(1.0, 1.0, 1.0);
    boxr5.position.set(0.0, -1.1, 1.1);

    var boxr6 = new THREE.Mesh( geometry, material);
    boxr6.scale.set(1.0, 1.0, 1.0);
    boxr6.position.set(1.1, 1.1, 1.1);
    
    var boxr7 = new THREE.Mesh( geometry, material);
    boxr7.scale.set(1.0, 1.0, 1.0);
    boxr7.position.set(-1.1, 1.1, 1.1);

    var boxr8 = new THREE.Mesh( geometry, material);
    boxr8.scale.set(1.0, 1.0, 1.0);
    boxr8.position.set(1.1, -1.1, 1.1);

    var boxr9 = new THREE.Mesh( geometry, material);
    boxr9.scale.set(1.0, 1.0, 1.0);
    boxr9.position.set(-1.1, -1.1, 1.1);
    

    scene.add( box );
    scene.add( box2 );
    scene.add( box3 );
    scene.add( box4 );
    scene.add( box5 );
    scene.add( box6 );
    scene.add( box7 );
    scene.add( box8 );
    scene.add( box9 );

    scene.add( boxl );
    scene.add( boxl2 );
    scene.add( boxl3 );
    scene.add( boxl4 );
    scene.add( boxl5 );
    scene.add( boxl6 );
    scene.add( boxl7 );
    scene.add( boxl8 );
    scene.add( boxl9 );

    scene.add( boxr );
    scene.add( boxr2 );
    scene.add( boxr3 );
    scene.add( boxr4 );
    scene.add( boxr5 );
    scene.add( boxr6 );
    scene.add( boxr7 );
    scene.add( boxr8 );
    scene.add( boxr9 );

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// 반응형
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

threeSetup();
window.addEventListener('resize', onWindowResize);

// GSAP
gsap.registerPlugin(ScrollTrigger);

// scene.rotation.set(0.5, 0, 0);
scene.rotation.set(0, 0, 0);
camera.position.set(0, 0, 5);

let tl = gsap.timeline();

tl.to(scene.rotation, {y:15, z: 0, scrollTrigger: {
    trigger: ".section-one",
    scrub: 1,
    
    start: "center center",
    end: () => "+=" + container.clientHeight * 4, 
}}) 
