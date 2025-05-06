<template>
  <!-- #ifdef APP-NVUE -->
  <view :style="full" v-if="datas.length > 0">
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <view :style="full">
      <!-- #endif -->
      <!-- #ifdef APP-VUE -->
      <view :style="full" class="appTipView">
        <text class="appTipText">
          在 VUE 页面中 无法使用 ml-swiper-v3 组件，请改用 NVUE 页面
        </text>
      </view>
      <!-- #endif -->
      <!-- #ifndef APP-VUE -->
      <swiper :style="full" class="ml-swiper-v3" :current="current" :circular="useSwiper" vertical
        :disable-touch="touchable" :duration="config.duration" touchable @change="change" @transition="transition"
        :current-item-id="`s${current}`" @touchstart="start" @touchmove="move" @touchend="end"
        @animationfinish="animationfinish">
        <swiper-item ref="ani" :style="full" class="" data-dom="swiperItem" v-for="(item, index) in datas" :key="index"
          :item-id="`s${index}`">
          <view class="ml-swiper-v3-item" :style="full" @longpress="longpress(item)">
            <template v-if="item.imgList && Array.isArray(item.imgList) && item.imgList.length > 0">
              <view :style="full" @tap="onclick(item)">
                <ml-swiper-image :imgList="item.imgList" :width="config.width" :height="config.height"
                  @imgChange="imgChange" />
              </view>
            </template>
            <template v-else>
              <!-- #ifdef H5 | WEB -->
              <view class="swiper-video" :style="videoFull" v-if="config.useVideo">
                <!-- 替換為用陣列渲染的方式 -->
                <template v-if="item">
                  <video :id="`video_${index}`" :src="`${item.url || item.src || ''}`" :poster="`${item.poster}`"
                    :title="`${item.title}`" class="dplayer-video dplayer-video-current swiper-video"
                    :loop="`${!config.autoChange}`" :muted="true" preload="auto" x5-video-orientation="portrait"
                    enable-progress-gesture="false" webkit-playsinline="true" playsinline="true"
                    x-webkit-airplay="allow" x5-video-player-type="h5-page" :object-fit="config.objectFit"
                    controlsList="nodownload" :codec="config.codec" play-btn-position="center"
                    :style="`${videoFull}z-index:0;;pointer-events:auto !important;object-position: center;`"
                    :key="`${videoKey}`" :controls="pagedatas.fullScreen" :autoplay="false" show-center-play-btn
                    :show-loading="config.loading" :duration="item.duration || 0" :initial-time="item.initialTime || 0"
                    @play="onplay" :play-strategy="config.playStrategy" @pause="onpause" @ended="onended"
                    @timeupdate="ontimeupdate" @waiting="onwaiting" @error="onerror" @tap="onclick(item)"
                    @loadedmetadata="loadedmetadata" :http-cache="false" @fullscreenchange="fullscreenchange"
                    :direction="config.direction" @fullscreenclick="fullscreenclick">
                    <!-- 
                    <video id="video_${index}" src="${src}" poster="${item.poster}" title="${item.title}"
              class="dplayer-video dplayer-video-current swiper-video" loop="${!autoChange}" muted="${true}"
              preload="auto" x5-video-orientation="portrait" enable-progress-gesture="false" webkit-playsinline="true"
              playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5-page" objectFit="contain"
              style="${this.videoFull};pointer-events:auto !important;object-position: center;" key="${this.videoKey}">
              </video>
                    -->
                  </video>
                </template>
              </view>
              <slot name="video" :item="item" :index="listIndex" v-else></slot>
              <!-- #endif -->
              <!-- #ifdef MP-WEIXIN -->
              <view class="ml-swiper-v3-progress-view" :style="`width:${maxWidth}px;height:20px;`">
                <!-- #endif -->
                <!-- #ifndef MP-WEIXIN -->
                <cover-view class="ml-swiper-v3-progress-view" :style="`width:${maxWidth}px;height:20px;`">
                  <!-- #endif -->
                  <template v-if="config.showProgress">
                    <view class="ml-swiper-v3-line">
                      <text class="ml-swiper-v3-line-val"> {{ index === current ? progress.currentStr : "00:00" }}
                      </text>
                    </view>
                    <slider class="ml-swiper-v3-progress" :min="0" :max="index === current ? progress.duration : 1"
                      :block-size="8" :value="index === current ? progress.current : 0" :step="1" @change="sliderChange"
                      @changing="changing" />
                    <view class="ml-swiper-v3-line">
                      <text class="ml-swiper-v3-line-val"> {{ index === current ? progress.durationStr : "00:00" }}
                      </text>
                    </view>
                  </template>
                  <template v-else>
                    <slot name="progress" :current="progress.current" :duration="progress.duration" :item="progress"
                      :index="listIndex"></slot>
                  </template>
                  <!-- #ifndef MP-WEIXIN -->
                </cover-view>
                <!-- #endif -->
                <!-- #ifdef MP-WEIXIN -->
              </view>
              <!-- #endif -->
              <template v-if="!isImgList">
                <!-- #ifdef MP-WEIXIN -->
                <view class="ml-swiper-v3-fullscreen-view"
                  :style="`width:${maxWidth}px;bottom:${config.fullScreenOption.bottom}px`">
                  <!-- #endif -->
                  <!-- #ifndef MP-WEIXIN -->
                  <cover-view class="ml-swiper-v3-fullscreen-view"
                    :style="`width:${maxWidth}px;bottom:${config.fullScreenOption.bottom}px`">
                    <!-- #endif -->
                    <view v-if="config.showFullScreen" class="ml-swiper-v3-fullscreen" @tap="fullScreen">
                      <text class="ml-swiper-v3-fullscreen-text"> {{ config.fullScreenOption.text }} </text>
                    </view>
                    <slot v-else name="fullscreen" :item="item" :index="listIndex"></slot>
                    <!-- #ifndef MP-WEIXIN -->
                  </cover-view>
                  <!-- #endif -->
                  <!-- #ifdef MP-WEIXIN -->
                </view>
                <!-- #endif -->
              </template>
            </template>
            <view class="ml-swiper-v3-body">
              <slot name="default" :item="item" :index="listIndex"></slot>
            </view>
            <view class="ml-swiper-v3-right" :style="`height:${maxHeight}px;`">
              <slot name="right" :item="item" :index="listIndex" :soundMute="soundMute"></slot>
            </view>
            <view class="ml-swiper-v3-bottom" :style="`width:${maxWidth}px;`">
              <slot name="bottom" :item="item" :index="listIndex"></slot>
            </view>
          </view>
        </swiper-item>
      </swiper>
      <!-- #endif -->
      <!-- #ifndef APP-NVUE -->
    </view>
    <!-- #endif -->
    <view class="init-mask" :style="full" v-if="showInitText">
      <text class="init-text"> {{ config.loadingText }} </text>
    </view>
    <!-- #ifdef APP-NVUE -->
  </view>
  <!-- #endif -->
