//початкове налаштування сцени
function init() 
{
	scene = new THREE.Scene();//створення сцени

	var WIDTH = window.innerWidth, 
	HEIGHT = window.innerHeight;

	renderer = new THREE.WebGLRenderer({antialias: true}); //створення рендеру
	renderer.setSize(WIDTH, HEIGHT); //масштабування холсту до розміру вікна
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, WIDTH/ HEIGHT, 0.1, 20000);
	scene.add(camera); //розміщення камери на сцені
	camera.position.set(0, 6, 0); //підняти камеру
	
	window.addEventListener('resize', 
		function() {
	        var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
	        renderer.setSize(WIDTH, HEIGHT);
	        camera.aspect = WIDTH/HEIGHT;
	        camera.updateProjectMatrix();
	}
	);

	renderer.setClearColor(0x333F47, 1); //встановити колір фону холсту
	
	var light = new THREE.PointLight(0xffffff);
	light.position.set(-100, 200, 100);
	scene.add(light);

	var loader = new THREE.TextureLoader();

	var cylgeometry = new THREE.CylinderGeometry(3, 3, 7, 7);
	var cylmaterial = new THREE.MeshLambertMaterial({map: loader.load('https://miro.medium.com/max/500/1*EfrA-xGTH8P_6atGYgx-0Q.jpeg')});
	var cylmesh = new THREE.Mesh(cylgeometry, cylmaterial);
		cylmesh.position.set(0.9, -5, -6);
	    scene.add(cylmesh);
		
var cubematerials = [
    new THREE.MeshBasicMaterial({map: loader.load(
    	'https://farm1.staticflickr.com/854/42936929215_efa87c8a9a_b.jpg')}),new THREE.MeshBasicMaterial({map: loader.load(
    	'https://farm1.staticflickr.com/514/18832759790_bed1aeece8_b.jpg')}),new THREE.MeshBasicMaterial({map: loader.load(
    	'https://farm7.staticflickr.com/6140/5934453114_3675350a78_b.jpg')}), new THREE.MeshBasicMaterial({map: loader.load(
        'https://farm3.static.flickr.com/2342/2269094999_6ac65c0947.jpg')}),new THREE.MeshBasicMaterial({map: loader.load(
        'https://live.staticflickr.com/1757/41821018565_614db58ddc_b.jpg')}),new THREE.MeshBasicMaterial({map: loader.load(
        'https://live.staticflickr.com/3103/2420240470_bc0bb7a260.jpg')}),
];
var cubegeometry = new THREE.BoxGeometry(3, 4, 3, 4);
var cubemesh = new THREE.Mesh(cubegeometry, cubematerials);
cubemesh.position.set(-1, -3, -2);
scene.add(cubemesh);

	controls = new THREE.OrbitControls(camera,renderer.domElement);

}



function animate()
{
 controls.update();
 renderer.render(scene, camera);
 requestAnimationFrame(animate);	
}
