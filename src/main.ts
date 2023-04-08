import { Vector3 } from 'three';
import { createBox } from './components/box';
import { createOrbitControls } from './components/controls/orbitControls';
import { createFloor } from './components/elements/floor';
import { createFog } from './components/elements/fog';
import { createName } from './components/elements/name';
import { createAmbientLight } from './components/lights/ambientLight';
import { createPointLight } from './components/lights/pointLight';
import { createCamera } from './components/setup/camera';
import { createRenderer } from './components/setup/renderer';
import { createScene } from './components/setup/scene';
import './style.css';
import { moveModel } from './utils/moveModel';

import { initialiseMouseControls } from './utils/moveCamera';

const init = () => {
  const camera = createCamera();
  const renderer = createRenderer();
  const scene = createScene();

  camera.position.set(0, 10, 20);
  camera.rotation.set(-Math.PI / 6, 0, 0);

  //Events
  // Resize the canvas when the window changes
  window.addEventListener('resize', () => {
    // Update the renderer size
    renderer?.setSize(window.innerWidth, window.innerHeight);

    // Update the camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  const keyboard: { [key: string]: boolean } = {};

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    keyboard[event.code] = true;
  });

  window.addEventListener('keyup', (event: KeyboardEvent) => {
    keyboard[event.code] = false;
  });

  //Fog
  const fog = createFog();
  scene.fog = fog;

  //Lights
  const ambientLight = createAmbientLight();
  const sun = createPointLight();
  scene.add(ambientLight, sun);

  //Floor
  const floor = createFloor();
  floor.receiveShadow = true;

  scene.add(floor);

  //Player
  const player = createBox();
  player.position.y = 0.5;
  player.castShadow = true;
  initialiseMouseControls(camera, player);

  scene.add(player);

  //Name
  createName(scene);

  for (let i = 0; i < 10; i++) {
    const obstacle = createBox();
    obstacle.position.set(Math.random() * 20, 0.5, Math.random() * 20);
    scene.add(obstacle);
  }

  function animate() {
    requestAnimationFrame(animate);
    moveModel(keyboard, player);

    // position the camera behind the object
    var cameraOffset = new Vector3(0, 5, -15);
    cameraOffset.applyQuaternion(player.quaternion); // rotate offset by object's quaternion
    camera.position.copy(player.position).add(cameraOffset);
    camera.lookAt(player.position);

    renderer?.render(scene, camera);
  }

  animate();
};

init();
