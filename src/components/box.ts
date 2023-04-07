import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

export const createBox = () => {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshStandardMaterial();

  const box = new Mesh(geometry, material);

  return box;
};
