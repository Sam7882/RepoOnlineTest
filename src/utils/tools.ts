// 公共工具方法

// DOM 元素相關方法
/**
 * 獲取 DOM 元素信息
 * @param selector DOM 選擇器
 * @param callback 回調函數，參數為元素信息
 * @param context 組件上下文 (可選)
 */
export function getElementInfo(selector: string, callback?: (info: any) => void, context?: any) {
	const query = context ? uni.createSelectorQuery().in(context) : uni.createSelectorQuery()
	console.log("🚀 ~ getElementInfo ~ query:", query)
	query.select(selector).boundingClientRect((rect: any) => {
		if (rect && callback) {
			callback(rect)
		}
	}).exec()
}

/**
 * 獲取多個 DOM 元素信息
 * @param selectors DOM 選擇器陣列
 * @param callback 回調函數，參數為元素信息陣列
 * @param context 組件上下文 (可選)
 */
export function getMultipleElementsInfo(selectors: string[], callback?: (infos: any[]) => void, context?: any) {
	const query = context ? uni.createSelectorQuery().in(context) : uni.createSelectorQuery()

	selectors.forEach(selector => {
		query.select(selector).boundingClientRect()
	})

	query.exec((results: any[]) => {
		if (callback) {
			const validResults = results.filter(result => result !== null)
			callback(validResults)
		}
	})
}