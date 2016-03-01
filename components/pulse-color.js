/* global AFRAME, THREE */

(function () {
  'use strict';

  AFRAME.registerComponent('pulse-color', {
    schema: {
      start: {
        type: 'vec3',
        default: '0 0 0'
      },
      end: {
        type: 'vec3',
        default: '1 1 1'
      },
      time: {
        default: 1000
      }
    },

    init() {
      this.lastPulse = performance.now();
    },

    tick(time) {
      if (!time) { return; }
      const target = this.el.getOrCreateObject3D('mesh');
      const delta = (time - this.lastPulse) / 1000;
      const ratio = delta / this.data.time;
      
      target.material.color.setRGB()

      this.lastTime = time;
    }
  });
}());