</template>

<script>
/**
 * mlSwiperV3 视频滑动组件
 * @description 仿抖音短视频上下滑动组件，支持APP、小程序、H5
 * @tutorial https://ext.dcloud.net.cn/plugin?id=20585
 * @property { Array } list 数据列表
 * @property { Boolean } force 强制滑动|执行（无法触发swiper时，强制更新视频数据，会出现swiper动画错乱的问题）
 * @property { Number } startIndex 开始索引（从第 n 个资源开始） 默认 0，从第一个开始
 * @property { Boolean } useSwiper 是否使用 swiper 组件
 * 
 * @property { Object } touch 滑动配置
 *   @property { Number } upDistance 上滑距离
 *   @property { Number } downDistance 下滑距离
 *   @property { Number } slidTime 滑动时间
 *   @property { Number } touchDistance swiper 滑动距离
 * 
 * @property { Object } options 组件配置
 *   @property { Number } width 组件宽度
 *   @property { Number } height 组件高度
 *   @property { String } loadingText 初始化提示内容 默认 加载中...
 *   @property { Number } criticalVal 临界值 默认 2
 *   @property { Boolean } showProgress 是否显示进度条 默认 true
 *   @property { Boolean } autoChange 是否自动切换 默认 false
 *   @property { Number } direction = [-90|0|90] 0=正常竖向、90=屏幕逆时针90度、-90=屏幕顺时针90度
 *    @value -90 屏幕顺时针90度
 *    @value 0 正常竖向
 *    @value 90 屏幕逆时针90度
 *   @property { Boolean } loading 是否显示loading控件 默认 false
 *   @property { Boolean } useVideo 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽 默认 true
 *   @property { Number } duration = [300] 滑动动画时长
 *   @property { Boolean } showFullScreen 是否显示全屏按钮 默认 true
 *   @property { Object } fullScreenOption 全屏按钮配置 { show: true, bottom: 100, text: "全屏观看" }
 *     @property { Number } bottom 按钮距底部高度 默认 100
 *     @property { String } text 按钮显示的内容 默认 "全屏观看"
 * 
 * @event {Function} onchange 组件切换滑动事件，`index`当前索引，`video`当前视频资源数据
 * @event {Function} transition 位置发生改变时会触发 transition 事件（APP端需要`useSwiper`为`true`生效，其他端正常）
 * @event {Function} animationfinish 滑动动画完成事件（APP端需要`useSwiper`为`true`生效，其他端正常）
 * @event {Function} loadmore 加载更多数据
 * @event {Function} longTap 长按事件
 * @event {Function} onclick 视频被点击时触发点击事件，`index`当前索引，`playing`是否正在播放
 * @event {Function} ondblclick 双击事件，`index`当前索引，`video`当前视频资源数据
 * @event {Function} onplay 播放开始事件，`index`当前索引，`video`当前视频资源数据
 * @event {Function} onpause 播放暂停事件，`index`当前索引，`video`当前视频资源数据
 * @event {Function} onended 播放结束事件
 * @event {Function} changing 进度条拖动事件，当前时长和总时长以及格式化后的当前时间和总的时间
 * @event {Function} changed 进度条拖动结束事件，参数同 `@changing` 保持一致
 * @event {Function} timeupdate 播放进度变化事件，detail = {currentTime, duration}；`progress` 为进度条数据信息
 * @event {Function} onwaiting 视频出现缓冲时触发
 * @event {Function} fullscreenchange 进入和退出全屏时触发，`fullScreen`是否全屏，`direction`取为 `vertical` 或 `horizontal`
 * @event {Function} fullscreenclick 点击点相对于屏幕左侧边缘的 坐标，同 [video](https://uniapp.dcloud.net.cn/component/video.html) 组件中的`fullscreenclick`保持一致
 * @event {Function} loadedmetadata 资源初始化完成事件【仅H5支持】
 * @event {Function} onerror 播放出错事件，当前视频资源数据
 * @event {Function} noTrigger 未触发的滑动事件，`msg` 滑动事件未触发的原因，【`APP端特有`】
 */
