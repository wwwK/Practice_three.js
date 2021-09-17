import * as THREE from '../node_modules/three/build/three.module.js';

function addModelToBG() {

    //Variables for setup
    let container;
    let camera;
    let renderer;
    let scene;
    let box;

    function init() {

      container = document.querySelector(".scene.one");

      //Create scene
      scene = new THREE.Scene();

      const fov = 35;
      const aspect = container.clientWidth/container.clientHeight;
      const near = 0.9;
      const far = 1000;

      //Camera setup
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


      //Renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true     // 투명도 포함?
      });

      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      container.appendChild(renderer.domElement);

      function render() {
        renderer.render(scene, camera);
      }

      // 큐브 생성
      var geometry = new THREE.BoxGeometry();
      var material = new THREE.MeshNormalMaterial();
      var box = new THREE.Mesh( geometry, material );
      box.scale.set(1.0, 1.0, 1.0);
      box.position.set(0.0, 0.0, 0.0);
      scene.add( box );
      animate();
    }


    function animate() {
      requestAnimationFrame(animate);
      
      renderer.render(scene, camera);
    }

    init();

    function onWindowResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener("resize", onWindowResize);
    

  gsap.registerPlugin(ScrollTrigger);
    
    scene.rotation.set(0, 1.88, 0)
    camera.position.set(2, 0, 5)


    let car_anim = gsap.timeline()


    // Full Height

    car_anim.to(scene.rotation, {y: 4.79, ease: "power1.inOut", scrollTrigger: {
        
        trigger: ".section-two",
        scrub: 1,

        endTrigger: ".section-four",
        end: "top bottom",

    }})


    // Slide 2

    car_anim.to(camera.position, {x: -0.1, ease: "power1.inOut", scrollTrigger: {
      
      trigger: ".section-two",
      scrub: 1,
      
      start: "top bottom",
      end: "top top",

    }}) 
    
    
    
    // Slide 3
    
    car_anim.to(scene.rotation, {z: 1.6, ease: "power1.inOut", scrollTrigger: {
      
      trigger: ".section-three",
      scrub: 1,

      start: "top bottom",
      end: "top top",

    }})

    


    // // Slide 4 - The problem child
    
    car_anim.to(scene.rotation, {z: 0.02, y: 3.1, ease: "power1.inOut", scrollTrigger: {
      
      trigger: ".section-four",
      scrub: 1,

      start: "top 50%",
      end: "top top",

    }})
       
    
    
    car_anim.to(camera.position, {x: 0.16, easing: Power1.easeInOut, scrollTrigger: {
      
      trigger: ".section-four",
      scrub: 1,

      start: "top top",
      end: "bottom top",

    }})
  }
  
  addModelToBG();