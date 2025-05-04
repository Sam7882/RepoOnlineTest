<template>
	<view class="chart-box">
		<view class="chart-title">{{ $t('charts.analysisReport') }}（{{ $t('charts.pieChart') }}）</view>
		<qiun-data-charts type="pie" :opts="opts" :chartData="chartData" canvas2d />
	</view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
	chartData: Object,
	opts: Object
});

/**
 * 父組件可傳遞以下兩個 props：
 *
 * 1️⃣ chartData 結構如下：
 * {
 *   series: Array<{
 *     name: string,   // 名稱
 *     data: number,   // 數值
 *     color?: string  // 顏色（可選）
 *   }>
 * }
 *
 * 2️⃣ opts：qiun-data-charts 支援的圖表設定，常見：
 * {
 *   color: string[]
 *   padding: number[]
 *   legend: { show: boolean, position?: 'top' | 'bottom' }
 *   extra: {
 *     pie: {
 *       activeOpacity?: number,
 *       activeRadius?: number,
 *       offsetAngle?: number,
 *       customRadius?: number,
 *       labelWidth?: number,
 *       border?: boolean
 *     }
 *   }
 * }
 */
/* 
const pieChartOpts = {
	// 📌 顏色對應順序：會套用到 series 中每一塊資料
	color: ['#f56c6c', '#67c23a', '#409eff', '#e6a23c', '#909399'],
	// 📌 圖例（Legend）設定
	legend: {
		show: true,          // 是否顯示圖例
		position: 'bottom'   // 圖例位置，可選：'top' | 'bottom'
	},
	// 📌 圖表的 padding（上下左右）rpx 單位
	padding: [15, 15, 15, 15],
	// 📌 額外設定：pie 圖專用
	extra: {
		pie: {
			activeOpacity: 0.5,   // 點擊/選中時的透明度（0~1）
			activeRadius: 10,     // 點擊/選中時外擴的距離（rpx）
			offsetAngle: 0,       // 圖表旋轉角度（0 表示從右側 3 點鐘方向開始）
			labelWidth: 15,       // 圓餅內 label 文字所佔最大寬度（影響文字自動排布）
			border: false,        // 是否繪製邊框線條（true 為每塊圓餅邊界加線）
			labelShow: true 			// 顯示名稱+百分比標籤
		}
	}
};
*/

</script>

<style scoped>
.chart-box {
	padding: 24rpx;
	background-color: #fff;
	border-radius: 20rpx;
}
</style>
