import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { degreesToRadians } from '../../utils/degreesToRadians';

export const createOrbitControls = (
  camera: PerspectiveCamera,
  domElement: HTMLElement
) => {
  const controls = new OrbitControls(camera, domElement);

  controls.maxPolarAngle = degreesToRadians(80);
  controls.minDistance = 2;
  controls.maxDistance = 20;

  return controls;
};
