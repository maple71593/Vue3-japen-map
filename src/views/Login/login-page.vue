<script setup>
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useFirebaseAuth, getCurrentUser, useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { doc, setDoc } from 'firebase/firestore'
const show = ref(false)
const auth = useFirebaseAuth()
const email = ref('')
const password = ref('')
const doublepassword = ref('')
const userErrMsg = ref()
const PasswordErrMsg = ref()
const doublePasswordErrMsg = ref()
const getuser = getCurrentUser()
console.log(getuser)

// 解決更換註冊與登入頁面input還殘留的問題
const ChangeShow = () => {
  show.value = !show.value
  email.value = ''
  password.value = ''
  userErrMsg.value = ''
  PasswordErrMsg.value = ''
  doublepassword.value = ''
}
// 較驗
// 正則表達
const emailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRE = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,12}$/
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
//第二次密碼較驗
const doulblepasswordcheck = () => {
  if (doublepassword.value === '') {
    doublePasswordErrMsg.value = '請再次輸入密碼'
  } else if (doublepassword.value !== password.value) {
    doublePasswordErrMsg.value = '密碼不相同'
  } else {
    doublePasswordErrMsg.value = ''
    return true
  }
}
// 檢驗帳密三方是否為ture
const InputCheck = () => {
  if (userCheck() && passwordcheck() && doulblepasswordcheck()) {
    return true
  } else {
    return false
  }
}

// 新建第一次註冊帳號初始資料
const db = useFirestore()
// const washingtonRef = doc(db, 'UserData', email)
const addFirstData = async () => {
  await setDoc(doc(db, 'UserData', email.value), {
    name: '',
    phoneNum: '',
    pic: ''
  })
}

// 註冊
const useregister = () => {
  // 較驗
  if (!InputCheck()) return alert('請檢查資料是否有誤')
  // 使用createUserWithEmailAndPassword方法 並將參數傳入
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      addFirstData()
      ChangeShow()
      alert('註冊成功')
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        userErrMsg.value = ''
        PasswordErrMsg.value = ''
        doublepassword.value = ''
        alert('信箱已被註冊。')
      }
      // error.code
      // error.message
    })
}
// 登入
const router = useRouter()
const userstore = useUserStore()
const useLogin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {
      alert('登入成功')
      userstore.upData(user.user)
      router.push('/')
    })
    .catch((error) => {
      console.log(error)
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
        <input
          v-model="doublepassword"
          @blur="doulblepasswordcheck"
          type="password"
          placeholder="請再次輸入你的密碼"
        />
        <p>{{ doublePasswordErrMsg }}</p>
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
