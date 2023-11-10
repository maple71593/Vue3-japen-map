<script setup>
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth'
import { useFirebaseAuth, useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
import { useVerStore, useComStore } from '@/stores'
const useCom = useComStore()
const useVer = useVerStore()
const auth = useFirebaseAuth()
const router = useRouter()
// 新建第一次註冊帳號初始資料
const db = useFirestore()
const addFirstData = async () => {
  await setDoc(doc(db, 'UserData', useVer.email), {
    order: [],
    pic: ''
  })
}
//新增姓名
const updateName = () => {
  updateProfile(auth.currentUser, {
    displayName: `${useVer.UserName}`
  })
    .then(() => {})
    .catch(() => {})
}
// 傳送電子郵件認證
const verifyEmail = () => {
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    useCom.MessageBox('驗證電子郵件已發送', 3)
    // ...
  })
}

// 註冊
const useregister = () => {
  // 較驗
  if (!useVer.RegisterInputCheck())
    return useCom.MessageBox('請檢查資料是否有誤', 1)
  // 使用createUserWithEmailAndPassword方法 並將參數傳入
  createUserWithEmailAndPassword(auth, useVer.email, useVer.password)
    .then(() => {
      addFirstData()
      updateName()
      verifyEmail()
      useVer.AllClean()
      router.replace('/Login/EmailCheck')
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        useVer.AllClean()
        useCom.MessageBox('信箱已被註冊。', 1)
      }
      // error.code
      // error.message
    })
}

const ChangePahe = () => {
  useVer.AllClean()
  router.push('/Login/LoginPage')
}
useVer.AllClean()
</script>
<template>
  <div>
    <div class="register">
      <div>
        <h1>註冊會員</h1>
        <input
          v-model="useVer.UserName"
          @blur="useVer.userCheck"
          type="text"
          placeholder="您的姓名"
        />
        <p>{{ useVer.userErrMsg }}</p>
        <input
          v-model="useVer.email"
          @blur="useVer.EmailCheck"
          type="email"
          placeholder="請輸入你的電子郵件"
        />
        <p>{{ useVer.EmailErrMsg }}</p>
        <input
          v-model="useVer.password"
          @blur="useVer.passwordcheck"
          type="password"
          placeholder="請輸入你的密碼"
        />
        <p>{{ useVer.PasswordErrMsg }}</p>
        <input
          v-model="useVer.doublepassword"
          @blur="useVer.doulblepasswordcheck"
          type="password"
          placeholder="請再次輸入你的密碼"
        />
        <p>{{ useVer.doublePasswordErrMsg }}</p>
        <button @click="useregister">註冊</button>
        <button @click="ChangePahe">已有會員</button>
        <button @click="router.push('/')">回首頁</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.register {
  width: 50vw;
  min-width: 385px;
  min-height: 70vh;
  padding: 30px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid rgb(252, 198, 132);
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
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
