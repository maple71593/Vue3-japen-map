<script setup>
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth'
import { useFirebaseAuth, useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
const auth = useFirebaseAuth()
const UserName = ref('')
const email = ref('')
const password = ref('')
const doublepassword = ref('')
const EmailErrMsg = ref('')
const userErrMsg = ref()
const PasswordErrMsg = ref()
const doublePasswordErrMsg = ref()
const router = useRouter()
// 較驗
// 正則表達
const emailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRE = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,12}$/
//姓名較驗
const userCheck = () => {
  if (UserName.value === '') {
    userErrMsg.value = '請輸入姓名'
  } else {
    userErrMsg.value = ''
    return true
  }
}
//帳號較驗
const EmailCheck = () => {
  if (email.value === '') {
    EmailErrMsg.value = '請輸入帳號/電子郵件'
  } else if (!emailRE.test(email.value)) {
    EmailErrMsg.value = '請輸入正確的電子郵件格式'
  } else {
    EmailErrMsg.value = ''
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
// 檢驗帳密四方是否為ture
const InputCheck = () => {
  if (
    EmailCheck() &&
    passwordcheck() &&
    doulblepasswordcheck() &&
    userCheck()
  ) {
    return true
  } else {
    return false
  }
}

// 新建第一次註冊帳號初始資料
const db = useFirestore()
const addFirstData = async () => {
  await setDoc(doc(db, 'UserData', email.value), {
    name: '',
    phoneNum: '',
    pic: ''
  })
}
//新增姓名
const updateName = () => {
  updateProfile(auth.currentUser, {
    displayName: `${UserName.value}`
  })
    .then(() => {})
    .catch(() => {})
}
// 傳送電子郵件認證
const verifyEmail = () => {
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    alert('驗證電子郵件已發送')
    // ...
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
      updateName()
      verifyEmail()
      router.replace('/Login/EmailCheck')
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        userErrMsg.value = ''
        EmailErrMsg.value = ''
        PasswordErrMsg.value = ''
        doublepassword.value = ''
        alert('信箱已被註冊。')
      }
      // error.code
      // error.message
    })
}
</script>
<template>
  <div>
    <div class="register">
      <div>
        <h1>註冊會員</h1>
        <input
          v-model="UserName"
          @blur="userCheck"
          type="text"
          placeholder="您的姓名"
        />
        <p>{{ userErrMsg }}</p>
        <input
          v-model="email"
          @blur="EmailCheck"
          type="email"
          placeholder="請輸入你的電子郵件"
        />
        <p>{{ EmailErrMsg }}</p>
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
        <button @click="router.push('/Login/LoginPage')">已有會員</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.register {
  width: 50vw;
  min-width: 385px;
  height: 70vh;
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
