// import * as THREE from '../node_modules/three/build/three.module.js';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';

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
    box.scale.set(1.0, 5.0, 1.0);
    box.position.set(1, 0.0, 0.0);

    var box2 = new THREE.Mesh( geometry, material );
    box2.scale.set(1.0, 3.0, 1.0);
    box2.position.set(-1, -1.0, 0.0);
    

    scene.add( box );
    scene.add( box2 );
    

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
