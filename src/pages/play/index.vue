<template>
	<view :style="full" class="play-container">
		<!-- 返回上一页面 -->
		<view class="header-nav">
			<view class="header-left">
				<view class="header-left-item" @click="toFocus()">
					<uni-icons class="icon header-left-item-icon" type="icon-common-focus" custom-prefix="icon" size="18"
						color="#fff" />
					<text class="header-left-item-text">{{ $t('creator.following') }}</text>
				</view>
				<view class="header-left-item" @click="toRecommend()">
					<uni-icons class="icon header-left-item-icon" type="icon-common-recommend" custom-prefix="icon" size="18"
						color="#fff" />
					<text class="header-left-item-text">{{ $t('common.recommend') }}</text>
				</view>
			</view>
			<view class="header-right" @click="toSearch()">
				<uni-icons class="icon header-right-item-icon" type="icon-common-search" custom-prefix="icon" size="18"
					color="#fff" />
			</view>
		</view>
		<!-- 开始使用组件  -->
		<view class="play-swiper-container">
			<ml-swiper-v3 class="ml-swiper-v3-custom" v-if="list.length > 0" :list="list" :startIndex="startIndex"
				:force="force" :useSwiper="useSwiper" :touch="touch" :options="options" @onchange="change"
				@transition="transition" @animationfinish="animationfinish" @loadmore="loadmore" @longTap="longTap"
				@onclick="onclick" @ondblclick="ondblclick" @onplay="onplay" @onpause="onpause" @onended="onended"
				@changing="changing" @changed="changed" @timeupdate="timeupdate" @onwaiting="waiting"
				@fullscreenchange="fullscreenchange" @fullscreenclick="fullscreenclick" @loadedmetadata="loadedmetadata"
				@onerror="error" @noTrigger="noTrigger" @onmute="onmute" ref="mlSwiper">
				<!-- #ifndef H5 -->
				<!-- 自定义 video 组件 根據 config.useVideo boolean 決定是否使用-->
				<!-- <template #video="{ item, index }" v-if="!options.useVideo">
				<video class="custom-video" ref="video" :src="item.url" :poster="item.poster" :title="item.title"
					:controls="false" loop autoplay :style="full" :muted="false" v-if="current === index" />
			</template> -->
				<!-- #endif -->
				<!-- 右侧工具栏插槽 -->
				<template #right="{ item, soundMute }">
					<view class="right">
						<!-- 頭像 -->
						<view class="right-tool-avatar-container-wrapper">
							<view class="right-tool-avatar-container" @click="toCreator">
								<image class="right-tool-avatar" src="/static/images/template/img-template-03.png" mode="widthFix">
								</image>
							</view>
							<view class="right-tool-avatar-tip" @click="toSubscription">
								<uni-icons class="right-tool-avatar-tip-icon" type="icon-common-plus" custom-prefix="icon" size="16"
									color="var(--text-color-secondary)" />
							</view>
						</view>
						<view class="right-tool-item-container">
							<!-- 聲音 -->
							<view class="right-tool-item-container-item sound-container" :class="{ active: soundMute }"
								@click="toggleMute(soundMute)">
								<!--  靜音標示 -->
								<uni-icons class="icon icon-video-sound-off" v-if="soundMute" type="icon-stander-volume-mute2"
									custom-prefix="icon" size="24" />
								<!--  非靜音標示 -->
								<uni-icons class="icon icon-video-sound-on" v-else type="icon-stander-volume-medium"
									custom-prefix="icon" size="24" />
							</view>
							<!-- 喜歡 -->
							<view class="right-tool-item-container-item" :class="{ active: isFavorite }" @click="likeThis">
								<uni-icons class="icon icon-video-favorite" type="icon-video-favorite" custom-prefix="icon" size="16" />
								<text class="icon-val">500k</text>
							</view>
							<!-- 留言 -->
							<view class="right-tool-item-container-item" @click="openPopMessage">
								<uni-icons class="icon icon-video-chat" type="icon-video-chat" custom-prefix="icon" size="16" />
								<text class="icon-val">1234</text>
							</view>
							<!-- 分享 -->
							<view class="right-tool-item-container-item" @click="toShare">
								<uni-icons class="icon icon-common-share" type="icon-common-share" custom-prefix="icon" size="16" />
							</view>
							<!-- 收藏 -->
							<view class="right-tool-item-container-item" :class="{ active: isCollect }" @click="toCollect">
								<uni-icons class="icon icon-input-upload-file" type="icon-input-upload-file" custom-prefix="icon"
									size="16" />
							</view>
							<!-- 禮物 -->
							<view class="right-tool-item-container-item" @click="openPopSponsor">
								<uni-icons class="icon icon-common-gift" type="icon-common-gift" custom-prefix="icon" size="16" />
							</view>
						</view>
					</view>
					<view class="mask-container" v-if="item.ageChecked">
						<view class="mask-container-item">
							<view class="mask-container-item-icon-container">
								<uni-icons class="mask-container-item-icon" type="icon-input-eye-lock" custom-prefix="icon" size="16" />
							</view>
							<view class="mask-container-item-text mask-container-item-text-title ">
								<text>{{ $t('play.sensitiveContent') }}</text>
							</view>
							<view class="mask-container-item-text mask-container-item-text-content">
								<text>{{ $t('play.sensitiveContentTip') }}</text>
								<text>{{ $t('play.sensitiveContentTip2') }}</text>
							</view>
							<view class="mask-container-item-button">
								<button type="button" class="mask-container-item-button-item" @click="closeFilter(item)">
									<uni-icons class="mask-container-item-button-item-icon" type="icon-input-eye" custom-prefix="icon"
										size="16" />
									<text>{{ $t('play.watch') }}</text>
								</button>
								<button type="button" class="mask-container-item-button-item" @click="setFilter">
									<uni-icons class="mask-container-item-button-item-icon" type="icon-common-gear" custom-prefix="icon"
										size="16" />
									<text>{{ $t('play.disableFilter') }}</text>
								</button>
							</view>
						</view>
					</view>
					<view class="locked-container" v-if="item.locked">
						<view class="locked-container-item">
							<uni-icons class="locked-container-item-icon" type="icon-common-locked" custom-prefix="icon" size="16" />
							<text class="locked-container-item-text">{{ $t('play.unlockVideo') }}</text>
						</view>
					</view>
				</template>
				<!-- 底部工具栏插槽 -->
				<template #bottom="{ item }">
					<!-- 圖片用開啟類全螢幕 swiper -->
					<view class="bottom-tool-container-wrapper-avatar-container">
						<uni-icons class="bottom-tool-container-wrapper-avatar-container-icon" type="icon-common-copy"
							custom-prefix="icon" size="16" @click="openImageFullScreen" />
					</view>
					<!-- 帳號名稱 -->
					<view class="bottom-tool-container-wrapper">
						<text class="bottom-tool-container-wrapper-name">@名稱</text>
						<image class="bottom-tool-container-prove" src="/static/icons/community/icon-community-prove-filled.png"
							mode="widthFix">
						</image>
						<text class="bottom-tool-container-wrapper-account"> @8888888.88</text>
					</view>
					<!-- 影片資訊 標題 -->
					<view class="bottom-tool-container">
						<text class="bottom-tool-container-title"> {{ item.title }} </text>
					</view>
				</template>
				<!-- 自定义全屏按钮 -->
				<template #fullscreen="{ fullScreen }" v-if="!options.showFullScreen">
					<!-- 播放狀態按鈕 -->
					<view class="play-status-container">
						<uni-icons v-if="playing" class="icon icon-stander-pause2" type="icon-stander-pause2" custom-prefix="icon"
							size="18" color="#fff" />
						<uni-icons v-else class="icon icon-video-play" type="icon-video-play" custom-prefix="icon" size="18"
							color="#fff" />
					</view>
					<!-- 全螢幕按鈕 -->
					<view class="fullscreen-container" @click="triggerFullScreen">
						<uni-icons class="fullscreen-button" type="icon-video-fullScreen" custom-prefix="icon" size="18"
							color="#fff" />
					</view>
				</template>
				<!-- 自定义进度条 -->
				<!-- <template #progress="{ item, index }" v-if="!options.showProgress">
					<view class="progress">
						<text class="text"> {{ index == current ? item.currentStr : '00' }} </text>
						<text class="text"> 这里可以自定义进度条 </text>
						<text class="text"> {{ index == current ? item.durationStr : '00' }} </text>
					</view>
				</template> -->
			</ml-swiper-v3>
		</view>
		<!-- 底部導航 -->
		<c-bottomNav :bgColor="'var(--background-color-dark)'" :iconColor="'var(--text-color-secondary)'"
			:primaryMenu="'primary'" />
		<play-popMessage ref="videoPopMessage"></play-popMessage>
		<play-popSponsor ref="videoPopSponsor"></play-popSponsor>
		<play-popSubscription ref="videoPopSubscription"></play-popSubscription>
		<play-popImgFullScreen ref="videoPopImgFullScreen" :imgs="imageFullScreenImgs"></play-popImgFullScreen>
	</view>
