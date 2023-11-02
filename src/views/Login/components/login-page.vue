<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router'
import { useUserStore, useVerStore, useComStore } from '@/stores'
const useCom = useComStore()
const useVer = useVerStore()
const auth = useFirebaseAuth()
// 登入
const router = useRouter()
const userstore = useUserStore()
const useLogin = () => {
  if (useVer.email === '' || useVer.password === '')
    return useCom.MessageBox('請輸入帳號或密碼', 1)
  if (!useVer.SingInInputCheck())
    return useCom.MessageBox('請依照提示輸入，請用戶再次確認', 1)
  signInWithEmailAndPassword(auth, useVer.email, useVer.password)
    .then((user) => {
      useCom.MessageBox('登入成功', 3)
      userstore.upData(user.user)
      useVer.AllClean()
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)
      if (error.code === 'auth/invalid-login-credentials')
        return useVer.AllClean(), useCom.MessageBox('輸入帳號/密碼錯誤', 1)
      if (error.code === 'auth/invalid-email')
        return useCom.MessageBox('電子郵件格式錯誤', 1)
    })
}
useVer.AllClean()
const ChangePahe = () => {
  useVer.AllClean()
  router.push('/Login/register')
}
</script>
<template>
  <div>
    <div class="login">
      <div>
        <h1>歡迎回來</h1>
        <input
          v-model="useVer.email"
          type="email"
          src=""
          alt=""
          placeholder="請輸入你的電子郵件"
          @blur="useVer.EmailCheck"
        />
        <p>{{ useVer.EmailErrMsg }}</p>
        <input
          v-model="useVer.password"
          type="password"
          placeholder="請輸入你的密碼"
          @blur="useVer.passwordcheck"
        />
        <p>{{ useVer.PasswordErrMsg }}</p>
        <button @click="useLogin">登入</button>
        <button @click="ChangePahe">註冊</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  width: 50vw;
  height: 70vh;
  min-width: 385px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid rgb(250, 117, 60);
  border-radius: 10px;
  text-align: center;
  > div {
    input {
      padding: 5px 10px;
      width: 320px;
      height: 40px;
      margin: 15px;
      border-radius: 10px;
      border: 1px solid wheat;
      display: block;
      box-sizing: border-box;
    }
    button {
      box-sizing: border-box;
      display: block;
      width: 320px;
      height: 40px;
      margin: 15px;
      border-radius: 10px;
      border: 1px solid wheat;
      background-color: #003ec5df;
      font-size: 15px;
      color: rgb(253, 253, 253);
    }

    p {
      color: red;
      font-size: 13px;
      text-align: start;
      margin: 0px 0px 0px 20px;
    }
  }
}
</style>
