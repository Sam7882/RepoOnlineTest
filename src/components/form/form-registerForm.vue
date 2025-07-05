<template>
	<!-- 表單區塊 -->
	<uni-forms ref="formRef" id="registerForm" :model="formData" :rules="formRules" class="form">
		<!-- 姓名 -->
		<uni-forms-item name="name" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.name" class="inputStyle" :placeholder="$t('auth.name')" :trim="true"
					:clearable="false" />
				<uni-icons class="form-input-icon" type="icon-common-person-circle" custom-prefix="icon" size="24"
					color="#999" />
			</view>
		</uni-forms-item>

		<!-- 手機號碼 -->
		<uni-forms-item name="phone" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.phone" class="inputStyle" :placeholder="$t('auth.phone')" :trim="true"
					:clearable="false" />
				<uni-icons class="form-input-icon" type="icon-input-phone" custom-prefix="icon" size="24" color="#999" />
			</view>
		</uni-forms-item>

		<!-- 性別 -->
		<view class="gender-container" style="position: relative;" id="target">
			<uni-forms-item name="gender" required>
				<view class="form-item">
					<view class="cover-input" @click="openFilter"></view>
					<uni-easyinput disabled v-model="formData.gender" class="inputStyle" :placeholder="$t('auth.gender')"
						:trim="true" :clearable="false" />
					<uni-icons class="form-input-icon" type="icon-input-gender" custom-prefix="icon" size="24" color="#999" />
				</view>
			</uni-forms-item>
			<view id="dropDown-menu" class="dropDown-menu"
				:style="{ visibility: showGender ? 'visible' : 'hidden', ...filterSelectShowTop }">
				<view class="dropDown-menu-fakeBg" @click="closeFilter()"></view>
				<view class="dropDown-menu-item" @click="selectGender(0)">{{ $t('auth.male') }}</view>
				<view class="dropDown-menu-item" @click="selectGender(1)">{{ $t('auth.female') }}</view>
			</view>
		</view>

		<!-- 生日 -->
		<uni-forms-item name="birthday" class="birthday-container" required>
			<view class="form-item">
				<uni-datetime-picker v-model="formData.birthday" class="dateStyle" type="date" :clear-icon="false"
					:placeholder="$t('auth.birthday')" @click="console.log('click')" />
				<uni-icons class="form-input-icon" type="icon-input-date" custom-prefix="icon" size="24" color="#999" />
			</view>
		</uni-forms-item>

		<!-- 信箱 -->
		<uni-forms-item name="email" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.email" class="inputStyle" :placeholder="$t('auth.email')" :trim="true"
					:clearable="false" />
				<uni-icons class="form-input-icon email" type="icon-menu-email" custom-prefix="icon" size="24" color="#999" />
			</view>
		</uni-forms-item>

		<!-- 密碼 -->
		<uni-forms-item name="password" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.password" class="inputStyle" type="password" :placeholder="$t('auth.password')"
					:trim="true" :clearable="false" />
				<uni-icons class="form-input-icon" type="icon-common-locked" custom-prefix="icon" size="24" color="#999" />
				<!-- <text class="input-tip">{{ $t('auth.passwordValid') }}</text> -->
			</view>
		</uni-forms-item>

		<!-- 確認密碼 -->
		<uni-forms-item name="confirmPassword" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.confirmPassword" class="inputStyle" type="password"
					:placeholder="$t('auth.confirmPassword')" :trim="true" :clearable="false" />
				<uni-icons class="form-input-icon" type="icon-common-locked" custom-prefix="icon" size="24" color="#999" />
				<!-- <text class="input-tip">{{ $t('auth.passwordValid') }}</text> -->
			</view>
		</uni-forms-item>

		<!-- 註冊按鈕 -->
		<view class="btn-container">
			<button type="button" class="btn register-btn" @click="handleRegister">
				{{ $t('auth.register') }}
			</button>
		</view>

	</uni-forms>
</template>

