/* global AFRAME, THREE */

(function () {
  'use strict';

  AFRAME.registerComponent('move-texture', {
    schema: {
      speed: {
        default: [0, 1], // amount a second
        parse(data) {
          return data.split(' ').map(Number);
        }
      }
    },

    init() {
      this.lastTime = performance.now();
    },

    tick(time) {
      if (!time) { return; }
      const target = this.el.getOrCreateObject3D('mesh');
      const newTime = performance.now();
      const delta = (newTime - this.lastTime) / 1000;

      target.material.map.offset.x += delta * this.data.speed[0];
      target.material.map.offset.y += delta * this.data.speed[1];
      target.material.map.needsUpdate = true;

      this.lastTime = newTime;
    }
  });
}());
