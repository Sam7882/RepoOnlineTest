<template>
  <view class="view" :style="full" v-if="datas.length > 0">
    <swiper :style="full" :current="current" :circular="useSwiper" vertical :disable-touch="!useSwiper" touchable @change="change"
      @transition="transition" :current-item-id="`s${current}`" @touchstart="start" @touchmove="move" @touchend="end">
      <swiper-item ref="ani" class="swiper" :style="full" v-for="(item, index) in datas" :key="index" :item-id="`s${index}`">
        <!-- 如果当前是图片，则使用图片组件 -->
        <template v-if="item.imgList && Array.isArray(item.imgList) && item.imgList.length > 0">
          <view class="imgList" :style="full">
            <ml-swiper-image useSwiper :imgList="item.imgList" :width="options.width" :height="options.height" />
          </view>
        </template>
        <!-- 视频组件 -->
        <template v-else>
          <video :key="`${videoKey}_${index}`" :id="`video_${index}`" class="video" :src="item.src" :poster="item.poster"
            :controls="pagedatas.fullScreen" play-btn-position="center" show-center-play-btn :loop="true"
            :direction="options.direction" :style="videoFull" @play="play" @pause="pause" @tap="click"
            @timeupdate="timeupdate" @ended="ended" @error="error" @fullscreenchange="fullchange"
            @fullscreenclick="fullclick" @waiting="waiting" :show-loading="options.loading" 
            v-if="options.useVideo" />
          <!-- useVideo 为 false 时，提供 video 插槽，便于自定义播放器组件 -->
          <slot name="video" :item="item" :index="listIndex" v-else></slot>
          <!-- 进度条 -->
          <cover-view class="progress" :style="`width:${maxWidth}px`" v-if="!pagedatas.fullScreen">
            <template v-if="options.showProgress">
              <view class="line">
                <text class="line-val"> {{ index === current ? progress.currentStr : "00:00" }} </text>
              </view>
              <slider :min="0" :max="index === current ? progress.duration : 0" :block-size="8"
                :value="index === current ? progress.current : -1" :step="1" @change="sliderChange"
                @changing="changing" />
              <view class="line">
                <text class="line-val"> {{ index === current ? progress.durationStr : "00:00" }} </text>
              </view>
            </template>
            <template v-else>
              <slot name="progress" :item="progress" :index="listIndex"></slot>
            </template>
          </cover-view>
        </template>
        <!-- 工具栏，非全屏展示 -->
        <cover-view class="body" :style="videoFull" v-if="!pagedatas.fullScreen">
          <!-- 默认插槽 -->
          <slot name="default" :item="item" :index="listIndex"></slot>
          <!-- 右侧 -->
          <view class="right" :style="`height:${maxHeight}px`">
            <slot name="right" :item="item" :index="listIndex"></slot>
          </view>
          <!-- 全屏按钮配置 -->
          <template v-if="options.fullScreenOption.show && !imgListLocked">
            <view class="full-screen" :style="`width:${maxWidth}px;bottom:${options.fullScreenOption.bottom}px`">
              <view class="screen-btn">
                <text class="text" @tap="fullScreen">{{ options.fullScreenOption.text }}</text>
              </view>
            </view>
          </template>
          <!-- 底部标题 -->
          <view class="bottom" :style="`width:${maxWidth}px;`">
            <slot name="bottom" :item="item" :index="listIndex"></slot>
          </view>
        </cover-view>
      </swiper-item>
    </swiper>
    <!-- 初始化蒙层 -->
    <view class="init-mask" :style="full" v-if="showInit">
      <view class="init-text" :style="full">
        <text class="text"> {{ options.loadingText }} </text>
      </view>
    </view>
  </view>
</template>

