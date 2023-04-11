import { AnimationMixer, LoopRepeat, Object3D, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
export let mixer: THREE.AnimationMixer;
// let modelReady = false;
export let activeModel: Object3D;
const animationActions: THREE.AnimationAction[] = [];
export let activeAction: THREE.AnimationAction;
// let lastAction: THREE.AnimationAction;
export const loadGLTF = (scene: Scene, modelPath: string) => {
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
      gltf.scene.traverse(function (child) {
        mixer = new AnimationMixer(gltf.scene);
        activeModel = gltf.scene;

        const animationAction = mixer.clipAction((gltf as any).animations[0]);
        animationActions.push(animationAction);

        activeAction = animationActions[0];
        // activeAction.enabled = true;
        // activeAction.reset();
        activeAction.play();
        activeAction.loop = LoopRepeat;

        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
        }
      });
      gltf.scene.scale.set(0.5, 0.5, 0.5);
      scene.add(gltf.scene);

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

      // mixer = new AnimationMixer(robotModel);

      // idleAction = mixer.clipAction(animations[0]);
      // walkAction = mixer.clipAction(animations[3]);
      // runAction = mixer.clipAction(animations[1]);

      // actions = [idleAction, walkAction, runAction];
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.log(error);
    }
  );
};
