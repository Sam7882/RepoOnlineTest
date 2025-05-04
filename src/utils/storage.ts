export const storage = {
	set(key: string, value: any) {
		uni.setStorageSync(key, value);
	},
	get(key: string) {
		return uni.getStorageSync(key);
	},
	remove(key: string) {
		uni.removeStorageSync(key);
	},
	clear() {
		uni.clearStorageSync();
	},
};

