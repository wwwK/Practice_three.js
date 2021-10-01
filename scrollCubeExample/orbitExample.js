import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';

var camera, scene, renderer;
var geometry, material, mesh;
var plane;
var orbit;

init();
animate();


function init() {
	
  	//standard three.js stuff
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    
    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    mesh.position.y += 0.1;
    scene.add( mesh );
    
    // plane = new THREE.Mesh( 
    // 	new THREE.PlaneGeometry(10, 10),
    //   new THREE.MeshBasicMaterial({color:'grey'})      
    // );
    // plane.rotateX(-Math.PI/2);
    // scene.add(plane);
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    
    ///////////////////////////////////////
    //requestPointerLock is not working in an iframe
    //https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API    
    //renderer.domElement.onclick = function(){document.requestPointerLock()}  

    document.addEventListener('mousemove', function(e){
    	let scale = -0.01;
    	orbit.rotateY( e.movementX * scale );
      orbit.rotateX( e.movementY * scale ); 
      orbit.rotation.z = 0; //this is important to keep the camera level..
    })
    
    //the camera rotation pivot
    orbit = new THREE.Object3D();
    orbit.rotation.order = "YXZ"; //this is important to keep level, so Z should be the last axis to rotate in order...
    orbit.position.copy( mesh.position );
    scene.add(orbit );
    
    //offset the camera and add it to the pivot
    //you could adapt the code so that you can 'zoom' by changing the z value in camera.position in a mousewheel event..
    let cameraDistance = 1;
		camera.position.z = cameraDistance;
    orbit.add( camera );
    
		

}

function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}