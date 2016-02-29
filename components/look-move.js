/* global AFRAME, THREE */

(function () {
  'use strict';

  function dir(val) {
    return val > 4 ? 1 : val < -4 ? -1 : 0;
  }

  AFRAME.registerComponent('look-move', {
    schema: {
      speed: {
        default: 10
      },
      max: {
        type: 'vec3',
        default: '20 20 20'
      },
      min: {
        type: 'vec3',
        default: '-20 -20 20'
      }
    },

    init() {
      this.lastTime = performance.now();
      this.target = new THREE.Object3D();
      this.target.position.z = -20;
      this.el.object3D.add(this.target);
      this.vec = new THREE.Vector3();
    },

    tick(time) {
      if (!time) { return; }
      const delta = (time - this.lastTime) / 1000;
      // updateMatrixWorld called every render anyhow
      this.vec.setFromMatrixPosition(this.target.matrixWorld);
      this.vec.sub(this.el.object3D.position);
      const x = THREE.Math.clamp(this.el.object3D.position.x + dir(this.vec.x) * this.data.speed * delta, -20, 20);
      const y = THREE.Math.clamp(this.el.object3D.position.y + dir(this.vec.y) * this.data.speed * delta, -19, 19);
      this.el.setAttribute('position', [x, y, this.el.object3D.position.z].join(' '));
      this.lastTime = time;
    }
  });
}());
