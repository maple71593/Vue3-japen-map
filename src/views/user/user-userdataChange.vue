<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import {} from '../../stores'
import { ref } from 'vue'
import { updateProfile } from 'firebase/auth'
import { useFirestore, useFirebaseAuth } from 'vuefire'
import { useComStore, useUserStore } from '../../stores'
const useCom = useComStore()
const useStore = useUserStore()
const { email, upNewuserData, username } = useStore
const NewName = ref('')
const nameErrMsg = ref('')
const nameRegex = /^[A-Za-z\u4e00-\u9fa5]+$/
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
// Firestore相關
// 將取得的資料更新上Firestore資料庫
const db = useFirestore()
// 需傳遞三個參數 (更新值Picurl , newname ,newphone)
const UpLoadData = async () => {
  if (!NewName.value) return useCom.MessageBox('不得為空', 1)
  await updateDoc(doc(db, 'UserData', email), {
    name: `${NewName.value}`
  })
  updatePic()
  upNewuserData(NewName.value)
  useCom.MessageBox('更新成功', 3)
}
// 更新用戶資訊
const auth = useFirebaseAuth()
const updatePic = () => {
  updateProfile(auth.currentUser, {
    displayName: `${NewName.value}`
  })
    .then(() => {})
    .catch((err) => {
      console.log(err.code)
    })
}

const SetInputValue = () => {
  NewName.value = username
}
SetInputValue()
</script>
<template>
  <div class="userDataChange">
    <div><h1>個人資訊</h1></div>
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
    <div><button @click="UpLoadData" class="btn2">確認</button></div>
  </div>
</template>

<style lang="scss" scoped>
.userDataChange {
  > div:nth-child(1) {
    background-color: aliceblue;
    padding: 10px;
    border-radius: 0px 10px 0px 0px;
  }
  h1 {
    color: rgb(0, 50, 50);
  }
  > div:nth-child(n + 2) {
    margin: 20px;
    position: relative;
    p {
      display: inline;
      font-size: 20px;
      margin: 10px;
    }
    input {
      width: 300px;
      height: 20px;
      padding: 10px;
      border-radius: 10px;
      border: 0px;
      margin: 0;
      font-size: 20px;
    }
    h6 {
      color: red;
      bottom: -20px;
      left: 105px;
      font-size: 15px;
      position: absolute;
    }
  }
}
</style>
