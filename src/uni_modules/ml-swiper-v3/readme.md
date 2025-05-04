## 组件说明

**支持选集播放：提供了`startIndex`可以指定从第几个资源开始**

**支持自动切换：提供了`autoChange`属性，播放完成后可以自动切换下一个**

**支持拖动快进：提供了拖动进度条快进、回退功能，并且可以通过`showProgress`实现自定义进度条**

**支持自定义播放器：提供了`useVideo`属性，在不使用默认播放器的情况下可以自定义播放器**

**支持自定义全屏：提供了`fullScreenOption`可以配置全屏按钮样式，并且可以通过`showFullScreen`实现自定义全屏按钮**

**支持选择是否使用swiper组件：提供了`useSwiper`属性，可以通过该属性选择使用自定义动画还是swiper组件**

**支持滑动动画配置：提供了`touch`配置，可以配置滑动速度、滑动距离、滑动时间等来动态计算是否需要触发切换下一个**



## 案例报错说明

**缺少函数名**

网页示例缺少函数名，可以直接使用`readme.md`中的示例代码（原因是，部分事件名在页面解析时被转义为空了，需要自己补全）

```js
// @ondblclick 
function (e) {  // 这里的函数名可能会被转义掉，如果函数名为空 请看注释 被转义掉的函数名为：ondblclick
    console.log(e);
}
```

> - **`使用案例时特别注意，案例中的函数名会被转义为空，报错时 请先检查是否存在函数名为空的，为空时补全后重新运行即可。`**



**试用时报错**

试用时报错：` Failed to mount component: template or render function not defined. found in......`

> 如果试用时组件运行报错 `[Vue warn]: Failed to mount component: template or render function not defined. found in ......` 请注意，原因是试用组件 被加密了，导致无法被解析到，正常购买不会有问题，如有其他问题可在群里提出，作者看到后会帮助解决处理。



**解析失败，请重新发行**

未购买报错：`10:16:03.107 [plugin:uni:helpers] 付费插件：uni_modules/ml-swiper-v3 解析失败，请重新发行`

> 未购买报错，付费插件需要购买才能使用，购买后需要删除项目中原来导入的uni_modules下的`uni_modules/ml-swiper-v3`组件，删除后重新导入后买后的即可（可以把`unpackage`包也删除掉，运行时会重新生成）



**初始值为空**

初始值为空：`[system] TypeError: Cannot read properties of undefined (reading 'includes')at ......`

> 如果购买了插件，运行时报错：`[system] TypeError: Cannot read properties of undefined at ......`,




## 属性 props

| 属性名       | 默认值                                                       | 属性说明                                                     | 必填 |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| `list`       | []                                                           | { <br />`url` : " 资源地址`必须` ", <br />poster: "预览图", <br />title: "资源标题", <br />imgList: "图片集，当资源为非视频且有该属性时，会展示这里的图片，如果是视频资源则不要提供该属性，或者将该属性值置为空，否则将不会展示视频数据" <br />} | `是` |
| `startIndex` | 0                                                            | 起始索引，从第 n 个资源开始，可以动态变更，实现类似短剧选集的功能 | 否   |
| `force`      | false                                                        | 强制触发：官方swiper动画失效时，强制触发滑动事件【`APP端特有属性`】<br />会出现上下动画错乱的问题 | 否   |
| `useSwiper`  | true                                                         | 是否使用 swiper 组件，为 false 时，将使用自定义动画和自定义事件【`APP端特有属性`】 | 否   |
| `touch`      | {<br />upDistance: 20,<br/>downDistance: -40,<br/>slidTime: 200,<br/>touchDistance: 80<br />} | 滑动配置【`APP端特有属性`】<br />上滑距离：不使用swiper组件时，上滑X（默认20）触发上滑事件，加载下一个<br/>下滑距离：不使用swiper组件时，下滑X（默认-40）触发下滑事件，加载上一个<br/>滑动时间：不使用swiper组件时，滑动时间需要在X（默认200）内才触发滑动事件<br/>swiper 滑动距离：使用swiper时，官方滑动失效时上滑X（默认80）自动触发滑动事件 | 否   |
| `options`    | {}                                                           | 组件配置项，见下文 `options` 配置项详情                      | 否   |
|              |                                                              |                                                              |      |

**`options` 配置项**

