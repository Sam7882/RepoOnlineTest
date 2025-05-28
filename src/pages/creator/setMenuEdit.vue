<template>
	<view class="set-menu">
		<c-headerNav :title="typeTitle" />
		<view class="content">
			<!-- 手機號碼 -->
			<uni-forms class="form form-phone" v-if="type === 'phone'" :model="formData" :rules="formRules.phone"
				ref="formRef">
				<uni-forms-item class="form-item" name="phone" required>
					<view class="phone-input-row">
						<uni-data-select class="country-select" v-model="selectedCountry" :localdata="countryList" :clear="false"
							:placeholder="'國碼'" />
						<uni-easyinput class="inputStyle phone-input" v-model="formData.phone" :placeholder="'請輸入手機號碼'" :trim="true"
							:clearable="false" type="number" />
					</view>
				</uni-forms-item>
				<uni-forms-item class="verifyCode-container" name="verifyCode" required>
					<view class="form-item">
						<uni-easyinput v-model="formData.verifyCode" class="inputStyle" type="text" :placeholder="'請輸入驗證碼'"
							:trim="true" :clearable="false" />
					</view>
					<view class="btn-container">
						<button type="button" class="btn" @click="verifyCodeSend">{{ verifyStatus ? `${verifyTime}秒 重新發送` : '發送'
						}}</button>
					</view>
				</uni-forms-item>
			</uni-forms>

			<!-- 登入密碼 -->
			<uni-forms class="form form-password" v-else-if="type === 'password'" :model="formData"
				:rules="formRules.password" ref="formRef">
				<uni-forms-item class="form-item" name="password" required>
					<view class="form-item">
						<uni-easyinput v-model="formData.password" class="inputStyle" type="password" :placeholder="'請輸入密碼'"
							:trim="true" :clearable="false" />
					</view>
				</uni-forms-item>
				<uni-forms-item class="form-item" name="confirmPassword" required>
					<view class="form-item">
						<uni-easyinput v-model="formData.confirmPassword" class="inputStyle" type="password"
							:placeholder="'請再輸入一次密碼'" :trim="true" :clearable="false" />
					</view>
					<view class="form-item-tip">
						<text>請輸入6-20位由數字、字母和符號任意2種組合的密碼。</text>
					</view>
				</uni-forms-item>
			</uni-forms>


			<!-- 電子信箱 -->
			<uni-forms class="form" v-else-if="type === 'email'" :model="formData" :rules="formRules.email" ref="formRef">
				<uni-forms-item class="form-item" name="email" required>
					<view class="form-item">
						<uni-easyinput v-model="formData.email" class="inputStyle" type="text" :placeholder="'請輸入電子信箱'" :trim="true"
							:clearable="false" />
					</view>
				</uni-forms-item>
				<uni-forms-item class="verifyCode-container" name="verifyCode" required>
					<view class="form-item">
						<uni-easyinput v-model="formData.verifyCode" class="inputStyle" type="text" :placeholder="'請輸入驗證碼'"
							:trim="true" :clearable="false" />
					</view>
					<view class="btn-container">
						<button type="button" class="btn" @click="verifyCodeSend">{{ verifyStatus ? `${verifyTime}秒 重新發送` : '發送'
						}}</button>
					</view>
				</uni-forms-item>
			</uni-forms>

			<!-- 其他設定（已封鎖、我的收藏、消息設定...） -->
			<!-- 電子信箱 -->
			<!-- 收藏隱私設定 type === 'favorite' -->
			<view v-if="type === 'favorite'" class="switch-list">
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">公開我的收藏</view>
						<c-checkBox class="switch-btn-container" v-model="formData.publicFavorite" />
					</view>
					<view class="switch-desc">關閉後，他人將無法檢視您的所有收藏。</view>
				</view>
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">公開我的愛心</view>
						<c-checkBox class="switch-btn-container" v-model="formData.publicLike" />
					</view>
					<view class="switch-desc">關閉後，他人將無法檢視您的所有愛心。</view>
				</view>
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">公開我的分類</view>
						<c-checkBox class="switch-btn-container" v-model="formData.publicCategory" />
					</view>
					<view class="switch-desc">關閉後，他人將無法檢視您的所有分類。</view>
				</view>
			</view>

			<!-- 消息設定 type === 'message' -->
			<view v-if="type === 'message'" class="switch-list">
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">貼文、限時動態和留言</view>
						<c-checkBox class="switch-btn-container" v-model="formData.postNotice" />
					</view>
					<view class="switch-desc"></view>
				</view>
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">訊息</view>
						<c-checkBox class="switch-btn-container" v-model="formData.message" />
					</view>
					<view class="switch-desc"></view>
				</view>
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">全部暫停</view>
						<c-checkBox class="switch-btn-container" v-model="formData.allPause" />
					</view>
					<view class="switch-desc"></view>
				</view>
			</view>
		</view>

		<!-- 發送按鈕 -->
		<view class="footer" v-if="type === 'favorite' || type === 'message'">
			<view class="btn-container">
				<button type="button" class="btn" @click="submitForm('switch')">儲存</button>
			</view>
		</view>

		<view class="btn-container" v-else>
			<button type="button" class="btn" @click="submitForm('switch')">確認</button>
		</view>
	</view>
