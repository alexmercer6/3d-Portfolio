import { PointLight } from 'three';

export const createPointLight = () => {
  const pointLight: PointLight = new PointLight('#ffffff', 0.8);

  pointLight.position.set(5, 8, 2);

  pointLight.castShadow = true;

  return pointLight;
};
