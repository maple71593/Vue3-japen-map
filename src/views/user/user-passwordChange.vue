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
const db = useFirestore()
const setData = async (url) => {
  await setDoc(doc(db, useStore.email, 'data'), {
    name: 'NewName.value',
    pic: 'url',
    phoneNum: 'Newphone.value'
  })
}
setData()
// Storage相關
const storage = useFirebaseStorage()
const mountainFileRef = storageRef(storage, useStore.email)
// 獲取圖片網址
const getPicUrl = () => {
  getDownloadURL(mountainFileRef)
    .then((url) => {
      useStore.GetUserPic(NewName.value, url)
      // setData()
    })
    .catch((error) => {
      console.error('錯誤', error)
    })
}
// 上傳圖片
const upload = (event) => {
  const file = event.target.files[0]
  uploadBytes(mountainFileRef, file).then(() => {
    getPicUrl()
    console.log('上傳成功')
  })
}
</script>
<template>
  <div>
    <input type="text" v-model="NewName" placeholder="請輸入暱稱" />
    <input type="text" v-model="Newphone" placeholder="請輸入電話" />

    <input type="file" accept="image/png, image/jpeg" @change="upload" />
    <div id="msg"></div>
  </div>
</template>

<style scoped></style>