</template>

<script setup>
// TEMP: 創作者設定-編輯頁面
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import countryData from '@/assets/country/country.json'

const type = ref('')
const typeTitle = computed(() => {
	switch (type.value) {
		case 'phone': return '手機綁定'
		case 'password': return '登入密碼'
		case 'email': return '信箱綁定'
		case 'favorite': return '收藏隱私設定'
		case 'message': return '通知設定'
		default: return ''
	}
})
onLoad((options) => {
	type.value = options.type
})

const countryList = ref([])
const selectedCountry = ref('TW')
const formData = ref({
	phone: '',
	verifyCode: '',
	password: '',
	confirmPassword: '',
	email: '',
	publicFavorite: false,
	publicLike: false,
	publicCategory: false,
	postNotice: false,
	message: false,
	allPause: false
})

const formRef = ref(null)

const formRules = {
	phone: {
		phone: [
			{ required: true, message: '請輸入手機號碼', trigger: 'blur' },
			{ pattern: /^[0-9]{6,15}$/, message: '手機號碼格式錯誤', trigger: 'blur' }
		],
		verifyCode: [
			{ required: true, message: '請輸入驗證碼', trigger: 'blur' }
		]
	},
	password: {
		password: [
			{ required: true, message: '請輸入新密碼', trigger: 'blur' },
			{ min: 6, message: '密碼至少6位', trigger: 'blur' }
		],
		confirmPassword: [
			{ required: true, message: '請再次輸入新密碼', trigger: 'blur' },
			{
				validator: (rule, value, callback) => {
					if (value !== formData.value.password) {
						callback(new Error('兩次密碼不一致'))
					} else {
						callback()
					}
				},
				trigger: 'blur'
			}
		]
	},
	email: {
		email: [
			{ required: true, message: '請輸入電子信箱', trigger: 'blur' },
			{ pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: '信箱格式錯誤', trigger: 'blur' }
		]
	}
}

const verifyStatus = ref(false)
const verifyTime = ref(60)

const verifyCodeSend = () => {
	verifyStatus.value = true
	verifyTime.value = 60
	const timer = setInterval(() => {
		verifyTime.value--
		if (verifyTime.value <= 0) {
			clearInterval(timer)
			verifyStatus.value = false
		}
	}, 1000)
}

onMounted(() => {
	const countryObj = countryData.id_to_countrycode
	countryList.value = Object.entries(countryObj)
		.filter(([key]) => key !== '0')
		.map(([key, label]) => ({
			value: key,
			text: label
		}))
})

const selectedCountryCode = computed(() => {
	return countryData.id_to_countrycode[selectedCountry.value] || ''
})

// 根據 type 組合送出資料，並加上 validate 驗證
const submitForm = (submitType) => {
	if (submitType === 'switch') {
		switchSubmit()
	}
	else {
		formSubmit()
	}
}
const switchSubmit = () => {
	let payload = {}
	if (type.value === 'favorite') {
		payload = {
			publicFavorite: formData.value.publicFavorite,
			publicLike: formData.value.publicLike,
			publicCategory: formData.value.publicCategory
		}
		console.log('送出資料:', payload)
	}
	else if (type.value === 'message') {
		payload = {
			postNotice: formData.value.postNotice,
			message: formData.value.message,
			allPause: formData.value.allPause,
		}
	}
}
const formSubmit = () => {
	let payload = {}
	formRef.value.validate()
		.then(() => {
			if (type.value === 'phone') {
				payload = {
					phone: selectedCountryCode.value + formData.value.phone,
					verifyCode: formData.value.verifyCode
				}
			} else if (type.value === 'password') {
				payload = {
					password: formData.value.password,
					confirmPassword: formData.value.confirmPassword
				}
			} else if (type.value === 'email') {
				payload = {
					email: formData.value.email,
					verifyCode: formData.value.verifyCode
				}
			}
			console.log('送出資料:', payload)
			// 這裡可串接API
		}).catch(err => {
			console.log('驗證失敗:', err)
		})
}
</script>

