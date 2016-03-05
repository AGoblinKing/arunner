/* global AFRAME, THREE */

(function () {
  'use strict';

  function createTexture(data) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = data.width;
    canvas.height = data.height;

    const texture = new THREE.Texture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    switch (data.type) {
      default:
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, data.width, data.height);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 100;
        ctx.strokeRect(0, 0, data.width, data.height);
    }

    texture.repeat.set(data.repeat[0], data.repeat[1]);
    texture.needsUpdate = true;
    return texture;
  }

  const cache = {
    get(data) {
      const key = data.id;

      if (!key || !this[key]) {
        this[key] = createTexture(data);
      }

      return this[key];
    }
  };


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
      },
      id: { default: 'default' }
    },
    update() {
      const target = this.el.getOrCreateObject3D('mesh');
      target.material.map = cache.get(this.data);
    }
  });
}());
