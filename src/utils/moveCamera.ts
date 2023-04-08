import { Object3D, PerspectiveCamera } from 'three';

export const initialiseMouseControls = (
  camera: PerspectiveCamera,
  model: Object3D
) => {
  let isMouseDown = false;

  // Add event listener for mousedown to start rotating the camera and player
  window.addEventListener('mousedown', () => {
    isMouseDown = true;
  });

  // Add event listener for mouseup to stop rotating the camera and player
  window.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  // Add event listener for mousemove to rotate the camera and player when the mouse is down
  window.addEventListener('mousemove', (event: MouseEvent) => {
    if (isMouseDown) {
      // Get the mouse movement delta
      const deltaX = event.movementX;

      // Rotate the camera and player based on the mouse movement delta
      const rotationSpeed = 0.01;
      camera.rotateY(-deltaX * rotationSpeed);
      model.rotateY(-deltaX * rotationSpeed);
    }
  });
};