<script >
  /**
   * @description 用于APP的视频滑动组件
   * 
   * @property { Array } list 数据列表
   * @property { Boolean } force 强制滑动|执行（无法触发swiper时，强制更新视频数据，会出现swiper动画错乱的问题）
   * @property { Number } startIndex 开始索引（从第 n 个资源开始） 默认 0，从第一个开始
   * @property { Boolean } useSwiper 是否使用 swiper 组件
   * 
   * @property { Object } touch 滑动配置
   *   @property { Number } upDistance 上滑距离
   *   @property { Number } downDistance 下滑距离
   *   @property { Number } slidTime 滑动时间
   * 
   * @property { Object } options 组件配置
   *   @property { Number } width 组件宽度
   *   @property { Number } height 组件高度
   *   @property { String } loadingText 初始化提示内容 默认 加载中...
   *   @property { Number } criticalVal 临界值 默认 2
   *   @property { Boolean } showProgress 是否显示进度条 默认 true
   *   @property { Boolean } autoChange 是否自动切换 默认 false
   *   @property { Number } direction 0=正常竖向、90=屏幕逆时针90度、-90=屏幕顺时针90度 默认 0
   *   @property { Boolean } loading 是否显示loading控件 默认 false
   *   @property { Boolean } useVideo 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽 默认 true
   *   @property { Number } duration = [300] 滑动动画时长
   *   @property { Object } fullScreenOption 全屏按钮配置 { show: true, bottom: 100, text: "全屏观看" }
   *     @property { Boolean } show 是否显示全屏按钮 默认 true
   *     @property { Number } bottom 按钮距底部高度 默认 100
   *     @property { String } text 按钮显示的内容 默认 "全屏观看"
   * 
   * @event { Function } change 组件切换滑动事件，`current`当前索引，`item`当前视频资源数据
   * @event { Function } transition 位置发生改变时会触发 transition 事件
   * @event { Function } click 视频被点击时触发点击事件，`current`当前索引，`playing`是否正在播放
   * @event { Function } dblclick 双击事件，`current`当前索引，`item`当前视频资源数据
   * @event { Function } fullscreenchange 进入和退出全屏时触发，`fullScreen`是否全屏，`direction`取为 `vertical` 或 `horizontal`
   * @event { Function } fullscreenclick 点击点相对于屏幕左侧边缘的 坐标，同 [video](https://uniapp.dcloud.net.cn/component/video.html) 组件中的`fullscreenclick`保持一致
   * @event { Function } fullScreen 进入全屏
   * @event { Function } play 播放开始事件，`current`当前索引，`item`当前视频资源数据
   * @event { Function } pause 播放暂停事件，`current`当前索引，`item`当前视频资源数据
   * @event { Function } ended 播放结束事件
   * @event { Function } timeupdate 播放进度变化事件，detail = {currentTime, duration}；`progress` 为进度条数据信息
   * @event { Function } error 播放出错事件，当前视频资源数据
   * @event { Function } waiting 视频出现缓冲时触发
   * @event { Function } changing 进度条拖动事件，当前时长和总时长以及格式化后的当前时间和总的时间
   * @event { Function } changed 进度条拖动结束事件，参数同 `@changing` 保持一致
   * @event { Function } loadmore 加载更多事件
   * @event { Function } noTrigger 未触发的滑动事件，`msg` 滑动事件未触发的原因
   * 
   */
  import useAnimation from "./useAnimation.js";
  import mlSwiperImage from './ml-swiper-image.vue';
  export default {
    components: {
      mlSwiperImage
    },
    props: {
      /** 数据列表 */
      list: {
        type: Array,
        default: [],
        required: true
      },
      /** 起始索引，从第 n 个资源开始 */
      startIndex: {
        type: Number,
        default: 0,
        required: false
      },
      /** 强制 触发变更事件 */
      force: {
        type: Boolean,
        default: false,
        required: false
      },
      /** 是否使用 swiper 组件 */
      useSwiper: {
        type: Boolean,
        default: true,
        required: false
      },
      /** 滑动配置 */
      touch: {
        type: Object,
        default() {
          return {
            /** 上滑距离 */
            upDistance: 20,
            /** 下滑距离 */
            downDistance: -40,
            /** 滑动时间 */
            slidTime: 200
          };
        },
        required: false
      },
      /** 组件配置 */
      options: {
        type: Object,
        default() {
          return {
            /** 组件宽度 */
            width: uni.getSystemInfoSync().windowWidth,
            /** 组件高度 */
            height: uni.getSystemInfoSync().windowHeight,
            /** 初始化提示内容 */
            loadingText: "加载中...",
            /** 临界值 */
            criticalVal: 2,
            /** 是否显示进度条 */
            showProgress: true,
            /** 是否自动切换 */
            autoChange: false,
            /** 全屏按钮配置 */
            fullScreenOption: {
              /** 是否显示全屏按钮 */
              show: true,
              /** 按钮距底部高度 */
              bottom: 100,
              /** 按钮显示的内容 */
              text: "全屏观看"
            },
            /** 0=正常竖向、90=屏幕逆时针90度、-90=屏幕顺时针90度 */
            direction: 0,
            /** 是否显示loading控件 */
            loading: false,
            /** 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽 */
            useVideo: true
          };
        },
        required: false
      }
    },
    data() {
      return {
        datas: [], 
        index: 0, 
        current: 0, 
        listIndex: 0, 
        pagedatas: { 
          playing: false,
          fullScreen: false 
        },
        progress: { 
          current: -1, 
          duration: 0, 
          currentStr: '00:00', 
          durationStr: '00:00' 
        },
        animation: null,
        currentItem: {}, 
        videoKey: Date.now(), 
        disabledChange: true, 
        imgListLocked: false, 
        showInit: true, 
        moveLocked: false, 
        changingLocked: false, 
        transitionLocked: false, 
        aniOption: {
          delay: 0,
          duration: 100,
          timingFunction: 'ease-in',
          transformOrigin: '50% 50%'
        }
      };
    },
    watch: {
      startIndex: {
        handler(index) {
          const startIndex = Number(index || 0);
          const length = this.list.length;
          if (startIndex >= 0 && startIndex < length) {
            this.listIndex = startIndex;
            this.resetSwiperData(startIndex);
            this.$forceUpdate();
            const that = this;
            that.$nextTick(() => {
              that.disabledChange = false;
              that.initVideoContext(that.current)?.play();
              that.showInit = false;
            });
          }
        }
      }
    },
    computed: {
      maxWidth() {
        return this.options.width;
      },
      maxHeight() {
        return this.options.height - 20;
      },
      full() {
        return `width:${this.maxWidth}px;height:${this.options.height}px;`;
      },
      videoFull() {
        return `width:${this.maxWidth}px;height:${this.maxHeight}px;`;
      },
      criticalHeight() {
        return Math.floor(this.maxHeight / 3);
      }
    },
    onHide() {
      this.hidePause();
    },
    onShow() {
      this.showPlay();
    },
    beforeDestroy() {
      this.pauseAll();
      this.currentItem = {};
      this.disabledChange = true;
    },
    created() {
      this.datas = [];
      const length = this.list.length;
      if (length < 3) {
        this.showInit = false;
        throw new Error(` list列表数据条数不可少于3条，当前数据为【${length}】条 `);
      }
      const startIndex = Number(this.startIndex || 0);
      if (startIndex > 0 && startIndex < length) {
        this.listIndex = startIndex;
        this.resetSwiperData(startIndex);
      } else {
        this.datas = this.list.slice(0, 3);
      }
      this.currentItem = this.datas[this.current];
      this.imgListLocked = this.currentItem?.imgList?.length > 0;
      setTimeout(() => {
        this.disabledChange = false;
        this.showInit = false;
      }, 1000);
    },
    mounted() {
      const that = this;
      if (this.imgListLocked) return;
      that.$nextTick(() => {
        that.initVideoContext(that.current)?.play();
        that.animation = useAnimation.createAnimation(that.aniOption, that);
      });
    },
    methods: {
      change({ detail }) {
        if (this.disabledChange) return;
        clearTimeout(this.resetLockedWaitTimer);
        this.disabledChange = true;
        this.initVideoContext(this.current)?.pause();
        this.resetProgress();
        this.current = detail.current;
        const current = this.current;
        const length = this.list.length;
        if (this.index - current == 2 || this.index - current == -1) {
          this.listIndex = this.listIndex + 1 == length ? 0 : this.listIndex + 1;
          this.index = this.index + 1 == 3 ? 0 : this.index + 1;
          this.resetSwiperData(this.listIndex);
        }
        else if (this.index - current == -2 || this.index - current == 1) {
          this.listIndex = this.listIndex - 1 == -1 ? length - 1 : this.listIndex - 1;
          this.index = this.index - 1 == -1 ? 2 : this.index - 1;
          this.resetSwiperData(this.listIndex);
        }
        this.currentItem = this.datas[this.current];
        this.imgListLocked = this.currentItem?.imgList?.length > 0;
        const that = this;
        this.videoKey = Date.now();
        this.resetLockedWaitTimer = setTimeout(() => {
          that.moveLocked = false;
          that.touchEndLocked = false;
          that.transitionLocked = false;
          that.initVideoContext(that.current)?.play();
        }, 300);
        this.loadmore();
        this.disabledChange = false;
        this.$emit("change", { current: this.listIndex, item: this.currentItem });
      },
      resetSwiperData(index) {
        const length = this.list.length;
        this.datas[this.index] = this.list[index];
        this.datas[this.index - 1 == -1 ? 2 : this.index - 1] = this.list[index - 1 == -1 ? length - 1 : index - 1];
        this.datas[this.index + 1 == 3 ? 0 : this.index + 1] = this.list[index + 1 == length ? 0 : index + 1];
        this.currentItem = this.list[index];
        this.imgListLocked = this.currentItem?.imgList?.length > 0;
      },
      transition({ detail }) {
        if (this.disabledChange) return;
        if (this.touchEndLocked) return;
        this.transitionLocked = true;
        this.startTime = 0;
        this.$emit("transition", detail);
      },
      start(event) {
        if (event?.preventDefault) event?.preventDefault();
        const touch = event.changedTouches[0];
        this.startY = Math.ceil(touch.pageY);
        this.dblclickLocked = false;
        if (this.startTime > 0 && Date.now() - this.startTime < 200) {
          this.dblclick();
        }
        this.startTime = Date.now();
        this.transitionLocked = false;
      },
      move(event) {
        if (event?.preventDefault) event?.preventDefault();
        if (this.changingLocked) return;
        this.moveLocked = true;
        const touch = event.changedTouches[0];
        const offsetY = Math.ceil(this.startY - touch.pageY);
        if (Math.abs(offsetY) >= 2 && !this.transitionLocked) {
          this.useTransition(offsetY * -1, 0);
        }
      },
      end(event) {
        if (event?.preventDefault) event?.preventDefault();
        if (this.transitionLocked) return;
        if (this.disabledChange) return;
        if (this.changingLocked) return;
        if (!this.moveLocked) return;
        const touch = event.changedTouches[0];
        const endY = Math.ceil(touch.pageY);
        const offsetTop = this.startY - endY;
        if (!this.transitionLocked && offsetTop < 0 && this.listIndex == 0) {
          this.useTransition('0');
          this.$emit('noTrigger', { code: 'E40',  msg: `到顶了` });
          return;
        }
        if (!this.transitionLocked && offsetTop > 0 && this.listIndex >= this.list.length - 1) {
          this.useTransition('0');
          this.$emit('noTrigger', { code: 'E40', msg: `到底了` });
          return;
        }
        const endTime = Date.now();
        const offsetTime = endTime - this.startTime;
        const slidTime = Number(this.touch.slidTime || 200);
        if (!this.transitionLocked && offsetTime > slidTime && this.criticalHeight > offsetTop) {
          this.useTransition('0');
          this.$emit('noTrigger', { code: 'E42', msg: `滑动速度太慢了` });
          return;
        }
        const upDistance = Number(this.touch.upDistance || 20);
        const downDistance = Number(this.touch.downDistance || -40);
        if (offsetTop >= upDistance || offsetTop <= downDistance) {
          const slided = (this.current + 1 > 2 && offsetTop > 0) //|| (this.current - 1 < 0 && offsetTop < 0);
          if (!this.transitionLocked && this.useSwiper && slided && !this.force) {
            this.useTransition('0');
            this.$emit('noTrigger', { code: 'E44', msg: "未能触发swiper滑动事件，请重新滑动" });
            return;
          }
          if (!this.transitionLocked && offsetTop > 0) {
            const index = this.current + 1 > 2 ? 0 : this.current + 1;
            this.change({ detail: { current: index } });
          } else if(!this.transitionLocked && offsetTop < 0) {
            const index = this.current - 1 < 0 ? 2 : this.current - 1;
            this.change({ detail: { current: index } });
          }
          this.touchEndLocked = true;
          return;
        }
        if (!this.transitionLocked && this.imgListLocked) {
          this.useTransition('0');
          return;
        }
        if (!this.transitionLocked) {
          this.useTransition('0');
          this.$emit('noTrigger', { code: 'E43',  msg: `滑动距离太短了` });
        }
      },
      click(event) {
        if (event?.preventDefault) event?.preventDefault();
        if (this.dblclickLocked || this.imgListLocked) return;
        const context = this.initVideoContext(this.current);
        if (this.pagedatas.playing) {
          context?.pause();
        } else {
          context?.play();
        }
        this.startTime = 0;
        this.$emit("click", { current: this.listIndex, playing: this.pagedatas.playing });
      },
      dblclick() {
        if (this.changingLocked) return;
        uni.hideToast();
        this.startTime = 0;
        this.dblclickLocked = true;
        uni.showToast({ title: "双击事件", icon: "none", duration: 1000 });
        this.$emit("dblclick", { current: this.listIndex, item: this.currentItem });
      },
      fullchange(event) {
        if (event?.preventDefault) event?.preventDefault();
        const { fullScreen } = event.detail;
        this.pagedatas.fullScreen = fullScreen;
        uni.hideToast();
        if (fullScreen) {
          uni.showToast({ title: "进入全屏", icon: "none", duration: 1000 });
        } else {
          uni.showToast({ title: "退出全屏", icon: "none", duration: 1000 });
        }
        this.$emit("fullscreenchange", event.detail);
      },
      fullclick(event) {
        if (event?.preventDefault) event?.preventDefault();
        const detail = event.detail;
        this.$emit("fullscreenclick", detail);
      },
      fullScreen() {
        this.initVideoContext(this.current)?.requestFullScreen();
        this.$emit("fullScreen");
      },
      initVideoContext(index) {
        if (this.imgListLocked) {
          return { play(){}, pause(){} };
        }
        const key = `video_${index}`;
        let videocontext = this.pagedatas[key];
        if (!videocontext || !videocontext.play) {
          videocontext = uni.createVideoContext(key, this);
        }
        this.pagedatas[key] = videocontext;
        return videocontext;
      },
      play() {
        this.pagedatas.playing = true;
        this.$emit("play", { current: this.listIndex, item: this.currentItem });
      },
      pause() {
        this.pagedatas.playing = false;
        this.$emit("pause", { current: this.listIndex, item: this.currentItem });
      },
      ended() {
        this.resetProgress();
        this.$emit("ended");
        const autoChange = this.options.autoChange;
        if (!autoChange) return;
        if (this.listIndex >= this.list.length - 1) return;
        const index = this.current + 1 > 2 ? 0 : this.current + 1;
        this.change({ detail: { current: index } });
      },
      error() {
        this.resetProgress();
        this.pagedatas.playing = false;
        this.$emit("error", this.currentItem);
      },
      timeupdate(event) {
        const detail = event.detail;
        const duration = Math.ceil(detail.duration);
        const currentTime = Math.ceil(detail.currentTime);
        if (this.progress.duration < 1 || this.progress.current < 1) {
          this.progress.duration = duration;
          this.progress.durationStr = this.handleTime(duration);
        }
        this.progress.current = currentTime;
        this.progress.currentStr = this.handleTime(currentTime);
        if (currentTime === duration) {
          this.progress.current = 0;
          this.progress.duration = duration;
          this.progress.durationStr = this.handleTime(duration);
        }
        this.$emit("timeupdate", { detail, progress: this.progress });
      },
      waiting() {
        this.$emit("waiting");
      },
      changing(event) {
        this.startTime = 0;
        this.changingLocked = true;
        const val = event.detail.value;
        this.progress.currentStr = this.handleTime(Math.ceil(val));
        this.$emit("changing", this.progress);
      },
      sliderChange(event) {
        const val = event.detail.value;
        if (val && !isNaN(val)) {
          this.progress.current = val;
          this.progress.currentStr = this.handleTime(Math.ceil(val));
          this.initVideoContext(this.current)?.seek(val);
          const that = this;
          clearTimeout(this.sliderChangeTimer);
          this.sliderChangeTimer = setTimeout(() => {
            that.changingLocked = false;
          }, 300);
        }
        this.startTime = 0;
        this.$emit("changed", this.progress);
      },
      handleTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '00:00';
        const sec = seconds % 60;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const formattedSeconds = String(sec).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedHours = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
        return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
      },
      resetProgress() {
        this.progress = {
          current: -1,
          duration: 0,
          currentStr: "00:00",
          durationStr: "00:00"
        };
      },
      loadmore() {
        const index = this.listIndex;
        const length = this.list.length;
        const criticalVal = Number(this.options.criticalVal || 2);
        if (index >= length - criticalVal) {
          this.$emit("loadmore");
        }
      },
      pauseAll() {
        if (!this.imgListLocked) {
          this.initVideoContext(this.current)?.pause();
        }
        Object.values(this.pagedatas).forEach((ctx) => ctx && ctx.pause && ctx.pause());
      },
      useTransition(val, opacity = 1) {
        if (!this.animation || !this.animation.run) {
          this.animation = useAnimation.createAnimation(this.aniOption, this);
        }
        this.animation?.translateY(val);
        this.animation?.opacity(opacity);
        this.animation?.run(this.$refs.ani[this.current]);
      },
      hidePause() {
        this.pauseAll();
      },
      showPlay() {
        if (!this.imgListLocked) {
          this.initVideoContext(this.current)?.play();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $swiperIndex: 95;
  $sectionIndex: 97;
  $initBoxIndex: 99;

  .swiper {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: $swiperIndex;
  }
  
  .video {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .body {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .imgList {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 10px;
  }

  .progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: $sectionIndex;

    .line {
      margin: 0 5px;
    }

    .line-val {
      color: #fff;
      font-weight: 200;
      font-size: 12px;
      padding: 0 5px;
      text-align: center;
    }
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: $sectionIndex;
  }

  .full-screen {
    position: absolute;
    bottom: 100px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    z-index: $sectionIndex;

    .screen-btn {
      padding: 5px 10px;
      border-radius: 5px;
      border: 1px solid #d6d6d6;
      background: rgba(0, 0, 0, 0.4);

      .text {
        color: #d6d6d6;
        font-size: 12px;
        font-weight: 200;
      }
    }
  }

  .bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 10px;
    z-index: $sectionIndex;
  }

  .init-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: $initBoxIndex;
    background: rgba(0, 0, 0, 0.7);

    .init-text {
      flex-wrap: nowrap;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .text {
        color: #d6d6d6;
        font-size: 16px;
        text-align: center;
      }
    }
  }
</style>