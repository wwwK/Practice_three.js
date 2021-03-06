import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';

///////////////////////
// Initial Variables //
///////////////////////

// Values
var tick = 0;
var size = 0.25;

var red = 0xff0000;
var blue = 0x1176c5;
var white = 0xf9f9f9;

// Arrays
var bar = new Array();

let scene;
let camera;
let renderer;

///////////////////////
// Initial Setup     //
///////////////////////

init();

function init() {
    initListeners();
    init3DScene();
}

function initListeners() {
    window.addEventListener('resize', onWindowResize);
}

function init3DScene() {
    // Setup Scene / Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 2000);

    camera.position.set(100, 100, 100);
    camera.lookAt(new THREE.Vector3(20, 40, 0));

    // Setup Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    document.querySelector('body').appendChild(renderer.domElement);

    init3DElements();
}

function init3DElements() {
    createFloor();

    createBar(5, -25, red);
    createBar(5, -20, red);
    createBar(5, -15, white);
    createBar(5, -10, white);
    createBar(5, -5, blue);
    createBar(5, 0, blue);

    createLight();
}

///////////////////////
// Interactions      //
///////////////////////

function onWindowResize() {
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

///////////////////////
// Create Elements   //
///////////////////////

function createLight() {
    var ambient = new THREE.AmbientLight(0x999999);
    var spot = new THREE.SpotLight({
        color: 0xffffff,
        intensity: 0.1
    });

    spot.position.set(-50, 100, 100);
    spot.castShadow = true;

    scene.add(ambient, spot);
}

function createBar(total, z, colour) {

    for (var i = 0; i < total; i += 1) {

        var geometry = new THREE.BoxGeometry(2, 2, 2);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1, z));

        var material = new THREE.MeshPhongMaterial({
            color: colour
        });

        let id = new THREE.Mesh(geometry, material);

        id.position.x = i * 5;
        id.name = "bar-" + i;
        id.castShadow = true;
        id.receiveShadow = true;

        scene.add(id);
        bar.push(id);

        let selectedBar = bar[Math.floor(bar.length / 2)];
    }
    for (var i = 0; i < bar.length; i++) {
  
		var tween = new TweenMax.to(bar[i].scale, 1, {
  
		  ease: Elastic.easeOut.config(1, 1),
  
		  y: Math.random() * 30 /*i+1*/ ,
		  delay: i * 0.25
  
		});
    }
}

function createFloor() {
  
    var geometry = new THREE.BoxGeometry(2000, 2000, 2000);
    var material = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        shininess: 20
    });
    material.side = THREE.BackSide

    let floor = new THREE.Mesh(geometry, material);

    floor.position.set(0, 1000, 0);
    floor.rotation.x = THREE.Math.degToRad(-90);

    floor.receiveShadow = true;

    scene.add(floor);
}

///////////////////////
// Render            //
///////////////////////

function render() {

    tick++;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

render();