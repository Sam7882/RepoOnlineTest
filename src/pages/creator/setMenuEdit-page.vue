<template>
	<view class="set-menu">
		<c-headerNav :title="typeTitle" />
		<view class="content">
			<!-- 帳號綁定 -->
			<form-setMenu-phoneBindForm v-if="type === 'phoneBind'" @submit="submitForm" class="bottom-btn" />
			<!-- 密碼 -->
			<form-setMenu-passwordForm v-else-if="type === 'password'" @submit="submitForm" class="bottom-btn" />
			<!-- 電子信箱 -->
			<form-setMenu-emailForm v-else-if="type === 'email'" @submit="submitForm" class="bottom-btn" />
			<!-- 收藏隱私設定 -->
			<form-setMenu-favoritePrivacyForm v-else-if="type === 'favorite'" @submit="submitForm" class="bottom-btn" />
			<!-- 消息設定 -->
			<form-setMenu-messageForm v-else-if="type === 'message'" @submit="submitForm" class="bottom-btn" />
		</view>
	</view>
</template>

<script setup>
// TEMP: 創作者設定-帳號設定編輯頁
import formSetMenuPhoneBindForm from '@/components/form/form-setMenu-phoneBindForm.vue'
import formSetMenuPasswordForm from '@/components/form/form-setMenu-passwordForm.vue'
import formSetMenuEmailForm from '@/components/form/form-setMenu-emailForm.vue'
import formSetMenuFavoritePrivacyForm from '@/components/form/form-setMenu-favoritePrivacyForm.vue'
import formSetMenuMessageForm from '@/components/form/form-setMenu-messageForm.vue'
import { onLoad, onShow } from '@dcloudio/uni-app';
import { checkViewportAutoReplace } from '@/utils/routers';
import countryData from '@/assets/country/country.json'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const type = ref('')
const typeTitle = computed(() => {
	switch (type.value) {
		case 'phoneBind': return t('creator.phoneBind')
		case 'password': return t('creator.loginPassword')
		case 'email': return t('creator.emailBind')
		case 'favorite': return t('creator.favoritePrivacySetting')
		case 'message': return t('creator.notificationSetting')
		default: return ''
	}
})
onLoad((options) => {
	type.value = options.type
})

onShow(() => {
	checkViewportAutoReplace()
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
	// phone: {
	// 	phone: [
	// 		{ required: true, message: '請輸入手機號碼', trigger: 'blur' },
	// 		{ pattern: /^[0-9]{6,15}$/, message: '手機號碼格式錯誤', trigger: 'blur' }
	// 	],
	// 	verifyCode: [
	// 		{ required: true, message: '請輸入驗證碼', trigger: 'blur' }
	// 	]
	// },
	// password: {
	// 	password: [
	// 		{ required: true, message: '請輸入新密碼', trigger: 'blur' },
	// 		{ min: 6, message: '密碼至少6位', trigger: 'blur' }
	// 	],
	// 	confirmPassword: [
	// 		{ required: true, message: '請再次輸入新密碼', trigger: 'blur' },
	// 		{
	// 			validator: (rule, value, callback) => {
	// 				if (value !== formData.value.password) {
	// 					callback(new Error('兩次密碼不一致'))
	// 				} else {
	// 					callback()
	// 				}
	// 			},
	// 			trigger: 'blur'
	// 		}
	// 	]
	// },
	// email: {
	// 	email: [
	// 		{ required: true, message: '請輸入電子信箱', trigger: 'blur' },
	// 		{ pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: '信箱格式錯誤', trigger: 'blur' }
	// 	]
	// }
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
// const submitForm = (submitType) => {
// 	if (submitType === 'switch') {
// 		switchSubmit()
// 	}
// 	else {
// 		formSubmit()
// 	}
// }
// const switchSubmit = () => {
// 	let payload = {}
// 	if (type.value === 'favorite') {
// 		payload = {
// 			publicFavorite: formData.value.publicFavorite,
// 			publicLike: formData.value.publicLike,
// 			publicCategory: formData.value.publicCategory
// 		}
// 		console.log('送出資料:', payload)
// 	}
// 	else if (type.value === 'message') {
// 		payload = {
// 			postNotice: formData.value.postNotice,
// 			message: formData.value.message,
// 			allPause: formData.value.allPause,
// 		}
// 	}
// }
const submitForm = (status, err) => {
	// 成功
	if (status) {
		openNotice({
			title: t('common.success'),
			titleIcon: 'icon-common-confirm',
		})
	}
	// 錯誤
	else {
		openNotice({
			title: t('common.error'),
			content: err,
		})
	}
}
</script>

<style scoped lang="scss">
.set-menu {
	--footer-height: 180rpx;
}

.content {
	padding-top: 50rpx;
	padding-bottom: var(--footer-height);

	@media screen and (min-width: 768px) and (max-width: 960px) {
		padding-top: 24rpx;
	}
}
</style>