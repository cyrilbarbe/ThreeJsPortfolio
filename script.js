var container;
var camera;
var renderer;
var scene;
var house;

// variable pour dat gui
const gui = new dat.GUI();


function init(){
  container =  document.querySelector('.scene');
  scene = new THREE.Scene();
  
  var fov = 35;
  var aspect = container.clientWidth / container.clientHeight;
  var near = 0.1;
  var far = 500;
  
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(25, -25, 60);
  camera.rotation.set(.2,0,.1);
  scene.rotation.set(0,63.2,.2);
  // Position de ma scene
  scene.position.set(110,0,-230);
    // TAille de ma scene
  scene.scale.set(35,35,35);
  
  
  //lumiere
  
  var ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);
  
  var light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);
  
  var light2 = new THREE.DirectionalLight(0xfff222, 0.4);
  light.position.set(-150, 50, 100);
  scene.add(light2);
  
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  container.appendChild(renderer.domElement);
  
  
  var loader = new THREE.GLTFLoader();
  loader.load('./3d/scene.gltf', function(gltf){
    
    scene.add(gltf.scene);
    renderer.render(scene, camera);
    house = gltf.scene;
    
    
    animate();
  });
  //Debug dat gui
  //valeur minimal/MAximal/ les paliers
  
  
  gui.add(scene.position,'x',-255, 255,0.5).name('position X');
  gui.add(scene.position,'y',-255, 255,1).name('position Y');
  gui.add(scene.position,'z',-255, 255,1).name('position Z');
  
  
  gui.add(scene.scale,'x',-255, 255,1).name('Taille Axe des X');
  gui.add(scene.scale,'y',-255, 255,1).name('Taille Axe des Y');
  gui.add(scene.scale,'z',-255, 255,1).name('Taille Axe des Z');
  
//   gui.add(scene.rotation,'x',0,2).name('RotationAxe des X');
//   gui.add(scene.rotation,'y',0,2).name('Rotaiton Axe des Y');
//   gui.add(scene.rotation,'z',0,2).name('Rotation Axe des Z');
  

  // gui.add (camera.position, 'x',-255, 255,).name('camX');
}
  
  // Animation
  var step = 0
  function animate() {
  requestAnimationFrame(animate);
  step += 0.0001;
  house.position.y = 1 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);

}
window.onload = function(){

var iphoneX = window.matchMedia("(max-width:376px)");
var iPad = window.matchMedia("(max-width:809px)");

  window.addEventListener('resize', function(){

    
    if(iphoneX.matches) {
      scene.position.set(50,-13,-255);
      scene.scale.set(30,30,30);
    console.log("Je me resize");
  
  


  } else if (iPad.matches) {
    console.log("Ipad");
    scene.position.set(30,8,-255);
  }

});

}

init();



//slider
const mesPhotos = document.querySelectorAll('img');
const nbSlide = mesPhotos.length;
const suivant = document.querySelector('.right');
const precedent = document.querySelector('.left');
let compte = 0;

function slideSuivante(){
    mesPhotos[compte].classList.remove('active');

    if(compte < nbSlide - 1){
        compte++;
    } else {
        compte = 0;
    }

    mesPhotos[compte].classList.add('active')
    console.log(compte);
    
}
suivant.addEventListener('click', slideSuivante)


function slidePrecedente(){
    mesPhotos[compte].classList.remove('active');

    if(compte > 0){
        compte--;
    } else {
        compte = nbSlide - 1;
    }

    mesPhotos[compte].classList.add('active')
    // console.log(compte);
    
}
precedent.addEventListener('click', slidePrecedente)
