const scene = new THREE.Scene();
const camera = createCamera();
const renderer = createRenderer();

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

addLighting(scene);

addGround(scene);
const door = addDoor(scene);
addGeometricObjects(scene);

const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('textures/background.jpg');
scene.background = backgroundTexture;

animate();

window.addEventListener('resize', onWindowResize);

function createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    return camera;
}

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    return renderer;
}

function addLighting(scene) {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    light.castShadow = true;
    scene.add(light);
}

function addGround(scene) {
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);
}

function addDoor(scene) {
    const textureLoader = new THREE.TextureLoader();
    const doorTexture = textureLoader.load('textures/wood.jpg');
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ map: doorTexture });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.y = 1;
    door.castShadow = true;
    scene.add(door);
    return door;
}

function addGeometricObjects(scene) {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-2, 0.5, 0);
    cube.castShadow = true;
    scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(2, 0.5, 0);
    sphere.castShadow = true;
    scene.add(sphere);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function resizeDoor(door, width, height) {
    door.scale.set(width, height, 1);
}
