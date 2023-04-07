import { DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import { degreesToRadians } from '../../utils/degreesToRadians';

export const createFloor = () => {
  const geometry = new PlaneGeometry(100, 100);
  const material = new MeshStandardMaterial({ color: 'steelblue' });
  const floor = new Mesh(geometry, material);
  floor.rotation.x = degreesToRadians(90);
  floor.material.side = DoubleSide;

  console.log('initialised');
  return floor;
};
