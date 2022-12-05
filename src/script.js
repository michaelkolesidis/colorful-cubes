import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

/**
 * Colors
 */
const color1 = 0x540d6e;
const color2 = 0xee4266;
const color3 = 0xffd23f;
const color4 = 0x3bceac;
const color5 = 0x0ead69;
// Color palette: https://coolors.co/540d6e-ee4266-ffd23f-3bceac-0ead69

/**
 * Objects
 */
// Math.floor(Math.random() * (max - min) + min)
const numOfCubes = 1000;

for (let i = 0; i < numOfCubes; i++) {
  const geometry = new THREE.BoxBufferGeometry(10, 10, 10);

  let cubeColor;
  const randomNumber = Math.floor(Math.random() * 4 + 1);
  console.log(randomNumber)
  switch (randomNumber) {
    case 1:
      cubeColor = color1;
      break;
    case 2:
      cubeColor = color2;
      break;
    case 3:
      cubeColor = color3;
      break;
    case 4:
      cubeColor = color4;
      break;
    case 5:
      cubeColor = color5;
      break;
  }

  const material = new THREE.MeshBasicMaterial({
    color: cubeColor,
  });
  const mesh = new THREE.Mesh(geometry, material);
  const x = Math.floor(Math.random() * (200 - -200) + -200);
  const y = Math.floor(Math.random() * (200 - -200) + -200);
  const z = Math.floor(Math.random() * (18 - -400) + -400);
  mesh.position.set(x, y, z);
  scene.add(mesh);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = -20;
camera.position.y = 5.8;
camera.position.z = -410;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
