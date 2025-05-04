<template>
  <view class="ml-scroll" :style="full">
    <swiper :current="current" circular :style="full" @change="change">
      <swiper-item :style="full" v-for="(img, idx) in imgList" :key="idx">
        <image class="ml-scroll-img" :src="img" mode="aspectFit" :style="full" />
      </swiper-item>
    </swiper>
    <view class="ml-scroll-img-dot" :style="'width:' + width + ';bottom: ' + dotBottom + 'px'">
      <view v-for="(_item, index) in imgList" :key="index" :style="'width: ' + dotWidth + 'px;'" class="img-dot">
        <view :class="current === index ? 'cur-img-dot' : 'img-dot'" :style="'width: ' + dotWidth + 'px;'" @tap="current=index"></view>
      </view>
    </view>
  </view>
</template>

<script>
  /**
   * mlSwiperImage 图片滑动列表
   * @description 用于展示图片，可以左右滑动切图
   * @property {Array<String>} imgList 图片数据列表
   * @property {String} width 组件宽度，默认设备宽度
   * @property {String} height 组件高度，默认设备高度
   * @property {Number} dotBottom 距离底部位置
   * @property {Boolean} useSwiper 是否使用swiper组件
   */
  export default {
    name: "ml-swiper-image",
    props: {
      /** 图片资源列表 */
      imgList: {
        type: Array,
        default: [],
        required: true
      },
      /** 组件宽度 */
      width: {
        type: [String, Number],
        default: uni.getSystemInfoSync().windowWidth,
        required: false
      },
      /** 组件高度 */
      height: {
        type: [String, Number],
        default: uni.getSystemInfoSync().windowHeight,
        required: false
      },
      /** 距离底部距离 */
      dotBottom: {
        type: Number,
        default: 10,
        required: false
      },
    },
    emits: ['imgChange'],
    data() {
      return {
        current: 0, // 当前索引位置
        winWidth: uni.getSystemInfoSync().windowWidth,
      }
    },
    computed: {
      full() {
        return `width:${this.width}px;height:${this.height}px;`;
      },
      dotWidth() {
        return Math.floor(this.winWidth / this.imgList.length);
      }
    },
    methods: {
      change({ detail }) {
        const { current } = detail;
        this.current = current;
        this.$emit("imgChange");
      },
    }
  }
</script>

<style scoped lang="scss">
  .ml-scroll {
    position: relative;
    margin: 0;
    /* #ifndef APP-NVUE */
    margin: 0 auto;
    text-align: center;
    white-space: nowrap;
    /* #endif */
  }

  .ml-scroll-item {
    margin: 0;
    /* #ifndef APP-NVUE */
    margin: 0 auto;
    text-align: center;
    /* #endif */
  }

  .ml-scroll-img {
    /* #ifndef APP-NVUE */
    object-fit: contain;
    object-position: center;
    /* #endif */
  }

  .ml-scroll-img-dot {
    position: absolute;
    bottom: 15px;
    /* #ifdef MP-WEIXIN */
    bottom: 10px;
    /* #endif */
    left: 0;
    margin: 0;
    /* #ifndef APP-NVUE */
    width: 100%;
    margin: 0 auto;
    display: flex;
    text-align: center;
    /* #endif */
    height: 5px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }

  .img-dot {
    height: 3px;
    margin: 0 1px;
    border-radius: 1px;
    background: #a5a5a5;
  }

  .cur-img-dot {
    height: 3px;
    margin: 0 1px;
    border-radius: 1px;
    background: #ffffff;
  }
</style>