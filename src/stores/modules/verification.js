import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVerStore = defineStore('calibration', () => {
  const Hum = ref(10)
  const oldPassword = ref('')
  const oldPasswordErrMsg = ref('')
  const email = ref('')
  const UserName = ref('')
  const password = ref('')
  const doublepassword = ref('')
  const EmailErrMsg = ref('')
  const userErrMsg = ref('')
  const PasswordErrMsg = ref('')
  const doublePasswordErrMsg = ref('')
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
    if (password.value && !doublepassword.value) {
      doublePasswordErrMsg.value = '請再次輸入密碼'
    } else if (doublepassword.value === '') {
      doublePasswordErrMsg.value = '請輸入密碼'
    } else if (doublepassword.value !== password.value) {
      doublePasswordErrMsg.value = '密碼不相同'
    } else {
      doublePasswordErrMsg.value = ''
      return true
    }
  }
  //舊密碼較驗
  const oldpasswordcheck = () => {
    if (oldPassword.value === '') {
      oldPasswordErrMsg.value = '請輸入原密碼'
    } else if (!passwordRE.test(oldPassword.value)) {
      oldPasswordErrMsg.value = '請輸入6-12位字母與數字'
    } else {
      oldPasswordErrMsg.value = ''
      return true
    }
  }

  //登入用雙重較驗
  const SingInInputCheck = () => {
    if (EmailCheck() && passwordcheck()) {
      return true
    } else {
      return false
    }
  }
  // 註冊用四方較驗
  const RegisterInputCheck = () => {
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
  //修改密碼用三方較驗
  const ChangePasswordInputCheck = () => {
    if (oldpasswordcheck() && passwordcheck() && doulblepasswordcheck()) {
      return true
    } else {
      return false
    }
  }
  // 清除所有資料
  const AllClean = () => {
    email.value = ''
    UserName.value = ''
    password.value = ''
    doublepassword.value = ''
    EmailErrMsg.value = ''
    userErrMsg.value = ''
    PasswordErrMsg.value = ''
    doublePasswordErrMsg.value = ''
    oldPassword.value = ''
    oldPasswordErrMsg.value = ''
    Hum.value = ''
  }
  const countNum = (newdata) => {
    Hum.value = newdata
  }
  return {
    AllClean,
    oldpasswordcheck,
    userCheck,
    doulblepasswordcheck,
    RegisterInputCheck,
    ChangePasswordInputCheck,
    SingInInputCheck,
    passwordcheck,
    EmailCheck,
    passwordRE,
    emailRE,
    UserName,
    email,
    password,
    EmailErrMsg,
    PasswordErrMsg,
    userErrMsg,
    doublePasswordErrMsg,
    doublepassword,
    oldPassword,
    oldPasswordErrMsg,
    Hum,
    countNum
  }
})
