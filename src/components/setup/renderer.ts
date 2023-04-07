import * as THREE from 'three';
import { PCFShadowMap, WebGLRenderer } from 'three';

export function createRenderer() {
  const canvas = document.getElementById('canvas');
  const backup = document.createElement('canvas');
  // Create a renderer

  const renderer: WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas ?? backup,
  });

  // Set the size of the renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('steelblue');
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  return renderer;
}