</template>

<script setup>
// TEMP: 影音頁
import { onShow, onHide } from '@dcloudio/uni-app'
import { toSearchHome, toCreatorHome, toPlayArticleGallery } from '@/utils/routers'

/* NOTE:非播放組件  */
// 右側工具欄位
const isFavorite = ref(false); // 是否喜歡
const isCollect = ref(false); // 是否收藏
const videoPopMessage = ref(null) // 留言彈跳窗口
const videoPopSponsor = ref(null) // 打賞彈跳窗口
const videoPopSubscription = ref(null) // 訂閱彈跳窗口
const videoPopImgFullScreen = ref(null) // 圖片全螢幕彈跳窗口
const playing = ref(true); // 是否播放
const imageFullScreenImgs = ref([]) // 圖片全螢幕圖片列表
// 頂部header fn
const toFocus = () => {
	console.log("🚀 == 關注中 == ")
}
const toRecommend = () => {
	console.log("🚀 == 推薦 == ")
}
const toSearch = () => {
	console.log("🚀 == 搜尋 == ")
	toSearchHome()
}

// 右側工具欄位 fn
// 創作者頭像
const toCreator = () => {
	console.log("🚀 == 創作者頭像 == ")
	toCreatorHome()
}
// 訂閱
const toSubscription = () => {
	console.log("🚀 == 訂閱 == ")
	videoPopSubscription.value?.open()
}
// 喜歡
const likeThis = () => {
	isFavorite.value = !isFavorite.value;
}
// 聲音 靜音開關
const toggleMute = (soundMute) => {
	mlSwiper.value.toggleMute(soundMute)
	console.log("🚀 == 聲音 == ", soundMute)
}
// 留言
const openPopMessage = () => {
	console.log("🚀 == 留言 == ")
	videoPopMessage.value?.open()
}
// 分享
const toShare = () => {
	console.log("🚀 == 分享 == ")
	/* NOTE:暫代 去往該圖文的總攬 */
	toPlayArticleGallery()
}
// 收藏
const toCollect = () => {
	isCollect.value = !isCollect.value;
	console.log("🚀 == 收藏 == ")
}
// 打賞
const openPopSponsor = () => {
	console.log("🚀 == 打賞 == ")
	videoPopSponsor.value?.open()
}
// 過濾器
const closeFilter = (item) => {
	item.ageChecked = false
}
const setFilter = () => {
	console.log("🚀 == 過濾器 == ")
}
// 底部按鈕
const openImageFullScreen = () => {
	console.log("🚀 == 圖片全螢幕 == ")
	imageFullScreenImgs.value = list.value[0].imgList
	videoPopImgFullScreen.value?.open()
}

