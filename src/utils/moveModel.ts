import { Object3D, Vector3 } from 'three';
import { gsap } from 'gsap';

export const moveModel = (
  keyboard: { [key: string]: boolean },
  model: Object3D
) => {
  if (keyboard['KeyQ']) {
    // Rotate the model around its y-axis
    model.rotateY(0.03);
  }
  if (keyboard['KeyE']) {
    // Rotate the model around its y-axis
    model.rotateY(-0.03);
  }
  if (keyboard['KeyW']) {
    // Get the model's forward direction in world space
    const forward = new Vector3(0, 0, 1);

    // Move the model forward in its local direction
    model.translateOnAxis(forward, 0.1);
  }
  if (keyboard['KeyS']) {
    // Get the model's backward direction in world space
    const backward = new Vector3(0, 0, -1);
    // Move the model backward in its local direction
    model.translateOnAxis(backward, 0.1);
  }
  if (keyboard['KeyA']) {
    // Get the model's Left direction in world space
    const left = new Vector3(1, 0, 0);
    // Strafe the model left in its local direction
    model.translateOnAxis(left, 0.1);
  }
  if (keyboard['KeyD']) {
    // Get the model's right direction in world space
    const right = new Vector3(-1, 0, 0);
    // Strafe the model Right in its local direction
    model.translateOnAxis(right, 0.1);
  }
  // Jumping
  const t1 = gsap.timeline();
  if (keyboard['Space']) {
    t1.to(model.position, { y: 3, ease: 'sine.out' }).to(model.position, {
      y: 0.5,
      ease: 'sine.in',
    });
  }
};
