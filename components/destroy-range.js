/* global AFRAME */

(function () {
  'use strict';

  AFRAME.registerComponent('destroy-range', {
    schema: {
      x: { default: Infinity },
      y: { default: Infinity },
      z: { default: Infinity }
    },

    tick() {
      'xyz'.split('').forEach((key) => {
        if (this.el.object3D.position[key] > this.data[key]) {
          this.el.parentNode.removeChild(this.el);
        }
      });
    }
  });
}());