<script setup>
// TEMP: 組件-PC註冊彈窗表單
import { onShow } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const emit = defineEmits(['register'])

// 性別顯示用
const gender = ref('');
const genderText = ref('');
// 用於計算 filterSelect 該顯示的位置
const filterSelectShowTop = ref({})
const filterSelectshowDeco = ref({})
// 關閉篩選
const showGender = ref(false)
const closeFilter = () => {
	showGender.value = false
}
// 開啟篩選
const openFilter = () => {
	console.log("🚀 ~ openFilter ~ openFilter :")
	// 頂部距離 不夠下拉選單出現
	if (topDistance.value < filterSelectHeight.value + 20) {
		filterSelectShowTop.value = {
			top: '100%',
			left: '0',
		}
		filterSelectshowDeco.value = {
			top: '-4rpx',
			left: '20%'
		}
	} else {
		// 頂部距離 夠下拉選單出現
		filterSelectShowTop.value = {
			bottom: '100%',
			left: '0',
		}
		filterSelectshowDeco.value = {
			bottom: '-4rpx',
			left: '20%',
			rotate: '180deg'
		}
	}
	showGender.value = true
	// genderPopup.value.open()
}
// 篩選
const filterSelect = (value) => {
	showGender.value = false
	filterList.value.value = value
	console.log(value);
}
// 用於計算 篩選按鈕頂部距離 與 下拉選單高度
// 用於計算 篩選按鈕頂部距離
const topDistance = ref(0)
const updateRect = () => {
	const query = uni.createSelectorQuery().in(uni.$scope)
	query.select('#target').boundingClientRect((rect) => {
		if (!rect) return
		const windowHeight = uni.getSystemInfoSync().windowHeight
		topDistance.value = rect.top
	}).exec()
}
// 用於計算 下拉選單高度
const filterSelectHeight = ref(0)
const getElementHeight = (selector = '#target') => {
	const query = uni.createSelectorQuery().in(uni.$scope)
	query.select(selector).boundingClientRect(rect => {
		if (rect) {
			filterSelectHeight.value = rect.height
		}
	}).exec()
}

const selectGender = (value) => {
	gender.value = value;
	genderText.value = gender.value === 0 ? t('auth.male') : t('auth.female');
	formData.gender = genderText.value;
	closeFilter();
}

const formRef = ref();

const formData = reactive({
	name: null,
	phone: null,
	gender: null,
	genderText: null,
	birthday: null,
	email: null,
	password: null,
	confirmPassword: null
});

const formRules = {
	name: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.name') }) }
		]
	},
	phone: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.phone') }) },
			{ pattern: /^[0-9]{10}$/, errorMessage: t('auth.rules.phone.pattern') }
		]
	},
	gender: {
		rules: [
			{ required: false, errorMessage: t('auth.pleaseEnter', { title: t('auth.gender') }) }
		]
	},
	birthday: {
		rules: [
			{ required: false, errorMessage: t('auth.pleaseEnter', { title: t('auth.birthday') }) }
		]
	},
	email: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.email') }) },
			{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMessage: t('auth.rules.email.pattern') }
		]
	},
	password: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.password') }) },
			{ pattern: /^[a-zA-Z0-9]{6,20}$/, errorMessage: t('auth.rules.password.pattern') }
		]
	},
	confirmPassword: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.confirmPassword') }) },
			{
				validator: (rule, value, callback) => {
					if (value !== formData.password) {
						callback(t('auth.confirmPasswordError'));
					} else {
						callback();
					}
				}
			}
		]
	}
};
const handleRegister = () => {
	console.log("🚀 ~ formRef.value.validate ~ formRef.value:", formRef.value)
	formRef.value.validate().then((res) => {
		console.log('✅ 驗證成功，送出資料:', res);
		emit('register')
		// 成功邏輯
	}).catch((err) => {
		console.log('❌ 驗證失敗:', err);
		// 驗證失敗
	});
};

// 修改生命週期鉤子
onMounted(() => {
	// 在組件掛載後執行
	updateRect()
	getElementHeight()
})

