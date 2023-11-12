<script setup>
import { ref } from 'vue'
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut
} from 'firebase/auth'
import { useVerStore, useComStore, useUserStore } from '../../stores'
import { useRouter } from 'vue-router'
const useCom = useComStore()
const useVer = useVerStore()
const router = useRouter()
const useStore = useUserStore()
const auth = getAuth()
const user = auth.currentUser
const Num = ref(11)
// 登出
const SignOut = async () => {
  await signOut(auth)
    .then(() => {
      useStore.SignOutClsData()
      router.replace('/home')
      useCom.MessageBox('更新成功，請重新登入', 3)
      setTimeout(() => {
        useCom.isLoading = false
      }, 1000)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
// 錯誤倒數回調
const overCheck = () => {
  const clstime = setInterval(() => {
    if (Num.value <= 1) {
      clearInterval(clstime)
      Num.value = 11
      useVer.REcountNum()
    } else {
      Num.value--
      useVer.countNum()
      console.log(useVer.Num)
    }
  }, 1000)
}
// 進頁面清空帳密欄位相關資料
useVer.AllClean()
//重新驗證用戶資料
const upDataPassword = async () => {
  if (!useVer.ChangePasswordInputCheck()) return
  useCom.isLoading = true
  await reauthenticateWithCredential(
    user,
    EmailAuthProvider.credential(user.email, useVer.oldPassword)
    //EmailAuthProvider 相關文檔
    //https://firebase.google.com/docs/reference/js/auth.emailauthprovider.md?hl=zh-cn#emailauthprovidercredential
  )
    .then(() => {
      // User re-authenticated.
      useVer.NumCheck = true
    })
    .catch((error) => {
      useVer.NumCheck = false
      if (error.code === 'auth/invalid-login-credentials')
        console.log(error.code)
    })
  if (!useVer.NumCheck) {
    useCom.MessageBox('驗證失敗，請稍後再試', 1)
    Num.value = 11
    useVer.REcountNum()
    overCheck()
    setTimeout(() => {
      useCom.isLoading = false
    }, 500)
  } else {
    updatePassword(user, useVer.password)
      .then(() => {
        SignOut()
      })
      .catch((error) => {
        useCom.MessageBox('更新失敗', 1)
        console.log(error.code)
        // ...
      })
  }
}
</script>
<template>
  <div class="changePassword">
    <div>
      <h1>更換密碼</h1>
    </div>
    <div v-if="useStore.EmailVer">
      <div>
        <h2>舊密碼</h2>
        <input
          v-model="useVer.oldPassword"
          type="password"
          placeholder="請輸入舊密碼"
          @blur="useVer.oldpasswordcheck"
        />
        <h3>{{ useVer.oldPasswordErrMsg }}</h3>
      </div>
      <div>
        <h2>新密碼</h2>
        <input
          v-model="useVer.password"
          type="password"
          placeholder="請輸入新密碼"
          @blur="useVer.passwordcheck"
        />
        <h3>{{ useVer.PasswordErrMsg }}</h3>
      </div>
      <div>
        <h2>再次確認密碼</h2>
        <input
          v-model="useVer.doublepassword"
          type="password"
          placeholder="請再次輸入新密碼"
          @blur="useVer.doulblepasswordcheck"
        />
        <h3>{{ useVer.doublePasswordErrMsg }}</h3>
      </div>
      <div style="display: flex">
        <div v-if="useVer.Num === 11">
          <button class="btn2" @click="upDataPassword">送出</button>
        </div>
        <div v-else>
          <button class="btn-disabled" disabled="true">
            {{ useVer.Num }}
          </button>
        </div>
        <div>
          <button class="btn2" @click="useVer.AllClean()">清除</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div>此功能需要驗證電子郵件，請至會員中心驗證</div>
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
.btn-disabled {
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #153143;
  color: #898989;
  border: 2px solid #112f42;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    transform 0.3s;
}
</style>
