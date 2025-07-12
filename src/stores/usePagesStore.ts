import { defineStore } from 'pinia'
import { pages } from '@/pages.json'

interface PageInfo {
	path: string
	style?: {
		navigationStyle?: string
		backgroundColor?: string
		[key: string]: any
	}
	[key: string]: any
}

export const usePagesStore = defineStore('pages', () => {
	// 使用 Set 來存儲頁面路徑，提供 O(1) 查詢效能
	const pagesSet = new Set<string>()

	// 頁面資料映射表，用於快速查找頁面資訊
	const pagesMap = new Map<string, PageInfo>()

	// 初始化 store
	const initPagesStore = () => {
		pages.forEach((page: PageInfo) => {
			pagesSet.add(page.path)
			pagesMap.set(page.path, page)
		})
		console.log('🚀 ~ usePagesStore ~ 初始化完成，共載入頁面數量:', pagesSet.size)
	}

	// 檢查頁面是否存在
	const hasPage = (path: string): boolean => {
		return pagesSet.has(path)
	}

	// 根據路徑獲取頁面資訊
	const getPageInfo = (path: string): PageInfo | undefined => {
		return pagesMap.get(path)
	}

	// 根據路徑獲取頁面背景色
	const getPageBackgroundColor = (path: string): string | undefined => {
		const pageInfo = pagesMap.get(path)
		return pageInfo?.style?.backgroundColor
	}

	// 獲取所有頁面路徑
	const getAllPagePaths = (): string[] => {
		return Array.from(pagesSet)
	}

	// 獲取所有頁面資訊
	const getAllPages = (): PageInfo[] => {
		return Array.from(pagesMap.values())
	}

	// 根據條件篩選頁面
	const filterPages = (predicate: (page: PageInfo) => boolean): PageInfo[] => {
		return getAllPages().filter(predicate)
	}

	// 查找有背景色設定的頁面
	const getPagesWithBackgroundColor = (): PageInfo[] => {
		return filterPages(page => !!page.style?.backgroundColor)
	}

	// 根據背景色查找頁面
	const getPagesByBackgroundColor = (backgroundColor: string): PageInfo[] => {
		return filterPages(page => page.style?.backgroundColor === backgroundColor)
	}

	// 檢查路徑是否為有效頁面路徑（支援帶斜線的路徑）
	const isValidPagePath = (path: string): boolean => {
		// 移除開頭的斜線
		const cleanPath = path.replace(/^\/+/, '')
		return hasPage(cleanPath)
	}

	// 根據完整路徑獲取頁面資訊（支援帶斜線的路徑）
	const getPageInfoByFullPath = (fullPath: string): PageInfo | undefined => {
		const cleanPath = fullPath.replace(/^\/+/, '')
		return getPageInfo(cleanPath)
	}

	// 根據完整路徑獲取背景色
	const getBackgroundColorByFullPath = (fullPath: string): string | undefined => {
		const cleanPath = fullPath.replace(/^\/+/, '')
		return getPageBackgroundColor(cleanPath)
	}

	return {
		// 初始化
		initPagesStore,

		// 查詢方法
		hasPage,
		getPageInfo,
		getPageBackgroundColor,
		getAllPagePaths,
		getAllPages,

		// 篩選方法
		filterPages,
		getPagesWithBackgroundColor,
		getPagesByBackgroundColor,

		// 路徑處理方法
		isValidPagePath,
		getPageInfoByFullPath,
		getBackgroundColorByFullPath,

		// 原始資料（如果需要）
		pages,
		pagesSet,
		pagesMap
	}
}) 