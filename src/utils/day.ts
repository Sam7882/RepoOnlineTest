import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-tw'
import 'dayjs/locale/en'
import 'dayjs/locale/ja'
import 'dayjs/locale/ko'
import 'dayjs/locale/th'
import 'dayjs/locale/vi'
import 'dayjs/locale/zh-cn'

// 擴展相對時間插件
dayjs.extend(relativeTime)

// 語言映射表
const LOCALE_MAP = {
	'zh-TW': 'zh-tw',
	'zh-CN': 'zh-cn',
	'en-US': 'en',
	'ja': 'ja',
	'ko': 'ko',
	'th': 'th',
	'vi': 'vi'
} as const

// 設置默認語言為繁體中文
dayjs.locale('zh-tw')

// 日期時間格式化工具方法
export class DayUtils {
	/**
	 * 設置 Day.js 語言
	 * @param language 語言代碼 (例如: 'zh-TW', 'en-US')
	 */
	static setLocale(language: string) {
		const locale = LOCALE_MAP[language as keyof typeof LOCALE_MAP] || 'zh-tw'
		dayjs.locale(locale)
	}

	/**
	 * 獲取當前語言
	 * @returns 當前語言代碼
	 */
	static getCurrentLocale() {
		return dayjs.locale()
	}

	/**
	 * 將日期字符串轉換為 Day.js 對象
	 * @param dateStr 日期字符串 (格式: YYYYMMDD)
	 * @param timeStr 時間字符串 (格式: HH:mm)
	 * @returns Day.js 對象
	 */
	static parseDateTime(dateStr: string, timeStr: string) {
		const year = dateStr.substring(0, 4)
		const month = dateStr.substring(4, 6)
		const day = dateStr.substring(6, 8)

		return dayjs(`${year}-${month}-${day} ${timeStr}`)
	}

	/**
	 * 格式化日期時間
	 * @param date Day.js 對象或日期字符串
	 * @param format 格式化模板
	 * @returns 格式化後的字符串
	 */
	static format(date: dayjs.Dayjs | string | Date, format: string = 'YYYY-MM-DD HH:mm:ss') {
		return dayjs(date).format(format)
	}

	/**
	 * 獲取相對時間描述
	 * @param date Day.js 對象或日期字符串
	 * @returns 相對時間字符串
	 */
	static fromNow(date: dayjs.Dayjs | string | Date) {
		return dayjs(date).fromNow()
	}

	/**
	 * 檢查日期是否已過期
	 * @param date Day.js 對象或日期字符串
	 * @returns 是否已過期
	 */
	static isExpired(date: dayjs.Dayjs | string | Date) {
		return dayjs(date).isBefore(dayjs())
	}

	/**
	 * 計算兩個日期之間的差異
	 * @param date1 日期1
	 * @param date2 日期2
	 * @param unit 單位 ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second')
	 * @returns 差異值
	 */
	static diff(date1: dayjs.Dayjs | string | Date, date2: dayjs.Dayjs | string | Date, unit: dayjs.OpUnitType = 'day') {
		return dayjs(date1).diff(dayjs(date2), unit)
	}

	/**
	 * 添加時間
	 * @param date Day.js 對象或日期字符串
	 * @param amount 數量
	 * @param unit 單位
	 * @returns 新的 Day.js 對象
	 */
	static add(date: dayjs.Dayjs | string | Date, amount: number, unit: dayjs.ManipulateType) {
		return dayjs(date).add(amount, unit)
	}

	/**
	 * 減去時間
	 * @param date Day.js 對象或日期字符串
	 * @param amount 數量
	 * @param unit 單位
	 * @returns 新的 Day.js 對象
	 */
	static subtract(date: dayjs.Dayjs | string | Date, amount: number, unit: dayjs.ManipulateType) {
		return dayjs(date).subtract(amount, unit)
	}

	/**
	 * 獲取當前時間
	 * @returns 當前時間的 Day.js 對象
	 */
	static now() {
		return dayjs()
	}

	/**
	 * 獲取今天的開始時間 (00:00:00)
	 * @returns 今天的開始時間
	 */
	static startOfDay(date?: dayjs.Dayjs | string | Date) {
		return dayjs(date).startOf('day')
	}

