import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref()
    const username = ref()
    const userpic = ref()
    const email = ref()
    const phoneNum = ref()
    const noUserpic = ref(
      'https://firebasestorage.googleapis.com/v0/b/fir-test-a43df.appspot.com/o/admin%2FnoUser.png?alt=media&token=66ee6109-50df-4c82-8c4c-9f65705b9c52"'
    )
    // 更新用戶名稱與手機號碼
    const upNewuserData = (newName, newphone) => {
      username.value = newName
      phoneNum.value = newphone
    }
    //更新用戶圖片網址
    const upPicData = (newPicUrl) => {
      userpic.value = newPicUrl
    }
    return {
      upPicData,
      upNewuserData,
      token,
      username,
      userpic,
      email,
      noUserpic,
      phoneNum
    }
  },
  {
    persist: true
  }
)