// #ifdef H5 | WEB
import Hls from "hls.js";
// #endif
import mlSwiperImage from "./ml-swiper-image.vue";
// #ifdef APP-NVUE
import useAnimation from "./useAnimation.js";
// #endif
export default {
  name: "mlSwiperV3",
  components: { mlSwiperImage },
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
    // #ifdef APP
    /** 是否使用 swiper 组件 */
    useSwiper: {
      type: Boolean,
      default: true,
      required: false
    },
    // #endif
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
          slidTime: 200,
          /** swiper 滑动距离 */
          touchDistance: 80
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
          /** 是否显示全屏按钮 */
          showFullScreen: true,
          /** 全屏按钮配置 */
          fullScreenOption: {
            /** 按钮距底部高度 */
            bottom: 100,
            /** 按钮显示的内容 */
            text: "全屏观看"
          },
          /** -90=屏幕顺时针90度、0=正常竖向、90=屏幕逆时针90度、 */
          direction: '',
          /** 是否显示loading控件 */
          loading: false,
          /** 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽 */
          useVideo: true,
          /** swiper 滑动动画时长 */
          duration: 300,
          /** contain：包含，fill：填充，cover：覆盖 */
          objectFit: "contain",
          /** hardware：硬解码，software：ffmpeg软解码 */
          codec: "software",
          /** 0：普通模式，1：平滑播放模式（降级），2： M3U8优化模式 */
          playStrategy: 1
        };
      },
      required: false
    }
  },
  emits: ['onchange', 'transition', 'animationfinish', 'loadmore', 'longTap', 'onclick', 'ondblclick', 'onplay', 'onpause', 'onended', 'changing', 'changed', 'timeupdate', 'onwaiting', 'fullscreenchange', 'fullscreenclick', 'loadedmetadata', 'onerror', 'noTrigger', 'onmute', 'onloadeddata'],
  data() {
    return {
      index: 0,
      listIndex: 0,
      datas: [],
      currentItem: {},
      current: 0,
      playing: false,
      // #ifndef APP
      useSwiper: false,
      // #endif
      touchable: false,
      context: null,
      videoKey: Date.now(),
      pagedatas: {
        fullScreen: false
      },
      disabledChange: true,
      lockedTimer: 0,
      errorTimer: 0,
      isImgList: false,
      showInitText: true,
      isChange: false,
      touchLock: false,
      showFullBtn: false,
      sliderLocked: false,
      changingLocked: false,
      transitionLocked: false,
      progress: {
        current: 0,
        duration: 1,
        currentStr: '00:00',
        durationStr: '00:00'
      },
      animation: null,
      aniOption: {
        delay: 0,
        duration: 100,
        timingFunction: 'ease-in',
        transformOrigin: '50% 50%'
      },
      player: null,
      config: {
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
        /** 是否显示全屏按钮 */
        showFullScreen: true,
        /** 全屏按钮配置 */
        fullScreenOption: {
          /** 按钮距底部高度 */
          bottom: 100,
          /** 按钮显示的内容 */
          text: "全屏观看"
        },
        /** -90=屏幕顺时针90度、0=正常竖向、90=屏幕逆时针90度、 */
        direction: '',
        /** 是否显示loading控件 */
        loading: false,
        /** 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽 */
        useVideo: true,
        /** swiper 滑动动画时长 */
        duration: 300,
        /** contain：包含，fill：填充，cover：覆盖 */
        objectFit: "contain",
        /** hardware：硬解码，software：ffmpeg软解码 */
        codec: "software",
        /** 0：普通模式，1：平滑播放模式（降级），2： M3U8优化模式 */
        playStrategy: 1
      },
      soundMute: true, // 預設為靜音
    };
  },
  computed: {
    maxWidth() {
      return this.config.width;
    },
    maxHeight() {
      let height = 0;
      // #ifdef MP-WEIXIN
      height = this.config.height - 30;
      // #endif
      // #ifndef MP-WEIXIN
      height = this.config.height - 20;
      // #endif
      return height;
    },
    full() {
      return `width:${this.maxWidth}px;height:${this.config.height}px;`;
    },
    videoFull() {
      return `width:${this.maxWidth}px;height:${this.maxHeight}px;`;
    },
    criticalHeight() {
      return Math.floor(this.maxHeight / 3);
    },
    touchHeight() {
      return this.touch.touchDistance || 80;
    }
  },
  onHide() {
    this.hidePause()
  },
  onShow() {
    this.showPlay();
  },
  watch: {
    startIndex: {
      handler(index) {
        const startIndex = Number(index || 0);
        const length = this.list.length;
        if (startIndex >= 0 && startIndex < length) {
          this.listIndex = startIndex;
          this.resetData(startIndex);
          this.$forceUpdate();
          const that = this;
          that.$nextTick(() => {
            that.disabledChange = false;
            that.showInit = false;
            that.initVideoContext(that.current);
            that.getContext(that.current)?.play();
            // #ifdef H5 | WEB
            setTimeout(() => that.play(), 500);
            // #endif
            that.loadmore();
          });
        }
      }
    },
    options: {
      handler(newVal) {
        this.config = Object.assign(this.config, newVal);
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.datas = [];
    const length = this.list.length;
    if (length < 3) {
      this.showInitText = false;
      // uni.showToast({ title: 'list 数据不得少于3条', icon: 'none', duration: 5000, mask: true });
      // throw new Error(` list列表数据条数不可少于3条，当前数据为【${length}】条 `);
      // #ifndef APP
      this.useSwiper = false;
      // #endif
      this.datas = this.list;
      this.currentItem = this.datas[this.current];
      this.isImgList = this.isImageList(this.currentItem);
      setTimeout(() => {
        this.disabledChange = false;
        this.showInitText = false;
      }, 1000);
      return;
    }
    // #ifdef APP
    this.touchable = !this.useSwiper;
    // #endif
    const startIndex = Number(this.startIndex || 0);
    if (startIndex > 0 && startIndex < length) {
      this.listIndex = startIndex;
      this.resetData(startIndex);
    } else {
      this.datas = this.list.slice(0, 3);
      this.currentItem = this.datas[this.current];
      this.isImgList = this.isImageList(this.currentItem);
    }
    setTimeout(() => {
      this.disabledChange = false;
      this.showInitText = false;
    }, 1000);
  },
  mounted() {
    const that = this;
    // 用意是為了判斷第一個是否為圖片，如果是圖片則不進行靜音播放
    if (this.isImgList) return;
    that.$nextTick(() => {
      // #ifdef APP
      that.animation = useAnimation.createAnimation(that.aniOption, that);
      // #endif
      setTimeout(() => {
        that.initVideoContext(that.current)
        // 確保 pagedata 有資料，才進行靜音播放
        that.getContext(that.current).muted = true
        that.getContext(that.current).play()
          , 500
      });
    });
  },
  methods: {
    change({ detail }) {
      if (this.disabledChange) { return; }
      this.changeLocked = true;
      this.disabledChange = true;
      clearTimeout(this.lockedTimer);
      clearTimeout(this.noTriggerTimer);
      this.getContext(this.current)?.pause();
      // #ifdef H5 | WEB
      this.pauseAll();
      // #endif
      this.resetprogressItem();
      this.reset();
      this.current = detail.current;
      this.resetIndex(this.current);
      // #ifndef APP
      this.useSwiper = this.listIndex > 0 && this.list.length - 1 > this.listIndex;
      // #endif
      this.playerId = `video_${this.current}`;
      this.videoKey = Date.now();
      const that = this;
      this.lockedTimer = setTimeout(async () => {
        that.endTouchTop = 0;
        that.isChange = false;
        that.disabledChange = false;
        await that.initVideoContext(that.current);
        // 當切換的時候，將靜音關閉 ，切換=>用戶行為 故可以播放中關閉靜音
        setTimeout(() => {
          if (that.playing) {
            that.toggleMute(true);
          } else {
            that.player.play();
            that.toggleMute(true);
          }
        }, 300);
        if (that.currentItem && that.currentItem.playTime > 1) {
          that.setSeek(that.currentItem.playTime);
        }
        that.context = that.getContext(that.current)?.play();
        // #ifdef H5
        if (that.player && that.player.play) that.player.play();
        that.bindAutoChange(that.playerId);
        // #endif
      }, 300);
      this.loadmore();
      this.$emit("onchange", this.emitParam());
    },
    isImageList(item) {
      this.isImgList = item && Array.isArray(item?.imgList) && item.imgList.length > 0;
      if (this.isImgList) {
        this.player = null;
        this.context = null;
      }
      return this.isImgList;
    },
    resetIndex(_index) {
      const current = this.current;
      const length = this.list.length;
      if (this.index - current == 2 || this.index - current == -1) {
        this.listIndex = this.listIndex + 1 == length ? 0 : this.listIndex + 1;
        this.index = this.index + 1 == 3 ? 0 : this.index + 1;
        this.resetData(this.listIndex);
      } else if (this.index - current == -2 || this.index - current == 1) {
        this.listIndex = this.listIndex - 1 == -1 ? length - 1 : this.listIndex - 1;
        this.index = this.index - 1 == -1 ? 2 : this.index - 1;
        this.resetData(this.listIndex);
      }
      this.currentItem = this.datas[current];
      this.isImgList = this.isImageList(this.currentItem);
    },
    resetData(index) {
      const length = this.list.length;
      this.datas[this.index] = this.list[index];
      this.datas[this.index - 1 == -1 ? 2 : this.index - 1] = this.list[index - 1 == -1 ? length - 1 : index - 1];
      this.datas[this.index + 1 == 3 ? 0 : this.index + 1] = this.list[index + 1 == length ? 0 : index + 1];
      this.currentItem = this.list[index];
      this.isImgList = this.isImageList(this.currentItem);
    },
    emitParam(idx = true, ctx = true, vio = true, ply = true) {
      return {
        index: idx ? this.listIndex : null,
        context: ctx ? this.context : null,
        video: vio ? this.currentItem : null,
        playing: ply ? this.playing : null
      };
    },
    transition({ detail }) {
      this.isChange = true;
      this.$emit("transition", detail);
      this.transitionedLocked = true;
      if (this.disabledChange) return;
      if (!this.touchLock) { return; }
      if (this.endLoken) { return; }
      this.endTouchTop = detail.dy;
      clearTimeout(this.moveingTimer);
      this.transitionLocked = true;
      this.startTime = 0;
      this.offsetTop = detail.dy;
    },
    animationfinish({ detail }) {
      this.$emit("animationfinish", detail);
      // #ifdef APP
      if (!this.changeLocked && this.transitionedLocked) {
        const current = detail.current + 1 > 2 ? 0 : detail.current + 1;
        if (this.endTouchTop >= this.touchHeight && !isNaN(current)) {
          this.change({ detail: { current } });
        }
      }
      // #endif
    },
    start(event) {
      // #ifdef APP
      if (event?.preventDefault) event?.preventDefault();
      if (this.sliderLocked) { return; }
      this.offsetTop = 0;
      this.endTouchTop = 0;
      this.touchLock = true;
      this.isChange = false;
      this.endLoken = false;
      this.execLocked = false;
      this.changeLocked = false;
      this.moveingLocked = false;
      this.transitionedLocked = false;
      const touch = event.changedTouches[0];
      this.startY = Math.ceil(touch.pageY);
      this.startTime = Date.now();
      this.transitionLocked = false;
      // #endif
      this.longpressLocked = false;
    },
    move(event) {
      // #ifdef APP
      if (event?.preventDefault) event?.preventDefault();
      if (this.changingLocked) return;
      if (this.isChange || this.disabledChange || !this.touchLock || this.sliderLocked) { return; }
      const touch = event.changedTouches[0];
      const pageY = event.pageY;
      const offsetY = Math.ceil(this.startY - touch.pageY);
      this.moveOffsetTop = Math.floor(this.startY - pageY);
      if (Math.abs(offsetY) >= 2 && !this.transitionLocked && this.useSwiper) {
        if (!this.moveingLocked) {
          this.moveingTimer = setTimeout(() => {
            this.execLocked = true;
            this.useTransition(offsetY * -1, 0);
          }, 200);
          this.moveingLocked = true;
        } else if (this.execLocked) {
          clearTimeout(this.moveingTimer);
          this.useTransition(offsetY * -1, 0);
        }
      } else {
        this.useTransition(offsetY * -1, 0);
      }
      // #endif
    },
    end(event) {
      // #ifdef H5 | WEB
      if (!this.transitionLocked && !this.disabledChange && !this.changingLocked) {
        this.dbclick(Date.now());
      }
      // #endif
      // #ifdef APP
      clearTimeout(this.moveingTimer);
      if (event?.preventDefault) event?.preventDefault();
      this.endLoken = true;
      if (this.sliderLocked || this.longpressLocked) { return; }
      this.touchend(event);
      if (this.isChange || this.disabledChange || !this.touchLock || this.transitionLocked) { return; }
      this.touchLock = false;
      const touch = event.changedTouches[0];
      const pageY = touch.pageY;
      this.moveOffsetTop = Math.floor(this.startY - pageY);
      this.offsetTop = this.moveOffsetTop;
      const endY = Math.ceil(pageY);
      const offsetTop = this.startY - endY;
      if (!this.transitionLocked && offsetTop < 0 && this.listIndex == 0) {
        this.useTransition('0');
        this.noTriggerTimer = setTimeout(() => {
          if (this.isImgList) { return; }
          this.$emit('noTrigger', { code: 'E40', msg: `到顶了` });
        }, 200);
        return;
      }
      if (!this.transitionLocked && offsetTop > 0 && this.listIndex >= this.list.length - 1) {
        this.useTransition('0');
        this.noTriggerTimer = setTimeout(() => {
          if (this.isImgList) { return; }
          this.$emit('noTrigger', { code: 'E41', msg: `到底了` });
        }, 200);
        return;
      }
      const upDistance = Number(this.touch.upDistance || 20);
      const downDistance = Number(this.touch.downDistance || -40);
      if ((offsetTop > 0 && offsetTop < upDistance) || (offsetTop < 0 && offsetTop > downDistance)) {
        this.useTransition('0');
        this.noTriggerTimer = setTimeout(() => {
          if (this.isImgList) { return; }
          this.$emit('noTrigger', { code: 'E43', msg: `滑动距离太短了` });
        }, 200);
        return;
      }
      const endTime = Date.now();
      const offsetTime = endTime - this.startTime;
      const slidTime = Number(this.touch.slidTime || 200);
      if (!this.transitionLocked && offsetTime > slidTime && this.criticalHeight > offsetTop) {
        this.useTransition('0');
        this.noTriggerTimer = setTimeout(() => {
          if (this.isImgList) { return; }
          this.$emit('noTrigger', { code: 'E42', msg: `滑动速度太慢了` });
        }, 200);
        return;
      }
      const slided = (this.current + 1 > 2 && offsetTop > 0);
      if (!this.transitionLocked && this.useSwiper && slided && !this.force && !this.isImgList) {
        this.useTransition('0');
        this.noTriggerTimer = setTimeout(() => {
          if (this.isImgList) { return; }
          this.$emit('noTrigger', { code: 'E44', msg: "未能触发swiper滑动事件，请重新滑动" });
        }, 200);
        return;
      }
      if (!this.transitionLocked && offsetTop > 0) {
        const index = this.current + 1 > 2 ? 0 : this.current + 1;
        this.change({ detail: { current: index } });
        return;
      }
      if (!this.transitionLocked && offsetTop < 0) {
        const index = this.current - 1 < 0 ? 2 : this.current - 1;
        this.change({ detail: { current: index } });
        return;
      }
      // #endif
    },
    imgChange() {
      clearTimeout(this.noTriggerTimer);
    },
    loadmore() {
      const index = this.listIndex;
      const length = this.list.length;
      const criticalVal = Number(this.config.criticalVal || 2);
      if (index >= length - criticalVal) {
        this.$emit("loadmore");
      }
    },
    longpress(_row) {
      this.longpressLocked = true;
      this.$emit("longTap", this.emitParam());
    },
    onclick(_row) {
      console.log("🚀 ~ onclick ~ _row:", _row)
      if (this.longpressLocked) return;
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
      this.$emit('onclick', this.emitParam());
    },
    dbclick(lastTime = 0) {
      const clickTime = this.clickTime || 0;
      if (lastTime <= 0 || clickTime <= 0 || lastTime - clickTime <= 0) {
        this.clickTime = lastTime;
        return;
      }
      this.clickTime = lastTime;
      if (lastTime - clickTime <= 200) {
        this.clickTime = 0;
        this.$emit('ondblclick', this.emitParam());
      }
    },
    onplay(_e) {
      this.playing = true;
      clearTimeout(this.errorTimer);
      this.$emit("onplay", this.emitParam());
    },
    onpause(_e) {
      this.playing = false;
      clearTimeout(this.errorTimer);
      this.$emit("onpause", this.emitParam());
    },
    onended(_e) {
      this.resetprogressItem();
      // #ifndef H5
      if (this.config.autoChange === true) {
        let idx = this.current + 1;
        if (idx >= 3) { idx = 0; }
        this.currentItem.playTime = 0;
        this.change({ detail: { current: idx } });
      }
      // #endif
      this.$emit("onended", this.emitParam());
    },
    changing(event) {
      this.startTime = 0;
      this.sliderLocked = true;
      this.changingLocked = true;
      const val = event.detail.value;
      this.progress.currentStr = this.handleTime(Math.ceil(val));
      this.$emit("changing", this.progress);
    },
    sliderChange(event) {
      const that = this;
      this.offsetTop = 0;
      this.sliderLocked = true;
      this.changingLocked = true;
      const val = event.detail.value;
      clearTimeout(this.slideTimer);
      if (val && !isNaN(val) && this.config.useVideo) {
        this.progress.current = val;
        this.progress.currentStr = this.handleTime(Math.ceil(val));
        this.setSeek(val);
        this.play();
      }
      this.slideTimer = setTimeout(() => {
        that.sliderLocked = false;
        that.changingLocked = false;
      }, 300);
      this.startTime = 0;
      this.$emit("changed", this.progress);
    },
    ontimeupdate(e) {
      if (!this.config.useVideo) return;
      const detail = e.detail ?? e?.target;
      const duration = Math.ceil(e?.detail?.duration ?? e?.target?.duration);
      const currentTime = Math.ceil(e?.detail?.currentTime ?? e?.target?.currentTime);
      if (isNaN(duration) || isNaN(currentTime)) {
        this.resetprogressItem();
        return;
      }
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
    onwaiting(_e) {
      this.$emit("onwaiting", this.emitParam());
    },
    fullscreenchange(event) {
      if (event?.preventDefault) event?.preventDefault();
      const { fullScreen } = event.detail;
      this.pagedatas.fullScreen = fullScreen;
      uni.hideToast();
      this.$emit("fullscreenchange", event.detail);
    },
    fullscreenclick(event) {
      this.$emit("fullscreenclick", event.detail);
    },
    loadedmetadata(event) {
      this.$emit("loadedmetadata", event);
    },
    onloadeddata(event) {
      this.$emit("onloadeddata", event);
    },
    onerror(_e) {
      this.playing = false;
      this.resetprogressItem();
      if (!this.config.useVideo) return;
      this.$emit("onerror");
      const that = this;
      clearTimeout(this.errorTimer);
      this.errorTimer = setTimeout(() => {
        uni.showToast({ title: '播放失败，即将切换下一个', icon: 'none', duration: 1500, mask: false });
        let idx = that.current + 1;
        if (idx >= 3) { idx = 0; }
        that.change({ detail: { current: idx } });
      }, 3000);
    },
    setSeek(val) {
      if (this.isImgList || !this.config.useVideo) {
        this.player = null;
        this.context = null;
        return;
      }
      if (!val || isNaN(val) || val < 0) { return; }
      this.context = this.getContext(this.current);
      // #ifdef H5 | WEB
      if (this.player && this.player.currentTime) {
        this.player.currentTime = val;
      }
      // #endif
      if (this.context && this.context.seek) {
        this.context?.seek(val);
      }
    },
    setRate(rate) {
      if (this.isImgList || !this.config.useVideo) {
        this.player = null;
        this.context = null;
        return;
      }
      if (!rate || isNaN(rate) || rate < 0) { return; }
      this.context = this.getContext(this.current);
      // #ifdef H5 | WEB
      if (this.player && this.player.playbackRate) {
        this.player.playbackRate = rate;
      }
      // #endif
      if (this.context && this.context.playbackRate) {
        this.context.playbackRate(rate);
      }
    },
    fullScreen() {
      // #ifdef H5 | WEB
      if (this.player?.requestFullScreen) {
        this.player?.requestFullScreen();
      } else if (this.player?.mozRequestFullScreen) {
        this.player?.mozRequestFullScreen();
      } else if (this.player?.webkitRequestFullscreen) {
        this.player?.webkitRequestFullscreen();
      } else if (this.player?.msRequestFullscreen) {
        this.player?.msRequestFullscreen();
      }
      // #endif
      const context = this.getContext(this.current);
      if (context && context.requestFullScreen) {
        context.requestFullScreen();
      }
    },
    exitFullScreen() {
      const context = this.getContext(this.current);
      if (context && context.exitFullScreen) {
        context.exitFullScreen();
      }
    },
    toggleMute(status) {
      try {
        if (this.isImgList || !this.config.useVideo) { return; }
        const context = this.getContext(this.current);
        // #ifdef H5
        if (this.player && this.player.play) {
          // this.player.pause();
          this.player.muted = !status;
          this.soundMute = this.player.muted;
          // this.player.play();
        }
        // #endif
        if (context && context.play) {
          // context.pause();
          context.mute = !status;
          this.soundMute = context.mute;
          // context.play();
        }
        this.$emit('onmute', { status: !status });
      } catch (e) {
        console.error(e);
      }
    },
    play() {
      try {
        if (this.isImgList || !this.config.useVideo) { return; }
        const context = this.getContext(this.current);
        // #ifdef H5
        console.log("🚀 ~ play ~ this.player && this.player.play:", this.player && this.player.play)
        if (this.player && this.player.play) {
          this.player.play();
        }
        // #endif
        console.log("🚀 ~ play ~ context && context.play:", context)
        if (context && context.play) {
          context.play();
          context.mute = false;
        }
        this.playing = true;
      } catch (e) {
        console.error(e);
      }
    },
    pause() {
      try {
        if (this.isImgList || !this.config.useVideo) { return; }
        const context = this.getContext(this.current);
        // #ifdef H5
        if (this.player && this.player.pause) {
          this.player.pause();
        }
        // #endif
        if (context && context.pause) {
          context.pause();
        }
        this.playing = false;
      } catch (e) {
        console.error(e);
      }
    },
    stop() {
      try {
        if (this.isImgList || !this.config.useVideo) { return; }
        this.pause();
        const context = this.getContext(this.current);
        if (context && context.stop) {
          context.stop();
        }
        this.playing = false;
      } catch (e) { }
    },
    bindAutoChange(vid) {
      // #ifdef H5
      if (!this.config.autoChange) { return; }
      let that = this;
      let $video = document.getElementById(vid);
      if (!$video || !$video.addEventListener) return;
      $video.addEventListener('ended', function () {
        let idx = that.current + 1;
        if (idx >= 3) { idx = 0; }
        if (that.currentItem) {
          that.currentItem.playTime = 0;
        }
        that.change({ detail: { current: idx } });
      });
      // #endif
    },
    // #ifdef H5 | WEB
    createVideo(item, index) {
      const autoChange = this.config.autoChange;
      const src = item.url || item.src || "";
      return `<video id="video_${index}" src="${src}" poster="${item.poster}" title="${item.title}"
              class="dplayer-video dplayer-video-current swiper-video" loop="${!autoChange}" muted="${true}"
              preload="auto" x5-video-orientation="portrait" enable-progress-gesture="false" webkit-playsinline="true"
              playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5-page" objectFit="contain"
              style="${this.videoFull};pointer-events:auto !important;object-position: center;" key="${this.videoKey}">
              </video>`;
    },
    remEvents(player) {
      if (!player) return;
      if (player.pause) { player.pause(); }
      if (player.removeEventListener) {
        player.removeEventListener("play", this.onplay);
        player.removeEventListener("pause", this.onpause);
        player.removeEventListener("timeupdate", this.ontimeupdate);
        player.removeEventListener("ended", this.onended);
        player.removeEventListener("error", this.onerror);
        player.removeEventListener("waiting", this.onwaiting);
        player.removeEventListener("loadedmetadata", this.loadedmetadata);
        player.removeEventListener("loadeddata", this.onloadeddata);
        player.removeEventListener("load", this.fullscreenchange);
      }
    },
    bindEvents() {
      if (!this.player) return;
      if (this.player.addEventListener) {
        this.player.addEventListener("play", this.onplay);
        this.player.addEventListener("pause", this.onpause);
        this.player.addEventListener("timeupdate", this.ontimeupdate);
        this.player.addEventListener("ended", this.onended);
        this.player.addEventListener("error", this.onerror);
        this.player.addEventListener("waiting", this.onwaiting);
        this.player.addEventListener("loadedmetadata", this.loadedmetadata);
        this.player.addEventListener("loadeddata", this.onloadeddata);
      }
    },
    bindHlsPlayer() {
      try {
        let _this = this;
        if (Hls.isSupported()) {
          this.hls = new Hls();
          if (this.currentItem) { this.hls.loadSource(this.currentItem.url); }
          this.hls.attachMedia(this.player);
          if (Hls.Events && Hls.Events.MANIFEST_PARSED) {
            this.hls.on(Hls.Events.MANIFEST_PARSED, function () {
              try { if (_this.player.play) { _this.player.play(); } } catch (e) { }
            });
          }
        } else if (_this.player && _this.player.canPlayType('application/vnd.apple.mpegURL')) {
          if (this.currentItem) { _this.player.src = this.currentItem.url; }
          _this.player.addEventListener('loadedmetadata', function () {
            try { if (_this.player.play) { _this.player.play(); } } catch (e) { }
          });
        }
      } catch (e) {
        console.error("播放器初始化出错：", e);
      }
    },
    initPlayer() {
      if (this.isImgList) { return; }
      if (!this.currentItem || !this.currentItem.url) { return; }
      console.log("🚀 ~ initPlayer ~ this.player:", this.player)
      if (!this.player) {
        this.player = document.querySelector(`#${this.playerId} video`);
      }
      this.setPlayer();
      this.bindEvents();
      if (this.currentItem.url && this.currentItem.url.includes(".m3u8")) {
        try { if (this.hls && this.hls.destroy) this.hls.destroy(); } catch (_e) { }
        this.bindHlsPlayer();
      }
    },
    // 初始化播放器設置
    setPlayer() {
      if (this.isImgList) { return; }
      console.log("🚀 ~ setPlayer ~ this.playerId:", this.playerId)
      if (!this.player) {
        this.player = document.querySelector(`#${this.playerId} video`);
      }
      if (!this.player) return;
      console.log("🚀 ~ setPlayer ~ this.player:", this.player)
      this.player.loop = !this.config.autoChange;
      let currentItem = this.currentItem; // 當前頁數資源
      this.player.src = currentItem.url; // 資源路徑
      this.player.title = currentItem.title; // 資源標題
      this.player.poster = currentItem.poster; // 預覽圖
      this.player.muted = true; // 強制設置為靜音
      // this.player.autoplay = true; // 強制設置為靜音
      // 初始化聲音狀態 為靜音 true
      this.soundMute = this.player.muted;
      // 才可播放
      // this.player.play()
    },
    // #endif
    reset() {
      // #ifdef H5 | WEB
      this.remEvents(this.player);
      try { if (this.hls && this.hls.destroy) this.hls.destroy(); } catch (_e) { }
      this.player = null;
      // #endif
      this.currentItem = null;
      this.context = null;
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
    // #ifdef APP
    dblclick(row) {
      this.currentItem = row;
      this.$emit('ondblclick', this.emitParam());
    },
    touchend(_e) {
      let currentTime = Date.now();
      if (currentTime - this.lastTouchTime <= 200) {
        this.dblclick(this.currentItem);
        this.lastTouchTime = 0;
        return;
      }
      this.lastTouchTime = currentTime;
    },
    // #endif
    resetprogressItem() {
      this.progress = {
        current: 0,
        duration: 1,
        currentStr: "00:00",
        durationStr: "00:00"
      };
    },
    getContext(index) {
      const key = `video_${index}`;
      const context = this.pagedatas[key];
      if (this.isImgList || !context || !context.play || !context.pause || !this.config.useVideo) {
        this.context = null; this.player = null;
        return { play() { }, pause() { }, seek() { } };
      }
      // #ifdef H5 | WEB
      if (!this.player) {
        this.player = document.querySelector(`#${this.playerId} video`);
      }
      // #endif
      return document.getElementById(context);
    },
    async initVideoContext(index) {
      if (this.isImgList || !this.config.useVideo) {
        this.context = null; this.player = null;
        return { play() { }, pause() { }, seek() { } };
      }
      const key = `video_${index}`;
      this.playerId = key;
      let videocontext = uni.createVideoContext(key, this);
      this.pagedatas[key] = videocontext;
      // #ifdef H5
      this.player = document.querySelector(`#${this.playerId} video`);
      this.initPlayer();
      this.bindAutoChange(this.playerId);
      // #endif
      return videocontext;
    },
    useTransition(val, opacity = 1) {
      // #ifdef APP-NVUE
      if (!this.animation || !this.animation.run) {
        this.animation = useAnimation.createAnimation(this.aniOption, this);
      }
      this.animation?.translateY(val);
      this.animation?.opacity(opacity);
      this.animation?.run(this.$refs.ani[this.current]);
      // #endif
    },
    pauseAll() {
      if (!this.isImgList && this.config.useVideo) {
        this.getContext(this.current)?.pause();
      }
      Object.values(this.pagedatas).forEach((ctx) => ctx && ctx.pause && ctx.pause());
      // #ifdef H5 | WEB
      document.querySelectorAll("video").forEach((vid) => vid && vid.pause && vid.pause());
      // #endif
    },
    hidePause() {
      if (!this.isImageList(this.currentItem) && this.config.useVideo) {
        this.pauseAll();
      }
    },
    showPlay() {
      if (!this.isImageList(this.currentItem) && this.config.useVideo) {
        this.getContext(this.current)?.play();
      }
    }
  },
  beforeDestroy() {
    this.stop();
    this.reset();
    clearTimeout(this.errorTimer);
    clearTimeout(this.noTriggerTimer);
    Object.values(this.pagedatas).forEach((ctx) => ctx && ctx.pause && ctx.pause());
    // #ifdef H5 | WEB
    this.remEvents(this.player);
    document.querySelectorAll("video").forEach((video) => video && video.pause && video.pause());
    // #endif
    this.currentItem = null;
    this.current = 0;
    this.player = null;
    this.playing = false;
    this.context = null;
    this.pagedatas = null;
    this.videoContext = null;
    this.isImgList = false;
  },
}
</script>

<style scoped lang="scss">
.ml-swiper-v3 {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* #ifndef APP-NVUE */
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
  will-change: transform;
  /* #endif */
  padding: 0;
  overflow: hidden;
  background: rgba(0, 0, 22, 0.9);
  z-index: 90;
}

.ml-swiper-v3-item {
  position: relative;
  /* #ifndef APP-NVUE */
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* #endif */
  overflow: hidden;
  z-index: 90;
}

.swiper-video {
  position: absolute;
  /* #ifndef APP-NVUE */
  margin: 0 auto;
  object-position: center;
  object-fit: contain;
  /* #endif */
  overflow: hidden;
  background: #000;
  z-index: 0;
}

.ml-swiper-v3-body {
  padding: 0;
  /* #ifndef APP-NVUE */
  overflow: hidden;
  margin: 0 auto;
  color: #fff;
  text-align: center;
  /* #endif */
}

.ml-swiper-v3-right {
  position: absolute;
  right: 0;
  top: 0;
  /* #ifndef APP-NVUE */
  display: flex;
  overflow: hidden;
  padding: 1vh 0.5vh;
  color: #fff;
  text-align: center;
  /* #endif */
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: 99;
}

.ml-swiper-v3-bottom {
  position: absolute;
  left: 0;
  /* #ifdef MP-WEIXIN */
  bottom: 35px;
  /* #endif */
  /* #ifndef MP-WEIXIN */
  bottom: 30px;
  /* #endif */
  /* #ifndef APP-NVUE */
  overflow: hidden;
  padding: 1vh 0.5vh;
  color: #fff;
  display: flex;
  /* #endif */
  lines: 5;
  flex-wrap: wrap;
  flex-direction: column;
  z-index: 98;
}

.ml-swiper-v3-progress-view {
  position: absolute;
  height: 20px;
  /* #ifndef APP-NVUE */
  width: 100%;
  /* #endif */
  bottom: 0;
  /* #ifdef MP-WEIXIN */
  bottom: 10px;
  /* #endif */
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
}

.ml-swiper-v3-progress {
  /* #ifndef APP-NVUE */
  width: 100%;
  /* #endif */
}

.ml-swiper-v3-line {
  margin: 0 5px;
}

.ml-swiper-v3-line-val {
  color: #fff;
  font-weight: 200;
  font-size: 12px;
  padding: 0 5px;
  text-align: center;
}

.ml-swiper-v3-fullscreen-view {
  position: absolute;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.ml-swiper-v3-fullscreen {
  width: 70px;
  height: 25px;
  padding: 5px;
  /* #ifndef APP-NVUE */
  display: flex;
  text-align: center;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1rpx solid #fff;
  background: rgba(0, 0, 0, 0.35);
}

.ml-swiper-v3-fullscreen-text {
  text-align: center;
  font-weight: 100;
  font-size: 13px;
  color: #fff;
}

.init-mask {
  position: fixed;
  margin: 0;
  /* #ifndef APP-NVUE */
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  text-align: center;
  /* #endif */
  top: 0;
  left: 0;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #000;
  z-index: 999;
}

.init-text {
  font-size: 15px;
  color: #fff;
  text-align: center;
}

.appTipView {
  /* #ifdef APP-VUE */
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  /* #endif */
}

.appTipText {
  /* #ifdef APP-VUE */
  text-align: center;
  margin: 0 auto;
  padding: 50px 0;
  color: #ff5918;
  font-size: 4vh;
  font-weight: 800;
  margin: 0 30px;
  /* #endif */
}
</style>