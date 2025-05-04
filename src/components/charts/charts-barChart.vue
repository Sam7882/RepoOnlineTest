<!-- components/charts/AnalysisBarChart.vue -->
<template>
	<view class="chart-box">
		<view class="chart-title">{{ $t('charts.analysisReport') }}（{{ $t('charts.barChart') }}）</view>
		<qiun-data-charts type="column" :opts="opts" :chartData="chartData" canvas2d />
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
 *   categories: string[],
 *   series: Array<{
 *     name: string,
 *     data: number[],
 *     color?: string
 *   }>
 * }
 *
 * 2️⃣ opts：qiun-data-charts 支援的圖表設定，常見：
 * {
 *   color: string[]
 *   padding: number[]
 *   legend: { show: boolean }
 *   dataLabel: boolean
 *   xAxis: { disableGrid: boolean }
 *   yAxis: {
 *     min: number,
 *     data: [{ position: 'left', title?: string }]
 *   }
 *   extra: {
 *     column: {
 *       type: 'group' | 'stack',
 *       width: number,
 *       barBorderCircle?: boolean,
 *       linearType?: 'custom' | 'none',
 *       seriesGap?: number,
 *       categoryGap?: number
 *     }
 *   }
 * }
 */
/* 
const barChartOpts = {
	// 📌 顏色與 series 對應
	color: ['#f56c6c'],
	// 📌 四邊內距（rpx）
	padding: [15, 15, 15, 15],
	// 📌 圖例設置
	legend: {
		show: true
	},
	// 📌 顯示每根柱上方的數字
	dataLabel: true,
	// 📌 X 軸設定
	xAxis: {
		disableGrid: false // 顯示輔助線
	},
	// 📌 Y 軸設定
	yAxis: {
		min: 0,
		data: [
			{
				position: 'left',
				title: '人數'
			}
		]
	},
	// 📌 額外樣式設定（柱狀圖專用）
	extra: {
		column: {
			type: 'group',         // 柱狀類型：group（並排）或 stack（堆疊）
			width: 20,             // 每根柱子的寬度（rpx）
			barBorderCircle: true, // 是否圓角柱子
			linearType: 'none',    // 是否使用漸層：'none' 為單色，'custom' 自定漸層
			seriesGap: 5,          // 同組不同柱之間距離
			categoryGap: 10        // 組與組之間距離
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