	/**
	 * 獲取今天的結束時間 (23:59:59)
	 * @returns 今天的結束時間
	 */
	static endOfDay(date?: dayjs.Dayjs | string | Date) {
		return dayjs(date).endOf('day')
	}

	/**
	 * 檢查是否為同一天
	 * @param date1 日期1
	 * @param date2 日期2
	 * @returns 是否為同一天
	 */
	static isSameDay(date1: dayjs.Dayjs | string | Date, date2: dayjs.Dayjs | string | Date) {
		return dayjs(date1).isSame(dayjs(date2), 'day')
	}

	/**
	 * 轉換為 ISO 字符串
	 * @param date Day.js 對象或日期字符串
	 * @returns ISO 字符串
	 */
	static toISOString(date: dayjs.Dayjs | string | Date) {
		return dayjs(date).toISOString()
	}

	/**
	 * 轉換為本地時間字符串 (根據當前語言)
	 * @param date Day.js 對象或日期字符串
	 * @returns 本地時間字符串
	 */
	static toLocalString(date: dayjs.Dayjs | string | Date) {
		const currentLocale = dayjs.locale()

		// 根據不同語言返回不同格式
		switch (currentLocale) {
			case 'zh-tw':
				return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
			case 'zh-cn':
				return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
			case 'en':
				return dayjs(date).format('MMM DD, YYYY HH:mm:ss')
			case 'ja':
				return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
			case 'ko':
				return dayjs(date).format('YYYY년 MM월 DD일 HH:mm:ss')
			case 'th':
				return dayjs(date).format('DD MMM YYYY HH:mm:ss')
			case 'vi':
				return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
			default:
				return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
		}
	}
}

// 常用的格式化模板
export const DATE_FORMATS = {
	DATE: 'YYYY-MM-DD',
	TIME: 'HH:mm:ss',
	DATETIME: 'YYYY-MM-DD HH:mm:ss',
	DATE_ZH: 'YYYY年MM月DD日',
	TIME_ZH: 'HH時mm分ss秒',
	DATETIME_ZH: 'YYYY年MM月DD日 HH:mm:ss',
	MONTH_DAY: 'MM-DD',
	MONTH_DAY_ZH: 'MM月DD日',
	HOUR_MINUTE: 'HH:mm',
	HOUR_MINUTE_ZH: 'HH時mm分'
} as const

// 導出 dayjs 實例供直接使用
export { dayjs }

// 保留原有的 DOM 相關方法
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


// ========================================
// �� DayUtils 使用範例
// ========================================

/*
// 🌍 語言設置
DayUtils.setLocale('zh-TW')  // 設置繁體中文
DayUtils.setLocale('en-US')  // 設置英文
DayUtils.getCurrentLocale()  // 獲取當前語言

// 📅 日期解析與格式化
const date = DayUtils.parseDateTime('20250515', '07:00')  // 解析日期時間
DayUtils.format(date, 'YYYY-MM-DD HH:mm:ss')              // 格式化顯示
DayUtils.format(date, DATE_FORMATS.DATETIME_ZH)           // 使用預定義格式

// ⏰ 時間計算
const tomorrow = DayUtils.add(new Date(), 1, 'day')       // 加一天
const yesterday = DayUtils.subtract(new Date(), 1, 'day') // 減一天
const diffHours = DayUtils.diff(date1, date2, 'hour')     // 計算差異

// 🔍 狀態檢查
DayUtils.isExpired(scheduledDate)                         // 檢查是否過期
DayUtils.isSameDay(date1, date2)                          // 檢查是否同一天
const now = DayUtils.now()                                // 獲取當前時間

// 🌐 本地化顯示
DayUtils.fromNow(date)                                    // "5分鐘前", "2小時後"
DayUtils.toLocalString(date)                              // 根據語言顯示本地格式
DayUtils.toISOString(date)                                // 轉換為 ISO 格式

// �� 時間範圍
const startOfDay = DayUtils.startOfDay()                  // 今天開始 (00:00:00)
const endOfDay = DayUtils.endOfDay()                      // 今天結束 (23:59:59)

// 📊 計算差距天數
const diffDays = DayUtils.diff(date1, date2, 'day')       // 計算相差幾天
*/