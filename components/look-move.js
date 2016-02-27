/* global AFRAME */

(function () {
  'use strict';

  AFRAME.registerComponent('look-move', {
    schema: {
      speed: {
        type: 'vec3',
        default: '0 0 1'
      },
      bounds: {
        type: 'vec3',
        default: '10 10 10'
      }
    },

    init() {
      this.lastTime = performance.now();
    },

    tick(time) {
      
    }
  });
}());
