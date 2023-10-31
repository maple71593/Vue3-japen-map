<script setup>
import { useVerStore, useUserStore } from '@/stores'
import { ref } from 'vue'
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
const useStore = useUserStore()
const useVer = useVerStore()
const auth = getAuth()
const user = auth.currentUser
const check = ref()
const Num = ref(10)

const overCheck = () => {
  if (useStore.Hum !== 300) return
  const clstime = setInterval(() => {
    if (useStore.Hum < 0) {
      clearInterval(clstime)
    }
    Num.value = Num.value - 1
    useStore.countNum(Num.value)
  }, 1000)
}

// 進頁面清空帳密欄位相關資料
useVer.AllClean()
//重新驗證用戶資料
const EmailProvider = () => {
  reauthenticateWithCredential(
    user,
    EmailAuthProvider.credential(user.email, useVer.oldPassword)
    //EmailAuthProvider 相關文檔
    //https://firebase.google.com/docs/reference/js/auth.emailauthprovider.md?hl=zh-cn#emailauthprovidercredential
  )
    .then(() => {
      check.value = true
      // User re-authenticated.
      console.log('驗證成功')
    })
    .catch((error) => {
      check.value = false
      if (error.code === 'auth/invalid-login-credentials')
        console.log('身分驗證失敗')
      console.log(error.code)
    })
}
const upDataPassword = () => {
  if (!useVer.ChangePasswordInputCheck()) return
  EmailProvider()
  if (!check.value) return overCheck(), alert('驗證失敗，請稍後再試')
  updatePassword(user, useVer.password)
    .then(() => {
      alert('更新成功，請重新登入')
    })
    .catch((error) => {
      alert('更新失敗')
      console.log(error.code)
      // ...
    })
}
</script>
<template>
  <div class="changePassword">
    <div>
      <h1>更換密碼</h1>
    </div>
    <div>
      <div>
        <h2>舊密碼</h2>
        <input
          v-model="useVer.oldPassword"
          type="text"
          placeholder="請輸入舊密碼"
          @blur="useVer.oldpasswordcheck"
        />
        <h3>{{ useVer.oldPasswordErrMsg }}</h3>
      </div>
      <div>
        <h2>新密碼</h2>
        <input
          v-model="useVer.password"
          type="text"
          placeholder="請輸入新密碼"
          @blur="useVer.passwordcheck"
        />
        <h3>{{ useVer.PasswordErrMsg }}</h3>
      </div>
      <div>
        <h2>再次確認密碼</h2>
        <input
          v-model="useVer.doublepassword"
          type="text"
          placeholder="請再次輸入新密碼"
          @blur="useVer.doulblepasswordcheck"
        />
        <h3>{{ useVer.doublePasswordErrMsg }}</h3>
      </div>
    </div>
    <div v-if="check">
      <button class="btn2" @click="upDataPassword">送出</button>
    </div>
    <div v-else>
      <button class="btn2" disabled="true">
        {{ useStore.Hum }}
      </button>
    </div>
    <div>
      <button class="btn2" @click="useVer.AllClean()">清除</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.changePassword {
  input {
    display: block;
    width: 300px;
    height: 20px;
    padding: 10px;
    border-radius: 10px;
    border: 0px;
    margin: 0;
    font-size: 20px;
  }
  h2 {
    margin: 5px;
  }
  h1 {
    color: rgb(0, 50, 50);
  }
  h3 {
    color: red;
  }
  button {
    margin: 10px;
  }
  > div:nth-child(1) {
    background-color: aliceblue;
    padding: 10px;
    border-radius: 0px 10px 0px 0px;
  }
  > div:nth-child(n + 2) {
    padding: 10px;
    border-radius: 0px 10px 0px 0px;
  }
}
</style>
