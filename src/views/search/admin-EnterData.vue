<script setup>
import { useFirestore, useFirebaseStorage } from 'vuefire'
import { ref } from 'vue'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { useComStore } from '../../stores'
const useCom = useComStore()
const id = ref()
const title = ref()
const time = ref()
const endtime = ref()
const last = ref()
const location = ref()
const airplane = ref()
const amount = ref()
const content1 = ref()
const content2 = ref()
const content3 = ref()
const content4 = ref()
const content5 = ref()
const content6 = ref()
const notice1 = ref()
const notice2 = ref()
const notice3 = ref()
const notice4 = ref()
const fakePic =
  'https://firebasestorage.googleapis.com/v0/b/fir-test-a43df.appspot.com/o/admin%2Ftype3album_blank.png?alt=media&token=5117bf23-ff11-48b2-a3c1-bf65fc57a92c'
// 上傳資料庫
const db = useFirestore()
const check = () => {
  console.log(new Date(time.value))
}

const upDataPic = async (rul) => {
  // time.value =
  // endtime.value =
  await addDoc(collection(db, 'Plan'), {
    id: id.value,
    title: title.value,
    time: Timestamp.fromDate(new Date(time.value)),
    endtime: Timestamp.fromDate(new Date(endtime.value)),
    last: last.value,
    location: location.value,
    airplane: airplane.value,
    amount: amount.value,
    content1: content1.value ? content1.value : null,
    content2: content2.value ? content2.value : null,
    content3: content3.value ? content3.value : null,
    content4: content4.value ? content4.value : null,
    content5: content5.value ? content5.value : null,
    content6: content6.value ? content6.value : null,
    notice1: notice1.value ? notice1.value : null,
    notice2: notice2.value ? notice2.value : null,
    notice3: notice3.value ? notice3.value : null,
    notice4: notice4.value ? notice4.value : null,
    img: rul
  })
}
// 上傳照片
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
const mountainFileRef = storageRef(storage, `/admin/Plan/${id.value}`)
// 獲取上傳大頭貼 與獲得網址
const UpLoadData = async () => {
  if (!filedata.value) return useCom.MessageBox('沒有存取到圖片', 2)
  await uploadBytes(mountainFileRef, filedata.value).then(() => {
    useCom.MessageBox('上傳成功', 3)
    imgUrl.value = ''
  })
  // 獲取圖片網址
  await getDownloadURL(mountainFileRef)
    .then((url) => {
      //更新資料庫資料
      upDataPic(url)
    })
    .catch((error) => {
      console.error('錯誤', error)
    })
  clsAll()
}
const clsAll = () => {
  id.value = ''
  title.value = ''
  time.value = ''
  endtime.value = ''
  location.value = ''
  airplane.value = ''
  amount.value = ''
  content1.value = ''
  content2.value = ''
  content3.value = ''
  content4.value = ''
  content5.value = ''
  content6.value = ''
  last.value = ''
  notice1.value = ''
  notice2.value = ''
  notice3.value = ''
  notice4.value = ''
}
</script>
<template>
  <MessageBox></MessageBox>
  <div class="UploadPlan">
    <div>
      <div class="search-container">
        <h1>預覽搜尋頁</h1>
        <table>
          <tr>
            <th>行程編號</th>
            <th>出發時間</th>
            <th>產品名稱</th>
            <th>航空公司</th>
            <th>價格</th>
            <th>狀態</th>
          </tr>
          <tr>
            <td>{{ id }}</td>
            <td>{{ time }}</td>
            <td>{{ title }}</td>
            <td>{{ airplane }}</td>
            <td>{{ amount }}</td>
            <td>none</td>
          </tr>
        </table>
      </div>
      <div>
        <h1>預覽精選旅程頁</h1>
        <div class="search-page">
          <div class="search-page-img">
            <img :src="imgUrl ? imgUrl : fakePic" alt="" />
          </div>
          <div class="search-page-text">
            <h4>{{ title }}</h4>
            <h6>{{ content1 }}</h6>
            <h6>{{ content2 }}</h6>
            <h6>{{ content3 }}</h6>
            <h6>{{ content4 }}</h6>
            <h6>{{ content5 }}</h6>
            <h6>{{ content6 }}</h6>
            <h3>{{ amount }}</h3>
          </div>
        </div>
      </div>
      <h1>預覽商品頁</h1>
      <div class="list-page-admin">
        <div>
          <div>
            <h2>{{ title }}</h2>
          </div>
          <div>
            <div>
              <img :src="imgUrl ? imgUrl : fakePic" alt="" />
            </div>
            <div>
              <h2>行程介紹</h2>
              <h3>產品編號:{{ id }}</h3>
              <h3>剩餘:{{ last }}</h3>
              <h3>出發日期:{{ time }}</h3>
              <h3>航班:{{ airplane }}</h3>
              <div>
                <h4>{{ notice1 }}</h4>
                <h4>{{ notice2 }}</h4>
                <h4>{{ notice3 }}</h4>
                <h4>{{ notice4 }}</h4>
              </div>
            </div>
          </div>
          <div>
            <h3>{{ amount }}</h3>
            <button class="btn2">手刀報名</button>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex">
      <div>
        <h3>產品編號</h3>
        <input v-model="id" type="text" placeholder="請輸入產品編號" />
        <h3>商品名稱(標題)</h3>
        <input v-model="title" type="text" placeholder="請輸入商品名稱" />
        <h3>出發時間</h3>
        <input v-model="time" type="date" placeholder="請輸入出發時間" />
        <h3>結束時間</h3>
        <input v-model="endtime" type="date" placeholder="請輸入結束時間" />
        <h3>初始剩餘數量</h3>
        <input v-model="last" type="text" placeholder="請輸入數量" />
        <h3>旅遊地點</h3>
        <input v-model="location" type="text" placeholder="請輸入地點" />
        <h3>航空公司</h3>
        <input v-model="airplane" type="text" placeholder="請輸入航空公司" />
        <h3>價格</h3>
        <input v-model="amount" type="text" placeholder="請輸入價格" />
        <h3>提醒1</h3>
        <input v-model="notice1" type="text" placeholder="請輸入提醒1" />
        <h3>提醒2</h3>
        <input v-model="notice2" type="text" placeholder="請輸入提醒2" />
        <h3>提醒3</h3>
        <input v-model="notice3" type="text" placeholder="請輸入提醒3" />
        <h3>提醒4</h3>
        <input v-model="notice4" type="text" placeholder="請輸入提醒4" />
      </div>
      <div>
        <h3>介紹1</h3>
        <input v-model="content1" type="text" placeholder="請輸入介紹1" />
        <h3>介紹2</h3>
        <input v-model="content2" type="text" placeholder="請輸入介紹2" />
        <h3>介紹3</h3>
        <input v-model="content3" type="text" placeholder="請輸入介紹3" />
        <h3>介紹4</h3>
        <input v-model="content4" type="text" placeholder="請輸入介紹4" />
        <h3>介紹5</h3>
        <input v-model="content5" type="text" placeholder="請輸入介紹5" />
        <h3>介紹6</h3>
        <input v-model="content6" type="text" placeholder="請輸入介紹6" />
        <h3>上傳圖片</h3>
        <input
          id="upload"
          type="file"
          accept="image/png, image/jpeg"
          @change="upload"
        />
        <label type="button" for="upload" class="btn2"> 選擇檔案 </label>
        <button @click="UpLoadData" class="btn2">上傳</button>
        <button @click="clsAll" class="btn2">清空</button>
        <button @click="check">實驗</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.UploadPlan {
  display: flex;
  justify-content: space-around;
  align-items: center;
  input {
    display: block;
    width: 300px;
    height: 30px;
  }
}
.search-page {
  display: flex;
  width: 100%;
  max-width: 600px;
  max-height: 200px;
  flex-wrap: nowrap;
  margin: 3% 0px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(162, 162, 162);
}
.search-page-img {
  width: 50%;
}
.search-page-img img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.search-page-text {
  margin: 3%;
  width: 50%;
  font-size: 20px;
  position: relative;
}
.search-page-text h4 {
  color: rgb(203, 203, 203);
  margin: 2% 0;
  text-shadow: 0px 1px 5px black;
  font-size: 15px;
  cursor: pointer;
}
.search-page-text h6 {
  color: rgb(248, 158, 48);
  font-size: 10px;
  margin: 2% 0;
}
.search-page-text h3 {
  font-size: 30px;
  color: rgb(54, 23, 111);
  bottom: 0;
  right: 0;
  position: absolute;
}
.search-page-text h3::before {
  content: '$';
}
.search-page-text h3::after {
  content: '起';
  font-size: 25px;
  color: rgb(25, 19, 59);
}
table {
  width: 100%;
  border: 1px solid black;
  th {
    font-size: 20px;
    height: 40px;
    background-color: bisque;
  }
  td {
    font-size: 20px;
    color: rgb(96, 96, 96);
  }
}
input[type='file'] {
  display: none;
}
.list-page-admin {
  width: 100%;
  max-width: 800px;
  height: 400px;
  margin: auto;
  display: flex;
  border-radius: 10px;
  margin-top: 20px;
  background-color: white;
  > div:nth-child(1) {
    width: 100%;
    border-radius: 10px;

    > div:nth-child(1) {
      background-color: rgb(166, 166, 180);
      height: 50px;
      line-height: 50px;
      color: antiquewhite;
      border-radius: 10px 10px 0px 0px;
      > h2 {
        margin-left: 20px;
      }
    }
    > div:nth-child(2) {
      display: flex;
      > div:nth-child(1) {
        width: 50%;
        img {
          width: 100%;
        }
      }
      > div:nth-child(2) {
        width: 50%;
        color: rgb(90, 90, 90);
        background-color: rgb(255, 255, 255);
        h3 {
          margin-left: 10px;
          margin-top: 10px;
          font-size: 20px;
        }
        > h2 {
          margin-left: 10px;
          margin-top: 10px;
        }
        > div {
          margin-top: 10px;
          h4 {
            display: inline;
            background-color: rgb(111, 228, 119);
            border-radius: 25px;
            padding: 10px;
            margin-left: 5px;
            box-sizing: border-box;
          }
        }
      }
    }
    > div:nth-child(3) {
      font-size: 30px;
      color: rgb(95, 95, 95);
      text-align: end;
      h3 {
        display: inline;
        // margin-right: 20px;
        margin: 10px;
      }
      h3::before {
        content: '$';
      }
      h3::after {
        content: '人/起';
        font-size: 20px;
      }
      button {
        margin: 10px;
      }
    }
  }
}
</style>