| 属性名           | 默认值                                            | 说明                                                         |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| width            | 默认同 `windowWidth` 一致                         | 组件宽度，uni.getSystemInfoSync().windowWidth                |
| height           | 默认同 `windowHeight` 一致                        | 组件高度，uni.getSystemInfoSync().windowHeight               |
| loadingText      | 加载中...                                         | 初始化提示内容                                               |
| criticalVal      | 2                                                 | 临界值，this.list.length - criticalVal <= current 触发加载更多 `@loadmore` 事件 |
| showProgress     | true                                              | 是否显示进度条，组件底部是否显示进度条，支持拖动快进/快退    |
| autoChange       | false                                             | 是否自动切换，当前视频播放完成后，是否自动播放下一个         |
| duration         | 300                                               | swiper 滑动动画时长                                          |
| direction        | -                                                 | 全屏时显示方向，同 [video](https://uniapp.dcloud.net.cn/component/video.html) 组件中的 `direction` 保持一致【`APP特有属性`】 |
| loading          | false                                             | video组件是否显示loading控件【`APP特有属性`】                |
| useVideo         | true                                              | 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽【`APP特有属性`】 |
| showFullScreen   | true                                              | 是否显示全屏按钮                                             |
| fullScreenOption | {<br />bottom: 100, <br />text: "全屏观看"<br />} | 全屏按钮配置项，showFullScreen为true时生效<br />bottom：按钮距底部高度，<br />text：按钮内容 |
|                  |                                                   |                                                              |
|                  |                                                   |                                                              |

## 属性示例

```html
<ml-swiper-v3 v-if="list.length > 0" :list="list" :startIndex="startIndex" :useSwiper="useSwiper" :force="force"
  :touch="touch" :options="options">
  <!-- ...... 部分内容省略 ...... -->
</ml-swiper-v3>
<script>
  export default {
    data() {
      return {
        list: [], // 数据列表 
        startIndex: 0, // 起始索引，从第 n 个资源开始，可以动态变更，实现类似短剧选集的功能
        force: false, // 强制触发：官方swiper动画失效时，强制触发滑动事件，会出现上下动画错乱的问题【APP特有属性】
        useSwiper: true, // 是否使用 swiper 组件，为 false 时，将使用自定义动画和自定义事件【APP特有属性】
        /** 滑动配置【APP特有属性】 */
        touch: {
          upDistance: 20, // 上滑距离
          downDistance: -40, // 下滑距离
          slidTime: 200, // 滑动时间
          touchDistance: 80 // swiper 滑动距离
        },
        /** 组件配置  */
        options: {
          width: uni.getSystemInfoSync().windowWidth, // 组件宽度 
          height: uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight - uni.getSystemInfoSync().safeAreaInsets.bottom, // 组件高度(适配安全距离)
          loadingText: "加载中...", // 初始化时的提示内容 
          criticalVal: 2, // 临界值 
          showProgress: true, // 是否显示进度条 
          autoChange: false, // 是否自动切换 
          showFullScreen: true, // 是否显示全屏按钮 
          fullScreenOption: { // 全屏按钮配置 
            bottom: 100, // 按钮距底部高度 
            text: "全屏观看" // 按钮显示的内容 
          },
          direction: 0, // 0=正常竖向、90=屏幕逆时针90度、-90=屏幕顺时针90度 【APP特有属性】
          loading: false, // 是否显示loading控件 【APP特有属性】
          useVideo: true, // 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽 【APP特有属性】
          duration: 300, // swiper 滑动动画时长
          objectFit: "contain", // contain：包含，fill：填充，cover：覆盖
          codec: "software", // hardware：硬解码，software：ffmpeg软解码
          playStrategy: 1 // 0：普通模式，1：平滑播放模式（降级），2： M3U8优化模式
        }
      }
    }
  }
</script>
```





## 事件 Event

> **`运行前仔细检查示例代码中的 事件名称是否为空，因为部分事件名称会被转移为''空`，导致无法直接运行**
> **`运行前仔细检查示例代码中的 事件名称是否为空，因为部分事件名称会被转移为''空`，导致无法直接运行**
> **`运行前仔细检查示例代码中的 事件名称是否为空，因为部分事件名称会被转移为''空`，导致无法直接运行**

| 事件名称            | 事件参数                                                     | 事件说明                                                     |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `@onchange`         | { index: number, video: Object }                             | 组件切换滑动事件，`index`当前索引，`video`当前视频资源数据   |
| `@transition`       | { dx: number, dy: number }                                   | 位置发生改变时会触发 transition 事件（APP端需要`useSwiper`为`true`生效，其他端正常） |
| `@animationfinish`  | event                                                        | 滑动动画完成事件（APP端需要`useSwiper`为`true`生效，其他端正常） |
| `@loadmore`         | -                                                            | 加载更多数据                                                 |
| `@longTap`          | { index: number, video: Object }                             | 长按事件                                                     |
| `@onclick`          | { index: number, playing: boolean }                          | 视频被点击时触发点击事件，`index`当前索引，`playing`是否正在播放 |
| `@ondblclick`       | { index: number, video: Object }                             | 双击事件，`index`当前索引，`video`当前视频资源数据           |
| `@onplay`           | { index: number, video: Object }                             | 播放开始事件，`index`当前索引，`video`当前视频资源数据       |
| `@onpause`          | { index: number, video: Object }                             | 播放暂停事件，`index`当前索引，`video`当前视频资源数据       |
| `@onended`          | -                                                            | 播放结束事件                                                 |
| `@changing`         | {<br /> index: number,<br />duration: number,<br />currentStr: string,<br />durationStr: string <br />} | 进度条拖动事件，当前时长和总时长以及格式化后的当前时间和总的时间 |
| `@changed`          | { <br />index: number,<br />duration: number,<br />currentStr: string,<br />durationStr: string <br />} | 进度条拖动结束事件，参数同 `@changing` 保持一致              |
| `@timeupdate`       | { detail: Object, progress: Object }                         | 播放进度变化事件，detail = {currentTime, duration}；`progress` 为进度条数据信息 |
| `@onwaiting`        | -                                                            | 视频出现缓冲时触发                                           |
| `@fullscreenchange` | { fullScreen: boolean, direction: string }                   | 进入和退出全屏时触发，`fullScreen`是否全屏，`direction`取为 `vertical` 或 `horizontal` |
| `@fullscreenclick`  | { screenX: number，screenY: number }                         | 点击点相对于屏幕左侧边缘的 坐标，同 [video](https://uniapp.dcloud.net.cn/component/video.html) 组件中的`fullscreenclick`保持一致 |
| `@loadedmetadata`   | event                                                        | 资源初始化完成事件【`仅H5支持`】                             |
| `@onerror`          | { Object }                                                   | 播放出错事件，当前视频资源数据                               |
| `@noTrigger`        | { code: string, msg: string }                                | 未触发的滑动事件，`msg` 滑动事件未触发的原因，详见 **事件代码**【`APP端特有`】 |
|                     |                                                              |                                                              |

## 事件代码

| 代码  | 描述                               | 说明                                                       |
| ----- | ---------------------------------- | ---------------------------------------------------------- |
| `E40` | 到顶了                             | 滑动到首个时提示                                           |
| `E41` | 到底了                             | 滑动到最后一个时提示                                       |
| `E42` | 滑动速度太慢了                     | 滑动速度太慢，可以通过调整`slidTime`值，默认200            |
| `E43` | 滑动距离太短了                     | 滑动的距离太短，可以调整`upDistance`或者`downDistance`的值 |
| `E44` | 未能触发swiper滑动事件，请重新滑动 | 说明官方swiper滑动失效，可以通过调整`force`的值改变        |



## 事件示例

> **`运行前仔细检查示例代码中的 事件名称是否为空，因为部分事件名称会被转移为''空`，导致无法直接运行**
> **`运行前仔细检查示例代码中的 事件名称是否为空，因为部分事件名称会被转移为''空`，导致无法直接运行**
> **`运行前仔细检查示例代码中的 事件名称是否为空，因为部分事件名称会被转移为''空`，导致无法直接运行**

```html
<ml-swiper-v3 v-if="list.length > 0" :list="list" :startIndex="startIndex" :useSwiper="useSwiper" :force="force"
  :touch="touch" :options="options" @onchange="change" @transition="transition" @animationfinish="animationfinish"
  @loadmore="loadmore" @longTap="longTap" @onclick="onclick" @ondblclick="ondblclick" @onplay="onplay"
  @onpause="onpause" @onended="onended" @changing="changing" @changed="changed" @timeupdate="timeupdate"
  @onwaiting="waiting" @fullscreenchange="fullscreenchange" @fullscreenclick="fullscreenclick"
  @loadedmetadata="loadedmetadata" @onerror="error" @noTrigger="noTrigger">
  <!-- ...... 部分内容省略 ...... -->
</ml-swiper-v3>
<script>
  export default {
    methods: {
      /** 滑动事件 */
      change(event) {
        console.log(" == 滑动事件 == ", event);
      },
      /** 加载更多 */
      loadmore() {
        console.log(" === 加载更多 === ");
      },
      /** 未触发事件原因 */
      noTrigger(event) {
        console.warn(" == 未触发事件 == ", event);
      },
      /** 滑动动画：APP端需要useSwiper为true生效，其他端正常 */
      transition(event) {
        console.log(" == transition == ", event);
      },
      /** 动画完成：APP端需要useSwiper为true生效，其他端正常 */
      animationfinish(event) {
        console.log(" == animationfinish == ", event);
      },
      /** 长按事件 */
      longTap(event) {
        console.log(" == longTap == ", event);
      },
      /** 点击事件 */
      onclick(event) {
        console.log(" == onclick == ", event);
      },
      /** 双击事件 */
      ondblclick(event) {
        console.log(" == ondblclick == ", event);
      },
      /** 播放事件 */
      onplay(event) {
        console.log(" == onplay == ", event);
      },
      /** 暂停事件 */
      onpause(event) {
        console.log(" == onpause == ", event);
      },
      /** 结束事件 */
      onended(event) {
        console.log(" == onended == ", event);
      },
      /** 进度条拖动事件 */
      changing(event) {
        console.log(" == changing == ", event);
      },
      /** 进度条拖动结束事件 */
      changed(event) {
        console.log(" == changed == ", event);
      },
      /** 进度变更事件 */
      timeupdate(event) {
        console.log(" == timeupdate == ", event);
      },
      /** 缓冲事件 */
      waiting(event) {
        console.log(" == waiting == ", event);
      },
      /** 全屏|退出全屏 变更事件 */
      fullscreenchange(event) {
        console.log(" == fullscreenchange == ", event);
      },
      /** 全屏点击事件 */
      fullscreenclick(event) {
        console.log(" == fullscreenclick == ", event);
      },
      /** 资源初始化完成事件 */
      loadedmetadata(event) {
        console.log(" == loadedmetadata == ", event);
      },
      /** 资源播放出错事件 */
      error(event) {
        console.log(" == error == ", event);
      }
    }
  }
</script>
```





## 插槽 Slot

| 插槽名       | 参数                                                         | 说明                                                         |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `video`      | `item` 当前视频资源数据，`index` 当前资源索引                | `options.useVideo` 为 `false` 时，可以自定义video播放器【`APP特有`】 |
| `progress`   | `item` 当前进度条数据，`index` 当前资源索引<br />{ <br />current: 0, <br />duration: 0, <br />currentStr: "00:00", <br />durationStr: "00:00" <br />} | `options.showProgress` 为 `false` 时，可以自定义进度条组件   |
| `fullscreen` | `item` 当前视频资源数据，`index` 当前资源索引                | `options.showFullScreen`为`false`时，可以自定义全屏按钮      |
| `right`      | `item` 当前视频资源数据，`index` 当前资源索引                | 右侧工具栏插槽，可以自定义点赞、转发、设置等功能             |
| `bottom`     | `item` 当前视频资源数据，`index` 当前资源索引                | 底部工具栏插槽，可以自定义标题、说明等信息                   |
| `default`    | `item` 当前视频资源数据，`index` 当前资源索引                | 默认插槽                                                     |

## 插槽示例

```html
<ml-swiper-v3 :options="options">
  <!-- #ifndef H5 -->
  <!-- 自定义 video 组件，只有APP支持 -->
  <template #video="{ item, index }" v-if="!options.useVideo">
    <video ref="video" :src="item.url" :poster="item.poster" :title="item.title" :controls="false" loop
      autoplay :style="full" :muted="false" v-if="current===index" />
  </template>
  <!-- #endif -->
  <!-- 自定义全屏按钮 -->
  <template #fullscreen v-if="!options.showFullScreen">
    <view>
      <text>全屏播放</text>
    </view>
  </template>
  <!-- 自定义进度条 -->
  <template #progress="{ item, index }" v-if="!options.showProgress">
    <view class="progress">
      <text class="text"> {{ index == current ? item.currentStr : '00' }} </text>
      <text class="text"> 这里可以自定义进度条 </text>
      <text class="text"> {{ index == current ? item.durationStr : '00' }} </text>
    </view>
  </template>
  <!-- 右侧工具栏插槽 -->
  <template #right="{ item }">
    <view class="right">
      <image :src="item.poster" mode="aspectFit" class="avatar" />
    </view>
  </template>
  <!-- 底部工具栏插槽 -->
  <template #bottom="{ item }">
    <text class="title"> {{ item.title }} </text>
  </template>
</ml-swiper-v3>
<script>
  export default {
    data() {
      return {
        /** 组件配置  */
        options: {
          showProgress: false, // 是否显示进度条 
          showFullScreen: true, // 是否显示全屏按钮 
          useVideo: false, // 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽 【APP特有属性】
        }
      }
    }
  }
</script>
```



## 组件方法

| 事件                        | 参数                                             | 说明                             |
| --------------------------- | ------------------------------------------------ | -------------------------------- |
| `setRate(rate)` 设置倍速    | Number： 0.5 \| 0.8 \| 1.0 \| 1.25 \| 1.5 \| 2.0 | 当前视频倍速，不同平台支持不一样 |
| `setSeek(val)` 指定播放时间 | Number： 0                                       | 指定播放时间，单位秒             |
|                             |                                                  |                                  |



## 完整示例

APP端需要使用nvue页面<img src="https://tanhua-app.oss-cn-shanghai.aliyuncs.com/images/APP%E7%AB%AF%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B.jpg" style="zoom:50%;" title="APP端需要使用nvue页面"/></div>

> **案例中使用到了`uni-icons`、`uni-popup`等组件，请自行安装**
> **H5端需要安装 hls 库来支持播放m3u8资源：`npm install hls.js`**
> **APP端请使用 `nvue` 页面，将示例代码复制到nvue中即可试运行，无需其他改动**
>
> **`运行前仔细检查示例代码中的 方法名是否为空，因为部分方法名会被转移为''空`，导致无法直接运行**
> **`运行前仔细检查示例代码中的 方法名是否为空，因为部分方法名会被转移为''空`，导致无法直接运行**
> **`运行前仔细检查示例代码中的 方法名是否为空，因为部分方法名会被转移为''空`，导致无法直接运行**



```html
<template>
  <view :style="full" class="container">
    <!-- 返回上一页面 -->
    <view class="back-up" @tap="backup">
      <uni-icons class="text" type="left" size="18" color="#fff" />
    </view>
    <!-- 开始使用组件  -->
    <ml-swiper-v3 v-if="list.length > 0" :list="list" :startIndex="startIndex" :force="force" :useSwiper="useSwiper"
      :touch="touch" :options="options" @onchange="change" @transition="transition" @animationfinish="animationfinish"
      @loadmore="loadmore" @longTap="longTap" @onclick="onclick" @ondblclick="ondblclick" @onplay="onplay"
      @onpause="onpause" @onended="onended" @changing="changing" @changed="changed" @timeupdate="timeupdate"
      @onwaiting="waiting" @fullscreenchange="fullscreenchange" @fullscreenclick="fullscreenclick"
      @loadedmetadata="loadedmetadata" @onerror="error" @noTrigger="noTrigger" ref="mlSwiper">
      <!-- #ifndef H5 -->
      <!-- 自定义 video 组件 -->
      <template #video="{ item, index }" v-if="!options.useVideo">
        <video ref="video" :src="item.url" :poster="item.poster" :title="item.title" :controls="false" loop
          autoplay :style="full" :muted="false" v-if="current===index" />
      </template>
      <!-- #endif -->
      <!-- 右侧工具栏插槽 -->
      <template #right="{ item }">
        <view class="right">
          <image :src="item.poster" mode="aspectFit" class="avatar" />
          <!-- 喜欢 -->
          <view class="icon">
            <uni-icons type="heart-filled" size="35" color="#ff0004" />
            <text class="icon-val">666</text>
          </view>
          <!-- 评论 -->
          <view class="icon">
            <uni-icons type="chat-filled" size="35" color="#fff" />
            <text class="icon-val">668</text>
          </view>
          <!-- 收藏 -->
          <view class="icon">
            <uni-icons type="star-filled" size="35" color="#ff0" />
            <text class="icon-val">888</text>
          </view>
          <!-- 转发 -->
          <view class="icon">
            <uni-icons type="redo-filled" size="35" color="#fff" />
            <text class="icon-val">999</text>
          </view>
          <!-- 选集 -->
          <view class="icon" @tap="openPopup">
            <uni-icons type="settings" size="35" color="#fff" />
            <text class="icon-val">选集</text>
          </view>
        </view>
      </template>
      <!-- 底部工具栏插槽 -->
      <template #bottom="{ item }">
        <text class="title"> {{ item.title }} </text>
      </template>
      <!-- 自定义全屏按钮 -->
      <template #fullscreen v-if="!options.showFullScreen">
        <view>
          <text style="color: aliceblue;">全屏播放</text>
        </view>
      </template>
      <!-- 自定义进度条 -->
      <template #progress="{ item, index }" v-if="!options.showProgress">
        <view class="progress">
          <text class="text"> {{ index == current ? item.currentStr : '00' }} </text>
          <text class="text"> 这里可以自定义进度条 </text>
          <text class="text"> {{ index == current ? item.durationStr : '00' }} </text>
        </view>
      </template>
    </ml-swiper-v3>
    <!-- 底部弹框 -->
    <!-- <popup-box ref="popup" title="选集" :show="showPopup" :intoView="intoView" @close="showPopup=false">
      <view v-for="(item,index) in list" :key="index">
        <view :id="`into-${index}`" class="row-item" @tap="selected(index)">
          <view class="row">
            <text class="item" :class="{'cur-item': current==index}"> 第 {{ index + 1 }} 集 </text>
          </view>
          <view class="row">
            <text class="item" :class="{'cur-item': current==index}"> {{ item.title }} </text>
          </view>
        </view>
      </view>
    </popup-box> -->
  </view>
</template>

<script>
  // import popupBox from './popup-box.vue';
  export default {
    // components: { popupBox },
    data() {
      return {
        count: 0, // 计数器
        current: 0, // 当前资源索引
        showPopup: false, // 显示弹框
        intoView: "", // 滚动到指定位置

        list: [], // 数据列表 
        startIndex: 0, // 起始索引，从第 n 个资源开始，可以动态变更，实现类似短剧选集的功能
        force: false, // 强制触发：官方swiper动画失效时，强制触发滑动事件，会出现上下动画错乱的问题【APP特有属性】
        useSwiper: true, // 是否使用 swiper 组件，为 false 时，将使用自定义动画和自定义事件【APP特有属性】
        /** 滑动配置【APP特有属性】 */
        touch: {
          upDistance: 20, // 上滑距离
          downDistance: -40, // 下滑距离
          slidTime: 200, // 滑动时间
          touchDistance: 80 // swiper 滑动距离
        },
        /** 组件配置  */
        options: {
          // width: uni.getSystemInfoSync().windowWidth, // 组件宽度
          height: uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight - uni.getSystemInfoSync().safeAreaInsets.bottom, // 组件高度(适配安全距离)
          loadingText: "加载中...", // 初始化时的提示内容 
          criticalVal: 2, // 临界值 
          showProgress: true, // 是否显示进度条 
          autoChange: false, // 是否自动切换 
          showFullScreen: true, // 是否显示全屏按钮 
          fullScreenOption: { // 全屏按钮配置 
            bottom: 100, // 按钮距底部高度 
            text: "全屏观看" // 按钮显示的内容 
          },
          direction: -90, // 0=正常竖向、90=屏幕逆时针90度、-90=屏幕顺时针90度 【APP特有属性】
          loading: false, // 是否显示loading控件 【APP特有属性】
          useVideo: true, // 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽 【APP特有属性】
          duration: 300, // swiper 滑动动画时长
          objectFit: "contain", // contain：包含，fill：填充，cover：覆盖
          codec: "software", // hardware：硬解码，software：ffmpeg软解码
          playStrategy: 1 // 0：普通模式，1：平滑播放模式（降级），2： M3U8优化模式
        },
      }
    },
    computed: {
      full() {
        return `width:${this.options.width}px;height:${this.options.height}px;`;
      },
    },
    /** 提供 onHide 方法 */
    onHide() {
      // if (this.$refs.mlSwiper && this.$refs.mlSwiper.hidePause) {
      //   this.$refs.mlSwiper?.hidePause();
      // }
    },
    onShow() { },
    /** 加载数据 */
    created() {
      const that = this;
      uni.showLoading({ title: "加载中..." });
      this.list = this.getList().map((item) => {
        that.count++;
        item.title = `${that.count}、${item.title}`;
        return item;
      });
      uni.hideLoading();
    },
    methods: {
      /** 返回上一页 */
      backup() {
        uni.navigateBack({ delta: 1 });
      },
      /** 打开弹框 */
      openPopup() {
        this.showPopup = true;
        this.intoView = `into-${this.current}`;
      },
      /** 选中集 */
      selected(index) {
        this.startIndex = index;
        this.current = index;
        this.showPopup = false;
      },
      /** 组件滑动事件 */
      change({ index }) {
        this.current = index;
        console.log(" == 滑动事件 == ", index);
      },
      /** 加载更多 */
      loadmore() {
        const that = this;
        console.log(" === 加载更多 === ");
        const result = this.getList().map((item) => {
          that.count++;
          item.title = `${that.count}、${item.title}`;
          return item;
        });
        this.list = [...this.list, ...result];
      },
      /** 未触发事件 */
      noTrigger(event) {
        console.warn(event);
      },
      /** 滑动动画：APP端需要useSwiper为true生效，其他端正常 */
      transition(event) {
        console.log(" == transition == ", event);
      },
      /** 动画完成：APP端需要useSwiper为true生效，其他端正常 */
      animationfinish(event) {
        console.log(" == animationfinish == ", event);
      },
      /** 长按事件 */
      longTap(event) {
        console.log(" == longTap == ", event);
      },
      /** 点击事件 */
      onclick(event) {
        console.log(" == onclick == ", event);
      },
      /** 双击事件 */
      ondblclick(event) {
        console.log(" == ondblclick == ", event);
      },
      /** 播放事件 */
      onplay(event) {
        console.log(" == onplay == ", event);
      },
      /** 暂停事件 */
      onpause(event) {
        console.log(" == onpause == ", event);
      },
      /** 结束事件 */
      onended(event) {
        console.log(" == onended == ", event);
      },
      /** 进度条拖动事件 */
      changing(event) {
        console.log(" == changing == ", event);
      },
      /** 进度条拖动结束事件 */
      changed(event) {
        console.log(" == changed == ", event);
      },
      /** 进度变更事件 */
      timeupdate(event) {
        console.log(" == timeupdate == ", event);
      },
      /** 缓冲事件 */
      waiting(event) {
        console.log(" == waiting == ", event);
      },
      /** 全屏|退出全屏 变更事件 */
      fullscreenchange(event) {
        console.log(" == fullscreenchange == ", event);
      },
      /** 全屏点击事件 */
      fullscreenclick(event) {
        console.log(" == fullscreenclick == ", event);
      },
      /** 资源初始化完成事件 */
      loadedmetadata(event) {
        console.log(" == loadedmetadata == ", event);
      },
      /** 资源播放出错事件 */
      error(event) {
        console.log(" == error == ", event);
      },
      /** 获取数据列表 */
      getList() {
        return [
          {
            title: "0、图片列表",
            poster: 'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
            imgList: [
              'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
              'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028',
              'http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028',
              'http://gips3.baidu.com/it/u=119870705,2790914505&fm=3028',
              'http://gips0.baidu.com/it/u=2298867753,3464105574&fm=3028',
              'http://gips2.baidu.com/it/u=3944689179,983354166&fm=3028'
            ]
          },
          {
            title: "1、小狗、JKwu",
            poster: 'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
            url: "https://txmov2.a.yximgs.com/upic/2020/11/08/19/BMjAyMDExMDgxOTQxNTlfNTIzNDczMzQ0XzM4OTQ1MDk5MTI4XzFfMw==_b_Bc770a92f0cf153407d60a2eddffeae2a.mp4"
          },
          {
            title: "2、w_girl、御",
            poster: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028',
            url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4"
          },
          {
            title: "3、图片列表",
            poster: 'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
            imgList: [
              'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
              'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028',
              'http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028',
              'http://gips3.baidu.com/it/u=119870705,2790914505&fm=3028',
              'http://gips0.baidu.com/it/u=2298867753,3464105574&fm=3028',
              'http://gips2.baidu.com/it/u=3944689179,983354166&fm=3028'
            ]
          },
          {
            title: "4、猫耳朵、多",
            poster: 'http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028',
            url: "https://alimov2.a.yximgs.com/upic/2020/07/02/14/BMjAyMDA3MDIxNDUyMDlfOTExMjIyMjRfMzE1OTEwNjAxNTRfMV8z_b_Bf3005d42ce9c01c0687147428c28d7e6.mp4"
          },
          {
            title: "5、花、白衣服wu",
            poster: 'http://gips3.baidu.com/it/u=119870705,2790914505&fm=3028',
            url: "https://txmov6.a.yximgs.com/upic/2020/08/23/00/BMjAyMDA4MjMwMDMyNDRfMTYzMzY5MDA0XzM0ODI4MDcyMzQ5XzFfMw==_b_B9a1c9d4e3a090bb2815994d7f33a906a.mp4"
          },
          {
            title: "6、图片列表",
            poster: 'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
            imgList: [
              'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
              'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028',
              'http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028',
              'http://gips3.baidu.com/it/u=119870705,2790914505&fm=3028',
              'http://gips0.baidu.com/it/u=2298867753,3464105574&fm=3028',
              'http://gips2.baidu.com/it/u=3944689179,983354166&fm=3028'
            ]
          },
          {
            title: "7、虎、JKwu",
            poster: 'http://gips0.baidu.com/it/u=2298867753,3464105574&fm=3028',
            url: "https://txmov2.a.yximgs.com/upic/2020/11/08/19/BMjAyMDExMDgxOTQxNTlfNTIzNDczMzQ0XzM4OTQ1MDk5MTI4XzFfMw==_b_Bc770a92f0cf153407d60a2eddffeae2a.mp4"
          },
          {
            title: "8、c_girl、御",
            poster: 'http://gips2.baidu.com/it/u=3944689179,983354166&fm=3028',
            url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4"
          },
          {
            title: "9、鱼、多",
            poster: 'http://gips0.baidu.com/it/u=3560029307,576412274&fm=3028',
            url: "https://alimov2.a.yximgs.com/upic/2020/07/02/14/BMjAyMDA3MDIxNDUyMDlfOTExMjIyMjRfMzE1OTEwNjAxNTRfMV8z_b_Bf3005d42ce9c01c0687147428c28d7e6.mp4"
          },
          {
            title: "10、猫、白衣服wu",
            poster: 'http://gips0.baidu.com/it/u=3822353666,2757632348&fm=3028',
            url: "https://txmov6.a.yximgs.com/upic/2020/08/23/00/BMjAyMDA4MjMwMDMyNDRfMTYzMzY5MDA0XzM0ODI4MDcyMzQ5XzFfMw==_b_B9a1c9d4e3a090bb2815994d7f33a906a.mp4"
          },
          {
            title: "11、海、JKwu",
            poster: 'http://gips3.baidu.com/it/u=764883555,2569275522&fm=3028',
            url: "https://txmov2.a.yximgs.com/upic/2020/11/08/19/BMjAyMDExMDgxOTQxNTlfNTIzNDczMzQ0XzM4OTQ1MDk5MTI4XzFfMw==_b_Bc770a92f0cf153407d60a2eddffeae2a.mp4"
          },
          {
            title: "12、树、御",
            poster: 'https://gips3.baidu.com/it/u=3732338995,3528391142&fm=3028',
            url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4"
          },
          {
            title: "13、城堡、多",
            poster: 'https://gips0.baidu.com/it/u=1939859157,1111239881&fm=3028',
            url: "https://alimov2.a.yximgs.com/upic/2020/07/02/14/BMjAyMDA3MDIxNDUyMDlfOTExMjIyMjRfMzE1OTEwNjAxNTRfMV8z_b_Bf3005d42ce9c01c0687147428c28d7e6.mp4"
          },
          {
            title: "14、猫头鹰、白衣服wu",
            poster: 'https://gips2.baidu.com/it/u=406595553,3023311630&fm=3028',
            url: "https://txmov6.a.yximgs.com/upic/2020/08/23/00/BMjAyMDA4MjMwMDMyNDRfMTYzMzY5MDA0XzM0ODI4MDcyMzQ5XzFfMw==_b_B9a1c9d4e3a090bb2815994d7f33a906a.mp4"
          },
          {
            title: "15、狗、JKwu",
            poster: 'http://gips0.baidu.com/it/u=398917425,2942293409&fm=3028',
            url: "https://txmov2.a.yximgs.com/upic/2020/11/08/19/BMjAyMDExMDgxOTQxNTlfNTIzNDczMzQ0XzM4OTQ1MDk5MTI4XzFfMw==_b_Bc770a92f0cf153407d60a2eddffeae2a.mp4"
          },
          {
            title: "16、花——girl、御",
            poster: 'http://gips3.baidu.com/it/u=1874299413,3253595329&fm=3028',
            url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4"
          }
        ];
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    /* #ifndef APP-NVUE */
    width: 100vw;
    height: 100%;
    color: #f3f3f3;
    /* #endif */
    background: #141c27;
  }

  .back-up {
    position: fixed;
    top: 30px;
    left: 10px;
    width: 25px;
    height: 25px;
    z-index: 9999999999;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.7);

    .text {
      color: #fff;
      font-size: 14px;
      font-weight: 900;
      line-height: 25px;
      text-align: center;
    }
  }

  .right {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .avatar {
      width: 50px;
      height: 50px;
      margin: 5px 0;
      border-radius: 100%;
    }

    .icon {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
    }

    .icon-val {
      color: #fff;
      font-size: 13px;
      text-align: center;
    }
  }

  .title {
    color: #fff;
    font-size: 14px;
    font-weight: 400;
  }

  .progress {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-wrap: nowrap;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    .text {
      color: #fff;
      font-weight: 200;
      font-size: 12px;
      padding: 0 5px;
      text-align: center;
    }
  }

  .row-item {
    margin: 5px 0;
    padding: 5px 0;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-bottom-width: 1px;
    border-bottom-color: #eeeeee;

    .row {
      lines: 1;
      margin: 0 5px;
      padding: 5px 3px;
      border-radius: 8px;
    }

    .item {
      lines: 1;
      color: #434343;
      text-align: center;
    }

    .cur-item {
      lines: 1;
      color: #8ecbff;
      text-align: center;
    }
  }
</style>
```





## 弹框组件

```html
<template>
  <view class="popup-mask" :style="full" v-if="show">
    <view class="popup-box" :style="`width:${width}px;`">
      <view class="popup-header">
        <template v-if="$slots.header">
          <slot name="header"></slot>
        </template>
        <template v-else>
          <text class="title">{{ title }}</text>
          <view @tap="close">
            <text class="close">×</text>
          </view>
        </template>
      </view>
      <scroll-view :scroll-into-view="scrollTo" scroll-y direction="vertical" class="popup-body" :style="bodyFull" enable-flex>
        <slot></slot>
      </scroll-view>
      <view class="popup-footer" :style="`width:${width}px;`">
        <slot name="footer"></slot>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      /** 显示弹框 */
      show: {
        type: Boolean,
        default: false,
        required: false
      },
      /** 滚动到指定位置，子组件的 id */
      intoView: {
        type: String,
        default: "",
        required: false
      },
      /** 弹框标题 */
      title: {
        type: String,
        default: "",
        required: false
      },
      /** 组件高度百分比 */
      percent: {
        type: [String, Number],
        default: "50",
        required: false
      }
    },
    emits: ['close'],
    data() {
      return {
        scrollTo: '',
        width: uni.getSystemInfoSync().windowWidth, // 组件宽度
        height: uni.getSystemInfoSync().windowHeight, // 组件高度 
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (!newVal) {
            this.close();
          }
        },
        immediate: true
      },
      intoView: {
        handler(newVal) {
          if (this.show) {
            setTimeout(() => this.scrollTo = newVal, 200);
          }
        },
        immediate: true
      }
    },
    computed: {
      full() {
        return `width:${this.width}px;height:${this.height}px;`;
      },
      bodyFull() {
        const percent = Number((this.percent.replace("%", "")) / 100);
        const bodyHeight = this.height * percent;
        return `width:${this.width}px;height:${bodyHeight}px;`;
      }
    },
    methods: {
      /** 关闭弹框 */
      close() {
        this.$emit("close");
      }
    }
  }
</script>

<style scoped lang="scss">
  .popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999999;
    background: rgba(0, 0, 0, 0.7);

    .popup-box {
      position: fixed;
      bottom: 0;
      z-index: 999999999;
      background: #f9f9f9;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
      box-shadow: 0 1px 1px 1px #aaaaaa;

      .popup-header {
        height: 40px;
        padding: 0 10px;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-wrap: nowrap;
        align-items: center;
        flex-direction: row;
        border-bottom-width: 1px;
        border-bottom-color: #e1e1e1;
        justify-content: space-between;

        .title {
          color: #333333;
          font-size: 16px;
          font-weight: 700;
        }

        .close {
          color: #717171;
          font-size: 20px;
          padding: 3px 5px;
          text-align: center;
        }
      }

      .popup-body {
        background: #fdfdfd;
      }

      .popup-footer {
        height: 35px;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-wrap: nowrap;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        border-top-width: 1px;
        border-top-color: #e1e1e1;

        .close {
          color: #717171;
          text-align: center;
        }
      }
    }
  }
</style>
```

