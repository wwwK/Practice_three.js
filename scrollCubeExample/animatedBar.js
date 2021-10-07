// import * as THREE from '../node_modules/three/build/three.module.js';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';


// const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 0, 0);
// controls.update();

// 변수
let container;
let camera;
let renderer;
let scene;
let box;
let box2;
let elem;
let elem2;

function threeSetup() {
    // container = document.querySelector('body');

    const canvas = document.querySelector('#c');

    //Create scene
    scene = new THREE.Scene();

    const fov = 90;     // field of view
    const aspect = canvas.clientWidth/canvas.clientHeight;    //비율(화면에 맞게)
    const near = 0.9;
    const far = 1000;

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


    //Renderer
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,  // 들쭉날쭉한 테두리를 없애주는 것
        alpha: true     // 투명도 포함
    });

    // 화면 크기에 맞게
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // container.appendChild(renderer.domElement);

    scene.rotation.set(0, 0, 0);
    camera.position.set(0, 2, 5);

    // 큐브 생성
    var geometry = new THREE.BoxGeometry();
    geometry.translate( 0, 0.5, 0 );
    var material = new THREE.MeshPhongMaterial({ color: 0x070fb0});
    let material2 = new THREE.MeshPhongMaterial({color: 0x4507b0});
    // var material = new THREE.MeshNormalMaterial();
    // const material = new THREE.MeshLambertMaterial({
    //     color: 0xFF0000,    
    //   });
    // var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
    box = new THREE.Mesh( geometry, material2 );
    box.scale.set(0.7, 0.0, 0.7);
    box.position.set(-1, 0.0, 0.0);

    const tempV = new THREE.Vector3();
    box.updateWorldMatrix(true, false);
    console.log(box.getWorldPosition(tempV));
    box.getWorldPosition(tempV);
    
    camera.updateMatrixWorld();
    tempV.project(camera);
    console.log(tempV);

    const x = (tempV.x *  .5 + .5) * canvas.clientWidth;
    const y = (tempV.y * -.5 + .5) * canvas.clientHeight;

    const labelContainerElem = document.querySelector('#labels');
    elem = document.createElement('div');
    elem.textContent = 'First';
    labelContainerElem.appendChild(elem);

    console.log(x, y);

    elem.style.transform = `translate(-50%, 50%) translate(${x}px, ${y+30}px)`;
    
    box2 = new THREE.Mesh( geometry, material );
    box2.scale.set(0.7, 0.0, 0.7);
    box2.position.set(1, 0.0, -0.5);

    elem2 = document.createElement('div');
    elem2.textContent = 'Second';
    labelContainerElem.appendChild(elem2);

    const tempV2 = new THREE.Vector3();
    box2.updateWorldMatrix(true, false);
    console.log(box2.getWorldPosition(tempV2));
    box2.getWorldPosition(tempV2);
    
    camera.updateMatrixWorld();
    tempV2.project(camera);
    console.log(tempV2);

    const x2 = (tempV2.x *  .5 + .5) * canvas.clientWidth;
    const y2 = (tempV2.y * -.5 + .5) * canvas.clientHeight;

    elem2.style.transform = `translate(-50%, 50%) translate(${x2}px, ${y2+30}px)`;
    
    const color1 = 0xFFFFFF;
    const intensity1 = 0.5;
    const light1= new THREE.AmbientLight(color1, intensity1);
    scene.add(light1);

    const color = 0xFFFFFF;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);

    scene.add( box );
    scene.add( box2 );
    
    

    animate();
}

let idx = 0;
let animatedVal = 0;
let pctValues = [
    [95, 5],
    [88, 12],
    [18, 82],
    [8, 92],
]

let leftText = document.querySelector('#left');
let rightText = document.querySelector('#right');

let initialSetting = true;
function animate() {
    console.log('inside animate, idx is ' + idx);
    animatedVal += 0.01;
    box.rotation.y += 0.02;
    box2.rotation.y += 0.02;
    // if (animatedVal < 5) {
    //     box.scale.y += 0.01;
    //     box2.scale.y += 0.01;
    // }
    if (idx === 0 && !initialSetting) {
        if (box.scale.y < 0.06 * pctValues[idx][0]) {
            box.scale.y += 0.05;
            elem.textContent = Math.floor(box.scale.y / 0.06);
        }
    
        if (box2.scale.y > 0.06 * pctValues[idx][1]) {
            box2.scale.y -= 0.05;
            elem2.textContent = Math.floor(box2.scale.y / 0.06);
        }
    }
    if (initialSetting) {
        if (box.scale.y < 0.06 * pctValues[idx][0]) {
            box.scale.y += 0.05;
            elem.textContent = Math.floor(box.scale.y / 0.06);
        }
    
        if (box2.scale.y < 0.06 * pctValues[idx][1]) {
            box2.scale.y += 0.05;
            elem2.textContent = Math.floor(box2.scale.y / 0.06);
        }

        if (box.scale.y >= 0.05 * pctValues[idx][0]) {
            initialSetting = false;
        }
    }
    else {
        if (box.scale.y > 0.06 * pctValues[idx][0]) {
            box.scale.y -= 0.05;
            elem.textContent = Math.floor(box.scale.y / 0.06);
        }
        if (box2.scale.y < 0.06 * pctValues[idx][1]) {
            box2.scale.y += 0.05;
            elem2.textContent = Math.floor(box2.scale.y / 0.06);
        }
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

let testBtn = document.querySelector('.button');
testBtn.addEventListener('click', handleAnim);

function handleAnim() {
    console.log(idx);
    idx += 1;
    if (idx >3) idx = 0;
}

// 반응형
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

threeSetup();
window.addEventListener('resize', onWindowResize);