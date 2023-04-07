import * as THREE from 'three';
import { PerspectiveCamera } from 'three';
export function createCamera() {
  // Create a new camera
  const camera: PerspectiveCamera = new THREE.PerspectiveCamera(
    50, // field of view
    window.innerWidth / window.innerHeight // aspect ratio
  );

  // Set the position of the camera
  camera.position.z = 6;

  return camera;
}
