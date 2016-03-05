/* global AFRAME, THREE */

(function () {
  'use strict';

  AFRAME.registerComponent('player-hit', {
    init() {
      this.el.addEventListener('collision', (collider) => {
        console.log(collider);
      });
    }
  });
}());