const triggerFullScreen = () => {
	console.log("🚀 ~ 影音全螢幕");
	mlSwiper.value?.fullScreen?.(); // 呼叫子組件方法
}

/*  */

/* NOTE: 影音頁 是組件的配置 */
const mlSwiper = ref(null);
const count = ref(0); // 计数器
const current = ref(0); // 当前资源索引
const showPopup = ref(false); // 显示弹框
const intoView = ref(''); // 滚动到指定位置

const list = ref([]); // 数据列表
const startIndex = ref(0); // 起始索引，从第 n 个资源开始，可以动态变更，实现类似短剧选集的功能
const force = ref(false); // 强制触发：官方swiper动画失效时，强制触发滑动事件，会出现上下动画错乱的问题【APP特有属性】
const useSwiper = ref(true); // 是否使用 swiper 组件，为 false 时，将使用自定义动画和自定义事件【APP特有属性】

/** 滑动配置【APP特有属性】 */
const touch = reactive({
	upDistance: 20, // 上滑距离
	downDistance: -40, // 下滑距离
	slidTime: 200, // 滑动时间
	touchDistance: 80, // swiper 滑动距离
});

/** 组件配置  */
// NOTE: 影音頁 播放器高度無法自動偵測組件的高度，需要直接寫死數值才能正確渲染
const options = reactive({
	// width: uni.getSystemInfoSync().windowWidth, // 组件宽度
	height: uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight - uni.getSystemInfoSync().safeAreaInsets.bottom - 68, // 组件高度(适配安全距离)
	loadingText: "加载中...", // 初始化时的提示内容
	criticalVal: 2, // 临界值
	showProgress: true, // 是否显示进度条
	autoChange: false, // 是否自动切换
	showFullScreen: false, // 是否显示默認全屏按钮 
	fullScreenOption: {
		bottom: 100, // 按钮距底部高度
		text: "全屏观看", // 按钮显示的内容
	},
	direction: -90, // 0=正常竖向、90=屏幕逆时针90度、-90=屏幕顺时针90度 【APP特有属性】
	loading: true, // 是否显示loading控件 【APP特有属性】
	useVideo: true, // 是否使用默认的video组件，为 false 时可以自定义 video，提供有 video 插槽 【APP特有属性】
	duration: 300, // swiper 滑动动画时长
	objectFit: "contain", // contain：包含，fill：填充，cover：覆盖
	codec: "software", // hardware：硬解码，software：ffmpeg软解码
	playStrategy: 1, // 0：普通模式，1：平滑播放模式（降级），2： M3U8优化模式
});

