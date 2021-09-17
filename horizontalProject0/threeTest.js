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
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 5);
var renderer = new THREE.WebGLRenderer({alpha: false});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create a new ambient light
var light = new THREE.AmbientLight( 0xffffff )
scene.add( light )

  
// var light = new THREE.PointLight(0xffffff);
//     light.position.set(0,250,0);
//     scene.add(light);

var vShader = document.querySelector('#vertexShader');
var fShader = document.querySelector('#fragmentShader');
var shaderMaterial =
  new THREE.ShaderMaterial({
    vertexShader:   vShader.textContent,
    fragmentShader: fShader.textContent
  });

var radius = 1;
const material = new THREE.MeshPhongMaterial( { 
    map: new THREE.TextureLoader().load('./2k_earth_nightmap.jpg'),
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 5,
} );

var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 24), material);

// materialGroup.add(sphere);
// materialGroup.add(new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 24), shaderMaterial));
// var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 24), new THREE.MeshBasicMaterial({color: "gray", wireframe: true}));

scene.add(sphere);
// scene.add(materialGroup);


var box = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.5), new THREE.MeshBasicMaterial({color: "red"}));
var box2 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.5), new THREE.MeshBasicMaterial({color: "yellow"}));
var box3 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.5), new THREE.MeshBasicMaterial({color: "blue"}));

var boxContainer = new THREE.Object3D();
boxContainer.add(box);
boxContainer.add(box2);
boxContainer.add(box3);

// function calcPosFromLatLonRad(radius, lat, lon) {

//   var spherical = new THREE.Spherical(
//     radius,
//     THREE.Math.degToRad(90 - lon),
//     THREE.Math.degToRad(lat)
//   );

//   var vector = new THREE.Vector3();
//   vector.setFromSpherical(spherical);

//   console.log(vector.x, vector.y, vector.z);
//   return vector;
// }

// calcPosFromLatLonRad(0.5, -74.00597, 40.71427);

// const phi = (90 - 35.9078) * Math.PI / 180;
// const theta = (180 - (127.7669)) * Math.PI / 180;

// box.position.x = radius * Math.sin(phi) * Math.cos(theta);
// box.position.y = radius * Math.cos(phi);
// box.position.z = radius * Math.sin(phi) * Math.sin(theta);

let coordinates = [
  [36.2048, 138.2529],
  [35.9078, 127.7669]
];

box.position.setFromSphericalCoords(radius + 0.1, THREE.Math.degToRad(90 - (-33.865143)), THREE.Math.degToRad(151.209900));
box2.position.setFromSphericalCoords(radius + 0.1, THREE.Math.degToRad(90 - (-33.865143)), THREE.Math.degToRad(1.209900));
box3.position.setFromSphericalCoords(radius + 0.1, THREE.Math.degToRad(90 - (53.865143)), THREE.Math.degToRad(1.209900));


scene.add(boxContainer);

sphere.rotation.y = -1.5;


render();
function render(){
  requestAnimationFrame(render);
  //TWEEN.update();

  sphere.rotation.y += 0.01;
  boxContainer.rotation.y += 0.01;

  renderer.render(scene, camera);
}

