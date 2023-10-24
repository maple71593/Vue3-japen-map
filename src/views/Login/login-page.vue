<script setup>
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router'
const show = ref(false)
const auth = useFirebaseAuth()
const email = ref('')
const password = ref('')
const errorCode = ref()
const errorMessage = ref()
const userErrMsg = ref()
const PasswordErrMsg = ref()
// 獲取用戶資訊
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    console.log(uid)
    console.log(user)
  } else {
    // User is signed out
  }
})

// 解決更換註冊與登入頁面input還殘留的問題
const ChangeShow = () => {
  show.value = !show.value
  email.value = ''
  password.value = ''
  userErrMsg.value = ''
  PasswordErrMsg.value = ''
}
// 較驗
// 正則表達
const emailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRE = /^[a-zA-Z0-9]{6,12}$/
//帳號較驗
const userCheck = () => {
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
  } else if (!passwordRE.test(password.value)) {
    PasswordErrMsg.value = '請輸入6-12位字母與數字'
  } else {
    PasswordErrMsg.value = ''
    return true
  }
}
// 檢驗帳密雙方是否為ture
const InputCheck = () => {
  if (userCheck() && passwordcheck()) {
    return true
  } else {
    return false
  }
}
// 註冊
const useregister = () => {
  // 較驗
  if (!InputCheck()) return
  // 使用createUserWithEmailAndPassword方法 並將參數傳入
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      alert('註冊成功')
      show.value = !show.value
      userErrMsg.value = ''
      PasswordErrMsg.value = ''
    })
    .catch((error) => {
      errorCode.value = error.code
      errorMessage.value = error.message
      console.log(errorCode.value, errorMessage.value)
      // ..
    })
}
// 登入
const router = useRouter()
const useLogin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      alert('登入成功')
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)
      console.log(error.message)
    })
}
</script>
<template>
  <div class="Login-page">
    <div class="register" v-if="show">
      <div>
        <h1>加入我們</h1>
        <input
          v-model="email"
          @blur="userCheck"
          type="email"
          placeholder="請輸入你的電子郵件"
        />
        <p>{{ userErrMsg }}</p>
        <input
          v-model="password"
          @blur="passwordcheck"
          type="password"
          placeholder="請輸入你的密碼"
        />
        <p>{{ PasswordErrMsg }}</p>
        <button @click="useregister">註冊</button>
        <button @click="ChangeShow">已有會員</button>
      </div>
    </div>
    <div class="login" v-else>
      <div>
        <h1>歡迎回來</h1>
        <input
          v-model="email"
          type="email"
          src=""
          alt=""
          placeholder="請輸入你的電子郵件"
        />
        <p>{{ userErrMsg }}</p>
        <input
          v-model="password"
          type="password"
          placeholder="請輸入你的密碼"
        />
        <p>{{ PasswordErrMsg }}</p>
        <button @click="useLogin">登入</button>
        <button @click="ChangeShow">註冊</button>
        <!-- <ErrorBox v-if="error" :error="error" /> -->
        <button @click="signinRedirect()">SignIn with Google</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Login-page {
  @extend %container-100;
}
.register {
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid bisque;
  border-radius: 10px;
  text-align: center;
  > div {
    input {
      width: 300px;
      height: 30px;
      margin: 10px;
      border-radius: 10px;
      display: block;
    }
    button {
      display: block;
      width: 300px;
      height: 30px;
      margin: 10px;
      border-radius: 10px;
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
.login {
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid bisque;
  border-radius: 10px;
  text-align: center;
  > div {
    input {
      width: 300px;
      height: 30px;
      border-radius: 10px;
      display: block;
      margin: 10px;
    }
    button {
      display: block;
      width: 300px;
      height: 30px;
      margin: 10px;
      border-radius: 10px;
      background-color: #a0b5e3df;
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
