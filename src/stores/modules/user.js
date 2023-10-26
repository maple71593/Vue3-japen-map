import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const username = ref('')
    const userpic = ref('')
    const email = ref('')
    const auth = useFirebaseAuth()
    //獲取用戶資訊
    const GetUserData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          token.value = user.getIdToken()
          username.value = user.displayName
          userpic.value = user.photoURL
          email.value = user.email
          console.log(user)
        } else {
          console.log('獲取失敗')
        }
      })
    }
    //更新用戶圖片
    const GetUserPic = (name, URL) => {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: URL
      })
        .then(() => {
          // Profile updated!
          // ...
          console.log('個人資料更新成功')
        })
        .catch(() => {
          console.log('更新用戶名子與照片失敗')
        })
    }

    return {
      GetUserData,
      GetUserPic,
      token,
      username,
      userpic,
      email
    }
  },
  {
    persist: true
  }
)
