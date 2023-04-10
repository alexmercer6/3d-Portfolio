import { AnimationMixer, PerspectiveCamera, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { initialiseMouseControls } from '../../utils/moveCamera';
let robotModel;
let animations;
let mixer;
let idleAction, walkAction, runAction;
// let idleWeight, walkWeight, runWeight;
// let actions, settings;
export const loadGLTF = (
  scene: Scene,
  modelPath: string,
  camera: PerspectiveCamera
) => {
  // Instantiate a loader
  const loader = new GLTFLoader();

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
  loader.setDRACOLoader(dracoLoader);

  // Load a glTF resource
  loader.load(
    // resource URL
    modelPath,
    // called when the resource is loaded
    function (gltf) {
      scene.add(gltf.scene);
      initialiseMouseControls(camera, gltf.scene);

      animations = gltf.animations; // Array<THREE.AnimationClip>
      robotModel = gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

      mixer = new AnimationMixer(robotModel);

      idleAction = mixer.clipAction(animations[0]);
      walkAction = mixer.clipAction(animations[3]);
      runAction = mixer.clipAction(animations[1]);

      // actions = [idleAction, walkAction, runAction];
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened');
    }
  );
};
