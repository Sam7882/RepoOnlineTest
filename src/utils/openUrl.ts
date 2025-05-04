// TEMP: 開啟外部連結
export function openURL(url: string) {
	if (!url) return;

	// 為uni-app 提供的平台編譯判斷指令，打包階段時會刪除掉
	// App 端：使用原生瀏覽器開啟外部連結
	// #ifdef APP-PLUS
	plus.runtime.openURL(url);
	// #endif

	// H5 端：使用瀏覽器開啟新視窗
	// #ifdef H5
	window.open(url, '_blank');
	// #endif

	// 小程式：建議使用複製 + 提示
	// #ifdef MP
	uni.setClipboardData({
		data: url,
		success: () => {
			uni.showToast({ title: '連結已複製', icon: 'none' });
		},
	});
	// #endif
}
