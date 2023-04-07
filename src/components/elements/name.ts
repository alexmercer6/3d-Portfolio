import { Mesh, MeshStandardMaterial, Scene } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { gsap } from 'gsap';

export const createName = (scene: Scene) => {
  const loader = new FontLoader();
  let text;

  loader.load(
    '../../../static/fonts/helvetiker_bold.typeface.json',
    function (font) {
      console.log(font);
      const geometry = new TextGeometry('Alex Mercer', {
        font: font,
        size: 2,
        height: 0.6,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.04,
        bevelOffset: 0,
        bevelSegments: 4,
      });

      const material = new MeshStandardMaterial();

      geometry.center();

      text = new Mesh(geometry, material);
      text.position.y = 10;
      text.position.z = 9;
      text.rotation.y = Math.PI;
      text.castShadow = true;

      gsap.to(text.position, {
        duration: 2,
        y: 1.1,
        ease: 'bounce.out',
      });
      scene.add(text);
    }
  );

  return text;
};
