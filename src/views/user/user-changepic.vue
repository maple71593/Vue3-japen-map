<script setup>
import { ref } from 'vue'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { useFirebaseStorage, useFirebaseAuth } from 'vuefire'
import { updateProfile } from 'firebase/auth'
import { useUserStore } from '../../stores'
const userStore = useUserStore()
const { email, upPicData, userpic } = userStore

// 上傳圖片到網站
const filedata = ref()
const upload = (event) => {
  const file = event.target.files[0]
  filedata.value = file
}
// Storage相關
// 拿到storage
const storage = useFirebaseStorage()
// 輸入上傳大頭貼或檔案的參數 storageRef(storage, 參數名稱)
const mountainFileRef = storageRef(storage, email)
// 獲取上傳大頭貼 與獲得網址
const UpLoadData = () => {
  uploadBytes(mountainFileRef, filedata.value).then(() => {
    getPicUrl()
    console.log('獲取圖片網址成功')
    console.log('上傳大頭貼成功')
  })
}
// 獲取圖片網址
const getPicUrl = () => {
  getDownloadURL(mountainFileRef)
    .then((url) => {
      upPicData(url)
      console.log('獲取圖片網址成功')
      GetUserPic(url)
    })
    .catch((error) => {
      console.error('錯誤', error)
    })
}
// 更新用戶資訊
const auth = useFirebaseAuth()
const GetUserPic = (URL) => {
  updateProfile(auth.currentUser, {
    photoURL: URL
  })
    .then(() => {
      console.log('個人資料更新成功')
    })
    .catch(() => {
      console.log('更新用戶名子與照片失敗')
    })
}
</script>
<template>
  <div class="change-pic">
    <div>
      <img :src="userpic || filedata" alt="" />
    </div>
    <input type="file" accept="image/png, image/jpeg" @change="upload" />
    <button @click="UpLoadData">上傳</button>
  </div>
</template>
<style lang="scss" scoped>
.change-pic {
  margin: 0;
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
