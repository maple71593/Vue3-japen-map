<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import { useUserStore } from '../../stores'
import { ref } from 'vue'
import { updateProfile } from 'firebase/auth'
import { useFirestore, useFirebaseAuth } from 'vuefire'
const useStore = useUserStore()
const { email, upNewuserData, username, phoneNum } = useStore
const NewName = ref('')
const Newphone = ref('')
const nameErrMsg = ref('')
const phoneErrMsg = ref('')
const nameRegex = /^[A-Za-z\u4e00-\u9fa5]+$/
const phoneRegex = /^(09)[0-9]{8}$/
const nameCheck = () => {
  if (NewName.value === '') {
    nameErrMsg.value = '請輸入名稱'
  } else if (!nameRegex.test(NewName.value)) {
    nameErrMsg.value = '請勿輸入特殊符號'
  } else {
    nameErrMsg.value = ''
    return true
  }
}
const phoneCheck = () => {
  if (Newphone.value === '') {
    phoneErrMsg.value = '請輸入手機號碼'
  } else if (!phoneRegex.test(Newphone.value)) {
    phoneErrMsg.value = '請輸入正確的手機號碼格式'
  } else {
    phoneErrMsg.value = ''
    return true
  }
}
const twoCheck = () => {
  if (phoneCheck() && nameCheck()) {
    return true
  } else {
    return false
  }
}
// Firestore相關
// 將取得的資料更新上Firestore資料庫
const db = useFirestore()
// 需傳遞三個參數 (更新值Picurl , newname ,newphone)
const UpLoadData = async () => {
  if (!NewName.value && !Newphone.value) return alert('不得為空')
  if (!twoCheck()) return alert('有誤')
  await updateDoc(doc(db, 'UserData', email), {
    name: `${NewName.value}`,
    phoneNum: `${Newphone.value}`
  })
  updatePic()
  upNewuserData(NewName.value, Newphone.value)
  alert('更新成功')
}
// 更新用戶資訊
const auth = useFirebaseAuth()
const updatePic = () => {
  updateProfile(auth.currentUser, {
    displayName: `${NewName.value}`,
    phoneNumber: `${Newphone.value}`
  })
    .then(() => {
      console.log(Newphone.value)
      console.log('名子與手機更新成功')
    })
    .catch(() => {
      console.log('名子與手機更新失敗')
    })
}

const SetInputValue = () => {
  NewName.value = username
  Newphone.value = phoneNum
}
SetInputValue()
</script>
<template>
  <div class="userDataChange">
    <div>
      <p>電子信箱:</p>
      <input type="text" v-model="useStore.email" name="" id="" disabled />
    </div>
    <div>
      <p>用戶姓名:</p>
      <input
        type="text"
        v-model="NewName"
        placeholder="請輸入名稱"
        @blur="nameCheck"
      />
      <h6>{{ nameErrMsg }}</h6>
    </div>
    <div>
      <p>用戶手機:</p>
      <input
        type="text"
        v-model="Newphone"
        placeholder="功能無法完全儲存，請用戶注意"
        maxlength="10"
        @blur="phoneCheck"
      />
      <h6>{{ phoneErrMsg }}</h6>
    </div>
    <div><button @click="UpLoadData" class="btn">確認</button></div>
  </div>
</template>

<style lang="scss" scoped>
.userDataChange {
  margin: 20px;
  > div {
    position: relative;
    margin: 20px;
    p {
      display: inline;
      font-size: 20px;
      margin: 10px;
    }
    input {
      width: 200px;
      height: 20px;
      margin: 0;
    }
    h6 {
      color: red;
      bottom: -15px;
      left: 105px;
      position: absolute;
    }
  }
}
</style>
