import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );


// // Create a new ambient light
// var light = new THREE.AmbientLight( 0x888888 )
// scene.add( light )

// //Create a new directional light
// var light = new THREE.DirectionalLight( 0xfdfcf0, 1 )
// light.position.set(20,10,20)
// scene.add( light )

// const geometry = new THREE.SphereGeometry(3, 50, 50);
// const material = new THREE.MeshPhongMaterial( { 
//     map: new THREE.TextureLoader().load('./test.jpg'),
//     color: 0xaaaaaa,
//     specular: 0xffff,
//     shininess: 2
// } );
// const earth = new THREE.Mesh( geometry, material );
// scene.add( earth );

// camera.position.z = 10;
// camera.rotation.z = 0.8;

// var render = function(actions) {
//     renderer.render(scene, camera);

//     earth.rotation.y += 0.01;

//     requestAnimationFrame(render);
// };
// render();



// @author prisoner849, espace3d

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 5);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// var controls = new THREE.OrbitControls(camera, renderer.domElement);

var radius = 1;
var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 24), new THREE.MeshBasicMaterial({color: "gray", wireframe: true}));
scene.add(sphere);

var box = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({color: "red", wireframe: true}));
box.position.setFromSphericalCoords(radius + 0.1, THREE.Math.degToRad(23), THREE.Math.degToRad(23));
box.lookAt(sphere.position);
scene.add(box);


render();
function render(){
  requestAnimationFrame(render);
  //TWEEN.update();
  renderer.render(scene, camera);
}