const full = computed(() => `width:${options.width}px;height:${options.height}px;`);



onHide(() => {
	// if (mlSwiper.value?.hidePause) mlSwiper.value.hidePause();
});

onShow(() => { });

onMounted(() => {
	uni.showLoading({ title: "加载中..." });
	list.value = getList().map(item => {
		count.value++;
		return { ...item, title: `${count.value}、${item.title}` };
	});
	uni.hideLoading();
});

/** 返回上一页 */
function backup() {
	uni.navigateBack({ delta: 1 });
}

/** 打开弹框 */
function openPopup() {
	showPopup.value = true;
	intoView.value = `into-${current.value}`;
}

/** 选中集 */
function selected(index) {
	startIndex.value = index;
	current.value = index;
	showPopup.value = false;
}

/** 组件滑动事件 */
function change(index) {
	current.value = index;
	console.log(" == 滑动事件 == ", index);
}

/** 加载更多 */
function loadmore() {
	console.log(" === 加载更多 === ");
	const result = getList().map(item => {
		count.value++;
		return { ...item, title: `${count.value}、${item.title}` };
	});
	list.value.push(...result);
}

/** 未触发事件 */
function noTrigger(event) {
	console.warn(event);
}

/** 滑动动画：APP端需要useSwiper为true生效，其他端正常 */
function transition(event) {
	console.log(" == transition == ", event);
}

/** 动画完成：APP端需要useSwiper为true生效，其他端正常 */
function animationfinish(event) {
	console.log(" == animationfinish == ", event);
}

/** 长按事件 */
function longTap(event) {
	console.log(" == longTap == ", event);
}

