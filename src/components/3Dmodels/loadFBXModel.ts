import {
  BufferAttribute,
  BufferGeometry,
  Mesh,
  MeshStandardMaterial,
  Scene,
} from 'three';
import { Earcut } from 'three/src/extras/Earcut';
import { FBXLoader } from '../loaders/FBXLoader';

export const loadFBXModel = (scene: Scene, modelPath: string) => {
  // instantiate a loader
  const loader = new FBXLoader();

  // load a resource
  loader.load(
    // resource URL
    modelPath,

    // called when resource is loaded
    function (object) {
      // triangulate the geometry
      //  var modifier = new TriangulateModifier();
      // console.log(object.children[0]);
      object.traverse((child: any) => {
        if ((child as Mesh).isMesh) {
          // Get the positions and indices of the geometry
          const positions = child.geometry.attributes.position.array;
          const indices = Earcut.triangulate(Array.from(positions));
          console.log(indices);

          // Create a new buffer geometry with the triangulated data
          const geometry = new BufferGeometry();
          geometry.setIndex(indices);
          geometry.setAttribute('position', new BufferAttribute(positions, 3));

          // Replace the child's geometry with the new buffer geometry
          child.geometry.dispose();
          child.geometry = geometry;

          // Update the child's material to use the new geometry
          child.material = new MeshStandardMaterial();
        }
        // Use the triangulated geometry as desired
      });
      //  modifier.process(object.children[0].geometry);
      scene.add(object);
    },

    // called when loading is in progress
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },

    // called when loading has errors
    function (error) {
      console.log(error);
    }
  );
};
