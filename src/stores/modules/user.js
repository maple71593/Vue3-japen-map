import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const Hum = ref()
    const token = ref()
    const username = ref()
    const userpic = ref()
    const email = ref()
    const phoneNum = ref()
    const EmailVer = ref()
    const noUserpic = ref(
      'https://firebasestorage.googleapis.com/v0/b/fir-test-a43df.appspot.com/o/admin%2FnoUser.png?alt=media&token=4f016775-1422-40bf-b548-bf6c749e65c9'
    )
    // 更新用戶名稱與手機號碼
    const upNewuserData = (newName, newphone) => {
      username.value = newName
      phoneNum.value = newphone
    }
    //更新用戶資訊
    const upData = (user) => {
      token.value = user.accessToken
      username.value = user.displayName
      email.value = user.email
      phoneNum.value = user.phoneNumber
      userpic.value = user.photoURL
      EmailVer.value = user.emailVerified
    }
    // 登出清除資料
    const SignOutClsData = () => {
      token.value = ''
      username.value = ''
      userpic.value = ''
      email.value = ''
      phoneNum.value = ''
    }
    const countNum = (newdata) => {
      Hum.value = newdata
    }

    return {
      SignOutClsData,
      upData,
      upNewuserData,
      token,
      username,
      userpic,
      email,
      noUserpic,
      phoneNum,
      EmailVer,
      Hum,
      countNum
    }
  },
  {
    persist: true
  }
)