/** 点击事件 */
function onclick(event) {
	console.log(" == onclick == ", event);
}

/** 靜音事件 */
function onmute(event) {
	console.log(" == onmute == ", event);
}

/** 双击事件 */
function ondblclick(event) {
	console.log(" == ondblclick == ", event);
}

/** 播放事件 */
function onplay(event) {
	playing.value = event.playing;
	console.log(" == onplay == ", event);
}

/** 暂停事件 */
function onpause(event) {
	playing.value = event.playing;
	console.log("🚀 ~ onpause ~ event:", event)
}

/** 结束事件 */
function onended(event) {
	console.log(" == onended == ", event);
}

/** 进度条拖动事件 */
function changing(event) {
	console.log(" == changing == ", event);
}

/** 进度条拖动结束事件 */
function changed(event) {
	console.log(" == changed == ", event);
}

/** 进度变更事件 */
function timeupdate(event) {
	console.log(" == timeupdate == ", event);
}

/** 缓冲事件 */
function waiting(event) {
	console.log(" == waiting == ", event);
}

/** 全屏|退出全屏 变更事件 */
function fullscreenchange(event) {
	console.log(" == fullscreenchange == ", event);
}

/** 全屏点击事件 */
function fullscreenclick(event) {
	console.log(" == fullscreenclick == ", event);
}

/** 资源初始化完成事件 */
function loadedmetadata(event) {
	console.log(" == loadedmetadata == ", event);
}

/** 资源播放出错事件 */
function error(event) {
	console.log(" == error == ", event);
	uni.showToast({
		title: "資源播放出錯",
		icon: "none"
	});
}