<style scoped lang="scss">
.set-menu {
	--footer-height: 180rpx;
}

// 圖標容器
.header-nav-left-position {
	position: absolute;
	left: 48rpx;
	top: 50%;
	transform: translateY(-20%);
	padding-top: 16rpx;
}

.content {
	padding-top: 50rpx;
	padding-bottom: var(--footer-height);
}

.btn-container {
	padding: 0 40rpx;
	margin-top: 42rpx;

	.btn {
		padding: 24rpx;
		font-size: 30rpx;
	}
}

.form {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	padding: 0 48rpx;

	::v-deep(.uni-forms) {
		.uni-forms-item__label {
			display: none;
		}
	}



	.form-item {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;

		&:last-child {
			margin-bottom: 0;
		}

		.form-input-icon {
			position: absolute;
			left: 16rpx;
			top: 50%;
			z-index: 10;
			transform: translateY(-50%);
			margin-left: 32rpx;
			font-size: 36rpx !important;

			&.email {
				font-size: 28rpx !important;
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

	/* 手機號碼 */
	.phone-input-row {
		display: flex;
		flex-direction: row;

		.country-select {
			width: fit-content;
			flex: unset;

			::v-deep(.uni-stat-box) {
				.uni-stat-box {
					height: 100%;
				}

				.uni-select {
					border: none;
					background: var(--text-color-tertiary);
					border-radius: 20rpx 0 0 20rpx;
					height: 100%;
					width: fit-content;
					padding-left: 40rpx;

					.uni-select__input-box {
						padding: 20rpx 12rpx 20rpx;
						height: fit-content;
						width: fit-content;
						gap: 30rpx;

					}

					.uni-select__input-text {
						font-size: 30rpx;
						line-height: 1;
					}
				}
			}
		}

		.phone-input {
			flex: 1;

			::v-deep(.is-input-border) {
				.is-input-border {
					border-radius: 0 20rpx 20rpx 0;
					padding: 20rpx 0;
				}

				.uni-easyinput__content-input {
					height: fit-content;
					line-height: 1;
					font-size: 30rpx;
				}
			}
		}
	}

	/* 驗證碼 */
	.verifyCode-container {
		position: relative;

		.btn-container {
			position: absolute;
			top: 50%;
			right: 24rpx;
			transform: translateY(-50%);
			padding: 0;

			.btn {
				border-radius: 10rpx;
				padding: 12rpx 30rpx;
				font-size: 24rpx;
			}
		}
	}

	.form-item-tip {
		margin: 22rpx 0 22rpx 8rpx;
		font-size: 24rpx;
		color: var(--text-color-gray3);
	}
}

.form-password {
	::v-deep(uni-form) {
		.uni-forms-item:last-child {
			margin-bottom: 0;
		}
	}
}

/* 開關 c-checkBox*/
.switch-list {
	display: flex;
	flex-direction: column;
	gap: 56rpx;
	padding: 0 48rpx;

	.switch-item {
		display: flex;
		flex-direction: column;

		.switch-item-content {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 12rpx;
		}

		.switch-title {
			font-size: 30rpx;
			line-height: 1;
		}

		.switch-desc {
			font-size: 24rpx;
			color: var(--text-color-gray3);
			line-height: 1;
		}



	}

	.switch-btn-container {
		width: fit-content;
		height: fit-content;

		::v-deep(.switch) {
			.switch {
				width: fit-content;
				height: fit-content;
				padding: 20rpx 36rpx;

				.switch-dot {
					width: 30rpx;
					height: 30rpx;
					top: 50%;
					translate: 0 -50%;
				}

				&.switch-checked {
					.switch-dot {
						left: calc(100% - 30rpx - 6rpx) !important;
					}
				}
			}
		}
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
			border-radius: 20rpx;
			padding: 8rpx 32rpx;
			padding-left: 40rpx;

			&.is-focused {
				// border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}

			.uni-easyinput__content-input {
				padding: 0 !important;
			}

			.uni-input-input {
				font-size: 28rpx;
			}
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}

.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding-top: 20rpx;
	padding-bottom: 60rpx;
	background: var(--background-color);

	.btn-container {
		margin-top: 0;
	}

	// padding: 0 48rpx;
}
</style>