<script setup>
import { useUserStore } from '../../stores'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { useFirebaseStorage, useFirestore } from 'vuefire'
import { doc, setDoc } from 'firebase/firestore'
import { ref } from 'vue'
const useStore = useUserStore()
const NewName = ref('')
const Newphone = ref('')
// Firestore相關
// 將取得的資料更新上Firestore資料庫
const db = useFirestore()
const setData = async (url) => {
  await setDoc(doc(db, 'UserData', useStore.email), {
    name: `${NewName.value}`,
    pic: `${url}`,
    phoneNum: `${Newphone.value}`
  })
}
// Storage相關
// 拿到storage
const storage = useFirebaseStorage()
// 輸入上傳參數 storageRef(storage, 參數名稱)
const mountainFileRef = storageRef(storage, useStore.email)
// 獲取圖片網址
const urlPic = ref()
const getPicUrl = () => {
  getDownloadURL(mountainFileRef)
    .then((url) => {
      useStore.GetUserPic(NewName.value, url)
      urlPic.value = url
      console.log('獲取圖片成功')
      setData(url)
    })
    .catch((error) => {
      console.error('錯誤', error)
    })
}
// 上傳圖片
const filedata = ref()
const upload = (event) => {
  const file = event.target.files[0]
  filedata.value = file
}
const UpLoadData = () => {
  uploadBytes(mountainFileRef, filedata.value).then(() => {
    getPicUrl()
    console.log('獲取圖片網址成功')
    console.log('上傳成功')
  })
}
console.log(urlPic.value)
</script>
<template>
  <div class="userDataChange">
    <input type="text" v-model="NewName" placeholder="請輸入暱稱" />
    <input type="text" v-model="Newphone" placeholder="請輸入電話" />
    <img :src="urlPic" alt="" />
    <input type="file" accept="image/png, image/jpeg" @change="upload" />
    <button @click="UpLoadData">上傳</button>
    <div id="msg"></div>
  </div>
</template>

<style lang="scss" scoped>
.userDataChange {
  img {
    width: 10vw;
    height: 10vw;
  }
}
</style>