/** 获取数据列表 */
function getList() {
	return [
		{
			title: "2、w_girl、御",
			poster: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4",
			ageChecked: false,
			locked: false
		},
		{
			title: "2、w_girl、御-2",
			poster: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4",
			ageChecked: false,
			locked: false
		},
		{
			title: "2、w_girl、御-3",
			poster: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4",
			ageChecked: false,
			locked: false
		},
		{
			title: "0、小狗、JKwu",
			poster: 'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/11/08/19/BMjAyMDExMDgxOTQxNTlfNTIzNDczMzQ0XzM4OTQ1MDk5MTI4XzFfMw==_b_Bc770a92f0cf153407d60a2eddffeae2a.mp4",
			ageChecked: false,
			locked: false
		},
		{
			title: "1、图片列表",
			poster: 'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
			imgList: [
				'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028',
				'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028',
				'http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028',
				'http://gips3.baidu.com/it/u=119870705,2790914505&fm=3028',
				'http://gips0.baidu.com/it/u=2298867753,3464105574&fm=3028',
				'http://gips2.baidu.com/it/u=3944689179,983354166&fm=3028'
			],
			ageChecked: false,
			locked: false
		},
		{
			title: "4、猫耳朵、多",
			poster: 'http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028',
			url: "https://alimov2.a.yximgs.com/upic/2020/07/02/14/BMjAyMDA3MDIxNDUyMDlfOTExMjIyMjRfMzE1OTEwNjAxNTRfMV8z_b_Bf3005d42ce9c01c0687147428c28d7e6.mp4",
			ageChecked: false,
			locked: true
		},
		{
			title: "7、虎、JKwu",
			poster: 'http://gips0.baidu.com/it/u=2298867753,3464105574&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/11/08/19/BMjAyMDExMDgxOTQxNTlfNTIzNDczMzQ0XzM4OTQ1MDk5MTI4XzFfMw==_b_Bc770a92f0cf153407d60a2eddffeae2a.mp4",
			ageChecked: true,
			locked: false
		},
		{
			title: "5、花、白衣服wu",
			poster: 'http://gips3.baidu.com/it/u=119870705,2790914505&fm=3028',
			url: "https://txmov6.a.yximgs.com/upic/2020/08/23/00/BMjAyMDA4MjMwMDMyNDRfMTYzMzY5MDA0XzM0ODI4MDcyMzQ5XzFfMw==_b_B9a1c9d4e3a090bb2815994d7f33a906a.mp4",
			ageChecked: false,
			locked: false
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
			],
			ageChecked: false,
			locked: false
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
			],
			ageChecked: true,
			locked: false
		},

		{
			title: "8、c_girl、御",
			poster: 'http://gips2.baidu.com/it/u=3944689179,983354166&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4",
			ageChecked: true,
			locked: false
		},
		{
			title: "9、鱼、多",
			poster: 'http://gips0.baidu.com/it/u=3560029307,576412274&fm=3028',
			url: "https://alimov2.a.yximgs.com/upic/2020/07/02/14/BMjAyMDA3MDIxNDUyMDlfOTExMjIyMjRfMzE1OTEwNjAxNTRfMV8z_b_Bf3005d42ce9c01c0687147428c28d7e6.mp4",
			ageChecked: false,
			locked: false
		},
		{
			title: "10、猫、白衣服wu",
			poster: 'http://gips0.baidu.com/it/u=3822353666,2757632348&fm=3028',
			url: "https://txmov6.a.yximgs.com/upic/2020/08/23/00/BMjAyMDA4MjMwMDMyNDRfMTYzMzY5MDA0XzM0ODI4MDcyMzQ5XzFfMw==_b_B9a1c9d4e3a090bb2815994d7f33a906a.mp4",
			ageChecked: true,
			locked: false
		},
		{
			title: "11、海、JKwu",
			poster: 'http://gips3.baidu.com/it/u=764883555,2569275522&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/11/08/19/BMjAyMDExMDgxOTQxNTlfNTIzNDczMzQ0XzM4OTQ1MDk5MTI4XzFfMw==_b_Bc770a92f0cf153407d60a2eddffeae2a.mp4",
			ageChecked: true,
			locked: false
		},
		{
			title: "12、树、御",
			poster: 'https://gips3.baidu.com/it/u=3732338995,3528391142&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4",
			ageChecked: true,
			locked: false
		},
		{
			title: "13、城堡、多",
			poster: 'https://gips0.baidu.com/it/u=1939859157,1111239881&fm=3028',
			url: "https://alimov2.a.yximgs.com/upic/2020/07/02/14/BMjAyMDA3MDIxNDUyMDlfOTExMjIyMjRfMzE1OTEwNjAxNTRfMV8z_b_Bf3005d42ce9c01c0687147428c28d7e6.mp4",
			ageChecked: false,
			locked: false
		},
		{
			title: "14、猫头鹰、白衣服wu",
			poster: 'https://gips2.baidu.com/it/u=406595553,3023311630&fm=3028',
			url: "https://txmov6.a.yximgs.com/upic/2020/08/23/00/BMjAyMDA4MjMwMDMyNDRfMTYzMzY5MDA0XzM0ODI4MDcyMzQ5XzFfMw==_b_B9a1c9d4e3a090bb2815994d7f33a906a.mp4",
			ageChecked: true,
			locked: false
		},
		{
			title: "15、狗、JKwu",
			poster: 'http://gips0.baidu.com/it/u=398917425,2942293409&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/11/08/19/BMjAyMDExMDgxOTQxNTlfNTIzNDczMzQ0XzM4OTQ1MDk5MTI4XzFfMw==_b_Bc770a92f0cf153407d60a2eddffeae2a.mp4",
			ageChecked: true,
			locked: false
		},
		{
			title: "16、花——girl、御",
			poster: 'http://gips3.baidu.com/it/u=1874299413,3253595329&fm=3028',
			url: "https://txmov2.a.yximgs.com/upic/2020/10/02/09/BMjAyMDEwMDIwOTAwMDlfMTIyMjc0NTk0Ml8zNjk3Mjg0NjcxOF8xXzM=_b_B28a4518e86e2cf6155a6c1fc9cf79c6d.mp4",
			ageChecked: true,
			locked: false
		}
	];   // 這裡插入原有 getList 中的完整陣列資料即可
}
</script>

<style scoped lang="scss">
pages {
	background: var(--background-color-dark);
}

