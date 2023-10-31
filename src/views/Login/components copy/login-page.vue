<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const auth = useFirebaseAuth()
const email = ref('')
const password = ref('')
const userErrMsg = ref()
const PasswordErrMsg = ref()
const emailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const EmailCheck = () => {
  if (email.value === '') {
    userErrMsg.value = '請輸入帳號/電子郵件'
  } else if (!emailRE.test(email.value)) {
    userErrMsg.value = '請輸入正確的電子郵件格式'
  } else {
    userErrMsg.value = ''
    return true
  }
}
//密碼較驗
const passwordcheck = () => {
  if (password.value === '') {
    PasswordErrMsg.value = '請輸入密碼'
  } else {
    PasswordErrMsg.value = ''
    return true
  }
}
const InputCheck = () => {
  if (EmailCheck() && passwordcheck()) {
    return true
  } else {
    return false
  }
}
// 登入
const router = useRouter()
const userstore = useUserStore()
const useLogin = () => {
  if (email.value === '' || password.value === '')
    return alert('請輸入帳號或密碼')
  if (!InputCheck()) return alert('請依照提示輸入，請用戶再次確認')
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {
      alert('登入成功')
      userstore.upData(user.user)
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)
      if (error.code === 'auth/invalid-login-credentials')
        return (
          (email.value = ''), (password.value = ''), alert('輸入帳號/密碼錯誤')
        )
    })
}
</script>
<template>
  <div>
    <div class="login">
      <div>
        <h1>歡迎回來</h1>
        <input
          v-model="email"
          type="email"
          src=""
          alt=""
          placeholder="請輸入你的電子郵件"
          @blur="EmailCheck"
        />
        <p>{{ userErrMsg }}</p>
        <input
          v-model="password"
          type="password"
          placeholder="請輸入你的密碼"
          @blur="passwordcheck"
        />
        <p>{{ PasswordErrMsg }}</p>
        <button @click="useLogin">登入</button>
        <button @click="router.push('/Login/register')">註冊</button>
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
      height: 30px;
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
      height: 30px;
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
