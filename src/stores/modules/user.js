import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged } from 'firebase/auth'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const username = ref('')
    const userpic = ref('')
    const email = ref('')
    const auth = useFirebaseAuth()
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

    return {
      GetUserData,
      token,
      username,
      userpic
    }
  },
  {
    persist: true
  }
)
