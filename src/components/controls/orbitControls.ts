import { Object3D, PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { degreesToRadians } from '../../utils/degreesToRadians';

export const createOrbitControls = (
  camera: PerspectiveCamera,
  domElement: HTMLElement | null,
  model: Object3D
) => {
  if (domElement && model) {
    const controls = new OrbitControls(camera, domElement);

    controls.maxPolarAngle = degreesToRadians(80);
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.target.set(model.position.x, model.position.y, model.position.z);
    return controls;
  }

  return null;
};