.play-container {
	/* #ifndef APP-NVUE */
	width: 100vw;
	height: 100%;
	color: #f3f3f3;
	/* #endif */
	background: #141c27;
	position: relative;
}

// header
.header-nav {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 32rpx 32rpx 0;
	color: var(--text-color-secondary);
	font-size: 32rpx;

	.icon {
		transform: translateY(2rpx);
		font-size: 38rpx !important;
	}

	.header-left {
		display: flex;
		gap: 48rpx;

		.header-left-item {
			display: flex;
			gap: 12rpx;
			align-items: center;

			.header-left-item-text {}
		}
	}

	.header-right {
		.icon {
			font-size: 48rpx !important;
		}
	}
}

// bottom-nav
// .bottom-nav {
// 	position: absolute;
// 	bottom: 0;
// 	left: 0;
// 	z-index: 100;
// }

/* 右側工具欄 */
.right {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-wrap: wrap;
	align-items: flex-end;
	flex-direction: column;
	justify-content: center;
	margin-right: 32rpx;


	// 頭像
	.right-tool-avatar-container-wrapper {
		position: relative;
		margin-bottom: 112rpx;

		.right-tool-avatar-container {
			position: relative;
			width: 96rpx;
			height: 96rpx;
			// border: 6rpx solid var(--primary-color);
			background: var(--primary-color);
			border-radius: 100%;
			overflow: hidden;

			::v-deep(.right-tool-avatar) {
				uni-image {
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 110% !important;
					height: 110% !important;
				}

				// 背景圖
				uni-image>div {
					background-position: center !important;
					background-size: cover !important;
				}

				// 圖片佔位
				uni-image>img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					object-position: center;
				}
			}
		}

		// 提示
		.right-tool-avatar-tip {
			position: absolute;
			top: 100%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 10;
			display: inline-flex;
			padding: 5rpx 10rpx;
			border-radius: 100%;
			border: 2.5px solid var(--text-color-secondary);
			background: var(--primary-color);

			.right-tool-avatar-tip-icon {
				transform: translateY(2rpx);
				font-size: 20rpx !important;
				color: var(--text-color-secondary);
			}

		}
	}

	.right-tool-item-container {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		margin-right: 8rpx;


		.right-tool-item-container-item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon {
				color: var(--text-color-secondary) !important;
				font-size: 54rpx !important;
				transition: color 0.3s ease-in-out;
			}

			.icon-video-favorite {
				// font-size: 64rpx !important;
				scale: 1.3;
			}

			&.active {
				.icon-video-favorite {
					color: var(--favorite-color) !important;
					animation: scaleBig 0.5s ease-in-out;
				}

				.icon-input-upload-file {
					color: var(--favorite-color) !important;
					animation: scaleBig 0.5s ease-in-out;
				}
			}
		}

		.sound-container {
			width: 58rpx;
			height: 80rpx;
			// margin: 8rpx 0;

			.icon {
				font-size: 48rpx !important;
			}
		}
	}


	.icon-val {
		color: #fff;
		font-size: 13px;
		text-align: center;
	}
}

@keyframes scaleBig {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.35);
	}

	100% {
		transform: scale(1);
	}
}

/* 遮罩 */
.mask-container {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(14px);
	z-index: -1;
	display: flex;
	justify-content: center;
	align-items: center;

	.mask-container-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32rpx;

		.mask-container-item-icon {
			font-size: 64rpx !important;
			color: var(--text-color-secondary) !important;
		}

		.mask-container-item-text-title {
			font-size: 30rpx;
		}

		.mask-container-item-text-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 20rpx;
			color: var(--text-color-octonary) !important;
		}

		.mask-container-item-button {
			display: flex;
			align-items: center;
			gap: 16rpx;

			.mask-container-item-button-item {
				display: flex;
				align-items: center;
				gap: 8rpx;
				line-height: 1;
				padding: 6rpx 12rpx 8rpx;
				font-size: 20rpx;

				&:first-child {
					background: var(--primary-color);
					color: var(--text-color-secondary);

					.mask-container-item-button-item-icon {
						font-size: 16rpx !important;
						color: var(--text-color-secondary) !important;
					}
				}

				&:last-child {
					background: var(--text-color-septenary);
				}

				.mask-container-item-button-item-icon {
					font-size: 20rpx !important;
					transform: translateY(3rpx);
				}
			}


		}
	}
}

