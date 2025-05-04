// #ifdef APP-NVUE
const nvueAnimation = uni.requireNativePlugin('animation');
// #endif
const animateTypes = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ', 'opacity', 'backgroundColor', 'width', 'height', 'left', 'right', 'top', 'bottom'];
class Animation {
  constructor(options, _this) {
    this.options = options;
    this.animation = uni.createAnimation({ ...options });
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;
  }
  animateRun(instance, styles = {}, config = {}) {
    return new Promise((resolve, reject) => {
      if (!instance) { reject(" ref 不可为空 "); return; }
      try {
        // #ifdef APP-NVUE
        nvueAnimation.transition(instance, { styles, ...config }, res => { resolve(res); });
        // #endif
        // #ifndef APP-NVUE
        reject({});
        // #endif
      } catch (error) {
        reject(error);
      }
    });
  }
  nvueNextAnimate(instance, animates, step = 0, fn) {
    let obj = animates[step];
    if (obj) {
      let { styles, config } = obj;
      this.animateRun(instance, styles, config).then(() => { step += 1; this.nvueNextAnimate(instance, animates, step, fn); });
    } else {
      this.currentStepAnimates = {}; typeof fn === 'function' && fn(); this.isEnd = true;
    }
  }
  nvuePushAnimates(type, args) {
    let aniObj = this.currentStepAnimates[this.next]
    let styles = {};
    if (!aniObj) { styles = { styles: {}, config: {} }; } else { styles = aniObj; }
    if (animateTypes.includes(type)) {
      if (!styles.styles.transform) { styles.styles.transform = ''; }
      let unit = ''; if (type === 'rotate') { unit = 'deg'; }
      styles.styles.transform += `${type}(${args + unit}) `;
    } else {
      styles.styles[type] = `${args}`;
    }
    this.currentStepAnimates[this.next] = styles;
  }
  step(config = {}) {
    this.currentStepAnimates[this.next].config = Object.assign({}, this.options, config);
    this.currentStepAnimates[this.next].styles.transformOrigin = this.currentStepAnimates[this.next].config.transformOrigin;
    this.next++;
    return this;
  }
  run(instance, fn) {
    this.isEnd = false;
    if (!instance) return;
    this.nvueNextAnimate(instance, this.currentStepAnimates, 0, fn);
    this.next = 0;
  }
};
animateTypes.forEach(type => {
  Animation.prototype[type] = function(...args) {
    this.nvuePushAnimates(type, args);
    return this
  }
});
function createAnimation(option, _this) {
  if (!_this) return;
  return new Animation(option, _this);
}
export default { createAnimation }