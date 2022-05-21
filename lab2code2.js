var arToolkitContext=false;
var scene, camera;

function init_three()
{
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  //renderer.setClearColor(new THREE.Color('lightgrey'), 0);

  renderer.setSize(window.innerWidth, window.innerHeight); // <canvas> - "розтягування" холста до розмірів вікна
  document.body.appendChild(renderer.domElement); // додавання холста до документа

  scene = new THREE.Scene();
  // Create a camera
  camera = new THREE.Camera();
    camera.position.set (0,0,250);
  camera.rotation.set(0,270,270);
  scene.add(camera);

  var loader = new THREE.TextureLoader();

  //LHC
  var torus_geometry = new THREE.TorusGeometry(100, 20, 160, 500);
  var torus_texture = new THREE.MeshBasicMaterial({map: loader.load('https://ichef.bbci.co.uk/news/640/cpsprodpb/5906/production/_124209722_higgs-simulation.jpg'), transparent: true, opacity: 0.3});
  var torus = new THREE.Mesh(torus_geometry, torus_texture);
  scene.add(torus);
  //Proton2
  var sphere_geometry = new THREE.SphereGeometry(8,32,16);
  var sphere_material=new THREE.MeshToonMaterial({color: 0x0099ff});
  var sphere = new THREE.Mesh(sphere_geometry,sphere_material);
  sphere.position.x = 100;
  scene.add(sphere);

 //Proton1
  var proton_geometry = new THREE.SphereGeometry(8,32,16);
  var proton_material=new THREE.MeshLambertMaterial({color: 0x0099ff});
  var proton= new THREE.Mesh(proton_geometry,proton_material);
  proton.position.x = -100;
  scene.add(proton);

scene.visible = false

requestAnimationFrame(animate);
}


function onResize() 
{
  arToolkitSource.onResizeElement()
  arToolkitSource.copyElementSizeTo(renderer.domElement)
  if (window.arToolkitContext.arController !== null) {
    arToolkitSource.copyElementSizeTo(window.arToolkitContext.arController.canvas)
  }
}


function initARContext() 
{ // create atToolkitContext
  arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: "https://raw.githack.com/AR-js-org/AR.js/master/data/data/camera_para.dat",
    detectionMode: 'mono'
  })

  // initialize it
  arToolkitContext.init(() => { // copy projection matrix to camera
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    arToolkitContext.arController.orientation = 'landscape';
    arToolkitContext.arController.options.orientation = 'landscape';
    console.log('arToolkitContext', arToolkitContext);
    window.arToolkitContext = arToolkitContext;
  })

  arMarkerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    type: 'pattern',
    patternUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/data/data/patt.hiro',
    changeMatrixMode: 'cameraTransformMatrix'
  })

  console.log('ArMarkerControls', arMarkerControls);
  window.arMarkerControls = arMarkerControls;
}

function onReady() 
{
  arToolkitSource.domElement.addEventListener('canplay', () => {
    console.log("Камера працює");
    initARContext();
  });
  window.arToolkitSource = arToolkitSource;
  setTimeout(() => { onResize() }, 100);
}


function init_ar()
{
  arToolkitSource = new THREEx.ArToolkitSource({sourceType: 'webcam', sourceWidth: 640, sourceHeight: 480})

  arToolkitSource.init(onReady);

  window.addEventListener('resize', function () {
    onResize()
  })

}
  //Animate
//Animate
var t = 0;
function animate() 
{
   //Proton2
  var sphere_geometry = new THREE.SphereGeometry(8,32,16);
  var sphere_material=new THREE.MeshToonMaterial({color: 0x0099ff});
  var sphere = new THREE.Mesh(sphere_geometry,sphere_material);
  sphere.position.x = 100;
  scene.add(sphere);

 //Proton1
  var proton_geometry = new THREE.SphereGeometry(8,32,16);
  var proton_material=new THREE.MeshLambertMaterial({color: 0x0099ff});
  var proton= new THREE.Mesh(proton_geometry,proton_material);
  proton.position.x = -100;
  scene.add(proton);

requestAnimationFrame(animate);

  if (!arToolkitContext || !arToolkitSource || !arToolkitSource.ready) {
    return;
  }

  arToolkitContext.update(arToolkitSource.domElement)

  // update scene.visible if the marker is seen
  scene.visible = camera.visible

 t += 0.1;
    sphere.position.y = 100*Math.cos(t);
    sphere.position.x = 100*Math.sin(t);
    proton.position.y = 100*Math.sin(t);
    proton.position.x = 100*Math.cos(t);

  renderer.render(scene, camera);
}
