import { AmbientLight } from 'three';

export const createAmbientLight = () => {
  const ambientLight: AmbientLight = new AmbientLight('#ffffff', 0.5);

  return ambientLight;
};
