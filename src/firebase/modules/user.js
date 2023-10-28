import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { useFirebaseStorage, useFirestore, useFirebaseAuth } from 'vuefire'
import { doc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
const auth = useFirebaseAuth()
// Firestore相關
// 將取得的資料更新上Firestore資料庫
const db = useFirestore()
// 需傳遞三個參數 (更新值Picurl , newname ,newphone)
export const setData = async (Picurl, NewName, Newphone) => {
  await setDoc(doc(db, 'UserData', email), {
    pic: `${Picurl}`,
    name: `${NewName}`,
    phoneNum: `${Newphone}`
  })
}

//獲取用戶資訊
export const GetUserData = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      updata(user)
    } else {
      console.log('獲取失敗')
    }
  })
}
//更新用戶圖片
export const GetUserPic = (name, URL) => {
  updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: URL
  })
    .then(() => {
      // Profile updated!
      // ...
      console.log('個人資料更新成功')
    })
    .catch(() => {
      console.log('更新用戶名子與照片失敗')
    })
}

// Storage相關
// 拿到storage
const storage = useFirebaseStorage()
// 輸入上傳參數 storageRef(storage, 參數名稱)
export const mountainFileRef = storageRef(storage, useStore.email)
// 獲取圖片網址
export const getPicUrl = () => {
  getDownloadURL(mountainFileRef)
    .then((url) => {
      GetUserPic(NewName.value, url)
      console.log('獲取圖片成功')
      setData(url)
    })
    .catch((error) => {
      console.error('錯誤', error)
    })
}
export const UpLoadData = (filedata) => {
  uploadBytes(mountainFileRef, filedata).then(() => {
    getPicUrl()
    console.log('獲取圖片網址成功')
    console.log('上傳成功')
  })
}
