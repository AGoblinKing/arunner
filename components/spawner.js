/* global AFRAME */

(function () {
  'use strict';

  AFRAME.registerComponent('spawner', {
    schema: {
      enabled: { default: true },
      /* will use new array type */
      templates: {
        default: [],
        parse(val) {
          return val.split(' ');
        },
        stringify(data) {
          return data.join(' ');
        }
      },
      timing: {
        default: { min: 0, max: 1000 },
        parse(val) {
          const data = val.split(' ');

          return {
            min: +data[0],
            max: +data[1]
          };
        },
        stringify(data) {
          return [data.min, data.max].join(' ');
        }
      }
    },

    init() {
      this.lastTime = performance.now();
    },

    update() {
      this.pickTime();
    },

    pickTime() {
      const min = this.data.timing.min;
      const max = this.data.timing.max;
      this.delta = Math.floor((min + Math.random() * (max - min)));
    },

    pickTemplate() {
      return this.data.templates[Math.floor(Math.random() * (this.data.templates.length - 1))];
    },

    tick(time) {
      if (this.data.enabled && time - this.lastTime > this.delta) {
        const template = this.pickTemplate();
        const el = document.createElement('a-entity');
        el.setAttribute('template', 'src', template);
        this.el.appendChild(el);
        this.pickTime();
        this.lastTime = time;
      }
    }
  });
}());