.locked-container {
	position: fixed;
	inset: 0;
	z-index: -1;
	display: flex;
	justify-content: center;
	align-items: center;

	.locked-container-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		// gap: 32rpx;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 32rpx;
		padding: 24rpx;

		.locked-container-item-icon {
			font-size: 40rpx !important;
			color: var(--primary-color) !important;
		}

		.locked-container-item-text {
			font-weight: 300;
			font-size: 24rpx;
		}
	}
}

/* 底部影音資訊 */
.play-swiper-container {
	--bottomNav-margin-height: 32rpx; // 與底部導航的間距
	--progress-bar-margin-height: 54rpx; // 影音進度條與底部導航的間距
	--info-margin-height: 48rpx; // 影音資訊區塊與底部導航的間距

	.ml-swiper-v3-custom {}

	::v-deep(.uni-swiper-slides) {
		uni-swiper-item {
			// height: calc(100vh - 1vh - 68px) !important;
		}

		.swiper-video,
		uni-image[class="ml-scroll-img"] {
			// width: 100% !important;
			// height: calc(100vh - 1vh - 68px) !important;
			// width: 100% !important;
			object-fit: cover;

			// video {
			// 	height: 100% !important;

			// }
		}

		// 影音資訊區塊 + 進度條 + 底部導航列高
		.ml-swiper-v3-bottom {
			bottom: calc(var(--bottomNav-margin-height) + var(--progress-bar-margin-height) + var(--info-margin-height));
			padding: 0 40rpx;
			display: flex;
			flex-direction: column;
			gap: 16rpx;

			.bottom-tool-container-wrapper-avatar-container {
				position: relative;
				z-index: 100;
				// top: -50rpx;
				// left: 40rp;


				.bottom-tool-container-wrapper-avatar-container-icon {
					color: var(--text-color-secondary) !important;
					font-size: 48rpx !important;
				}
			}

			.bottom-tool-container-wrapper {
				display: flex;
				align-items: center;
				gap: 16rpx;

				.bottom-tool-container-wrapper-name {
					font-size: 32rpx;
					font-weight: 500;
				}

				.bottom-tool-container-prove {
					width: 32rpx;
					height: 32rpx;
				}

				.bottom-tool-container-wrapper-account {
					font-size: 24rpx;
				}
			}

			.bottom-tool-container-title {
				font-size: 32rpx;
			}
		}

		// 圖文多張進度條
		.ml-scroll-img-dot {
			bottom: calc(var(--bottomNav-margin-height) + var(--progress-bar-margin-height)) !important;
		}

		// 影音進度條
		.ml-swiper-v3-progress-view {
			bottom: calc(var(--bottomNav-margin-height) + var(--progress-bar-margin-height)) !important;
			background: transparent;

			.uni-slider-handle-wrapper {
				height: 2.5px; // 進度條高度
				background: var(--play-progress-color) !important; // 進度條整體背景色

				// 進度條按鈕
				.uni-slider-thumb {
					opacity: 0;
				}

				// 進度條追蹤條背景色
				.uni-slider-track {
					background: var(--text-color-secondary) !important;
				}
			}

			.ml-swiper-v3-line {
				display: none;
			}
		}

		// 全螢幕按鈕 16rpx 與底部導航 間距 全螢幕按鈕為 38+16=54rpx
		.ml-swiper-v3-fullscreen-view {
			z-index: 100;
			bottom: calc(var(--bottomNav-margin-height)) !important;
			width: 100% !important;
			display: flex;
			justify-content: space-between;
			padding: 0 40rpx;

			.fullscreen-button {
				font-size: 38rpx !important;
			}
		}

		// .fullscreen-container {
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	width: 100%;
		// }
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