// onShow(() => {
// 	// 初始計算一次
// 	updateRect()
// 	getElementHeight('#dropDown-menu')
// })

</script>

<style lang="scss" scoped>
.form {
	display: flex;
	flex-direction: column;
	gap: 24rpx;

	::v-deep(.uni-forms) {
		.uni-forms-item__label {
			display: none;
		}

		.uni-forms-item {
			overflow: visible;
		}

		.uni-forms-item.birthday-container {
			z-index: calc(var(--z-index-max) + 1) !important;

			&:hover {
				cursor: pointer;
			}
		}
	}

	.form-item {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		overflow: visible;

		.form-input-icon {
			position: absolute;
			left: 16rpx;
			top: 50%;
			z-index: 10;
			transform: translateY(-50%);
			margin-left: 32rpx;
			font-size: var(--font-size-title-pc-large) !important;

			&.email {
				font-size: var(--font-size-content-pc-small) !important;
			}
		}
	}

	.form-item-label {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}

.uni-easyinput {
	margin-bottom: 20rpx;
}

.register-btn {
	background-color: #9e80ff;
	color: #fff;
	font-size: var(--font-size-title-pc);
	border-radius: 50rpx;
	margin-top: 20rpx;
}

.cover-input {
	position: absolute;
	inset: 0;
	z-index: calc(var(--z-index-max) + 1) !important;

	&:hover {
		cursor: pointer;
	}
}

/* 輸入欄位 */
// INPUT 輸入欄位
.inputStyle {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none;
			background: var(--text-color-tertiary) !important;
			border-radius: 64rpx;
			padding: 8rpx 32rpx;
			padding-left: 80rpx;

			.uni-easyinput__placeholder-class,
			.uni-input-input {
				font-size: var(--font-size-content-pc);
			}

			&.is-focused {
				border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}

// 日期 輸入欄位
.dateStyle {
	::v-deep(.uni-date-editor) {
		margin-bottom: 0rpx;

		.uni-date-x--border {
			border: none;
			background: var(--text-color-tertiary) !important;
			border-radius: 64rpx;
			padding: 8rpx 32rpx;
		}

		.uni-date-x {
			background: transparent;
			color: var(--text-color-quaternary);
		}

		.uni-date-x .icon-calendar {
			visibility: hidden;
			color: var(--text-color-tertiary);
		}

		.uni-date__x-input {
			font-size: var(--font-size-content-pc-small);
			padding-left: 24rpx;
		}
	}

	&.errorStyle ::v-deep(.uni-date-editor) {
		.uni-date-x--border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}

/* 日期選擇器具 */
::v-deep(.uni-calendar-item__weeks-box) {
	.uni-calendar-item__weeks-box .uni-calendar-item--checked {
		background-color: var(--primary-color) !important;
	}
}

::v-deep(.uni-date-btn--ok) {
	.uni-datetime-picker--btn {
		background-color: var(--primary-color) !important;
		border-radius: 24rpx !important;
	}
}

// 性別選擇

.gender-container {
	position: relative;
	// 因 uni-form-item 會有層級關係，故頂部的要高於 後續的form-item
	z-index: calc(var(--z-index-max) + 1) !important;
	overflow: visible;
}

// 下拉選單
.dropDown-menu {
	position: absolute;
	// z-index: calc(var(--z-index-max) + 1) !important;
	margin-top: 10rpx;
	margin-left: 32rpx;
	width: 50%;
	background: var(--background-color-light);
	border-radius: 12rpx;
	border: 1px solid var(--background-color-grayLight2);

	.dropDown-menu-fakeBg {
		position: fixed;
		inset: 0;
		z-index: -1 !important;
	}

	.dropDown-menu-item {
		padding: 20rpx;
		font-size: var(--font-size-content-pc);

		&:hover {
			cursor: pointer;
			background: var(--primary-color);
			color: var(--text-color-secondary);
		}
	}
}
</style>