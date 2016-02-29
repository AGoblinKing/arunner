/* global AFRAME, THREE */

(function () {
  'use strict';

  AFRAME.registerComponent('proc-texture', {
    schema: {
      type: { default: 'grid' },
      width: { default: 1024 },
      height: { default: 1024 },
      repeat: {
        default: [1, 1],
        parse(data) {
          return data.split(' ').map(Number);
        }
      }
    },

    init() {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.texture = new THREE.Texture(this.canvas);
      this.texture.wrapS = THREE.RepeatWrapping;
      this.texture.wrapT = THREE.RepeatWrapping;
    },

    update() {
      const target = this.el.getOrCreateObject3D('mesh');
      this.canvas.width = this.data.width;
      this.canvas.height = this.data.height;

      switch (this.data.type) {
        default:
          this.ctx.fillStyle = 'rgb(0, 0, 0)';
          this.ctx.fillRect(0, 0, this.data.width, this.data.height);
          this.ctx.strokeStyle = 'white';
          this.ctx.lineWidth = 100;
          this.ctx.strokeRect(0, 0, this.data.width, this.data.height);
      }
      this.texture.repeat.set(this.data.repeat[0], this.data.repeat[1]);
      this.texture.needsUpdate = true;
      target.material.map = this.texture;
    }
  });
}());
