<script setup>
import { ref } from 'vue'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { useFirebaseStorage, useFirebaseAuth, useFirestore } from 'vuefire'
import { updateProfile } from 'firebase/auth'
import { useUserStore, useComStore } from '../../stores'
const useCom = useComStore()
const userStore = useUserStore()
const showLoading = ref(false)
// 上傳圖片到網站
const filedata = ref()
const imgUrl = ref()
const upload = (event) => {
  if (imgUrl.value) {
    imgUrl.value = ''
  }
  const file = event.target.files[0]
  filedata.value = file
  const reader = new FileReader(file)
  reader.readAsDataURL(file)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}

// Storage相關
// 拿到storage
const storage = useFirebaseStorage()
// 輸入上傳大頭貼或檔案的參數 storageRef(storage, 路徑參數名稱)
const mountainFileRef = storageRef(storage, `userPic/${userStore.email}`)
// 獲取上傳大頭貼 與獲得網址
const UpLoadData = () => {
  if (!filedata.value) return useCom.MessageBox('沒有存取到圖片', 2)
  showLoading.value = true
  uploadBytes(mountainFileRef, filedata.value).then(() => {
    getPicUrl()
    useCom.MessageBox('上傳成功', 3)
    imgUrl.value = ''
  })
  setTimeout(() => {
    showLoading.value = false
  }, 1500)
}
// 獲取圖片網址
const getPicUrl = () => {
  getDownloadURL(mountainFileRef)
    .then((url) => {
      //更新用戶資料
      updatePic(url)
      //更新資料庫資料
      upDataPic(url)
    })
    .catch((error) => {
      console.error('錯誤', error)
    })
}
// 更新用戶資訊
const auth = useFirebaseAuth()
const updatePic = (URL) => {
  updateProfile(auth.currentUser, {
    photoURL: URL
  })
    .then(() => {
      getUserData()
    })
    .catch(() => {})
}
// 獲取用戶個人資料
const getUserData = () => {
  if (auth.currentUser !== null) {
    userStore.upData(auth.currentUser)
  }
}
//更新資料庫資料
const db = useFirestore()
const washingtonRef = doc(db, 'UserData', userStore.email)
const upDataPic = async (url) => {
  await updateDoc(washingtonRef, {
    pic: `${url}`
  })
}
console.log(auth.currentUser)
const Pic = () => {
  if (userStore.userpic || imgUrl.value) {
    return imgUrl.value ? imgUrl.value : userStore.userpic
  } else {
    return userStore.noUserpic
  }
}
</script>
<template>
  <div class="change-pic">
    <div>
      <h1>更換大頭貼</h1>
    </div>
    <div>
      <!-- <img
        v-if="userStore.userpic || imgUrl"
        :src="imgUrl ? imgUrl : userStore.userpic"
        alt=""
      />
      <img v-else :src="userStore.noUserpic" alt="" /> -->
      <img v-if="!showLoading" :src="Pic()" alt="" />
      <img v-else :src="userStore.LoadingPic" alt="" />
    </div>
    <input
      id="upload"
      type="file"
      accept="image/png, image/jpeg"
      @change="upload"
    />
    <label type="button" for="upload" class="btn2"> 選擇檔案 </label>
    <button @click="UpLoadData" class="btn2">上傳</button>
  </div>
</template>
<style lang="scss" scoped>
.change-pic {
  margin: 0;
  > div:nth-child(1) {
    background-color: aliceblue;
    padding: 10px;
    border-radius: 0px 10px 0px 0px;
    h1 {
      color: rgb(0, 50, 50);
    }
  }
  > div:nth-child(2) {
    margin: 10px;
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
  input[type='file'] {
    display: none;
  }
  label {
    margin: 10px;
  }
}
</style>
