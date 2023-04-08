import { Fog } from 'three';

export const createFog = () => {
  const fog: Fog = new Fog('steelblue', 1, 50);

  return fog;
};
