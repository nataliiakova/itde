//початкове налаштування сцени
function init() 
{
	scene = new THREE.Scene();//створення сцени

	var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

	renderer = new THREE.WebGLRenderer({antialias: true}); //створення рендеру

	renderer.setSize(WIDTH, HEIGHT); //масштабування холсту до розміру вікна

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, 1/1 /*WIDTH/ HEIGHT*/, 0.1, 20000);
	camera.position.set(0, 6, 0); //підняти камеру
	scene.add(camera); //розміщення камери на сцені
	
	window.addEventListener('resize', function() {
	        var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
	        renderer.setSize(WIDTH, HEIGHT);
	        camera.aspect = WIDTH / HEIGHT;
	        camera.updateProjectMatrix();
	});
	
	var loader = new THREE.TextureLoader();

	renderer.setClearColor(0x333F47, 1); //встановити колір фону холсту
	
	var light = new THREE.PointLight(0xffffff);
	light.position.set(-100, 200, 100);
	scene.add(light);
        
	var cylgeometry = new THREE.CylinderGeometry(3, 3, 7, 7);
	loader.load ("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/disturb.jpg", (texture) => {
		var cylmaterial = new THREE.MeshLambertMaterial({
			map: texture,
		});
		var cylmesh = new THREE.Mesh(cylgeometry, cylmaterial);
		cylmesh.position.set(0.9, -5, -6);
	    scene.add(cylmesh);
	});

	controls = new THREE.OrbitControls(camera,renderer.domElement);
}



function animate()
{
 controls.update();
 renderer.render(scene, camera);
 requestAnimationFrame(animate);	
}
