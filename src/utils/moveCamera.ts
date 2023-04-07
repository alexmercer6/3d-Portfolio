import { Group, Object3D, PerspectiveCamera } from 'three';

export const moveCamera = (camera: PerspectiveCamera, model: Object3D) => {
  camera.position.x = model.position.x;
  camera.position.y = model.position.y + 2;
  camera.position.z = model.position.z + 5;

  camera.rotation.y = Math.atan2(-model.position.x, model.position.z);
};
