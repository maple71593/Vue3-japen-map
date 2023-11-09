<script setup>
import { useRoute } from 'vue-router'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  increment
} from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores'
const useStore = useUserStore()
const router = useRouter()
const db = useFirestore()
const route = useRoute()
const data = ref({})
const newdata = ref({})
const cityData = ref([])
// 監聽router數據變化，有變化就重新渲染Data
watch(
  () => route.query.id,
  () => {
    getdata()
  }
)
//搜尋函數，獲取數據
const getdata = async () => {
  const q = query(
    collection(db, 'Plan'),
    where('id', '==', `${route.query.id}`)
  )
  const querySnapshot = await getDocs(q)
  data.value = {}
  querySnapshot.forEach((doc) => {
    data.value = doc.data()
    newdata.value = data.value.time.toDate().toLocaleDateString()
  })
  const p = query(
    collection(db, 'Plan'),
    where('location', '==', `${data.value.location}`)
  )
  const querySnapshot2 = await getDocs(p)
  cityData.value = []
  querySnapshot2.forEach((doc) => {
    cityData.value.push(doc.data())
  })
}
getdata()
//跳轉購物車頁面

const toCart = async () => {
  // 查詢購物車
  const docRef = doc(
    db,
    `/UserData/${useStore.email}/cart`,
    `${data.value.title}`
  )
  const docSnap = await getDoc(docRef)
  //docSnap.exists(true/false) 可以判斷是否存在資料
  //當資料存在時，就更新data, 當資料不存在時就新增data
  if (docSnap.exists()) {
    // 更新購物車
    const updataCart = doc(
      db,
      `/UserData/${useStore.email}/cart`,
      `${data.value.title}`
    )
    await updateDoc(updataCart, {
      //increment(增加數字)
      people: increment(1)
    })
  } else {
    //新增購物車
    const newCartRef = doc(
      db,
      `/UserData/${useStore.email}/cart`,
      `${data.value.title}`
    )

    await setDoc(newCartRef, {
      id: data.value.id,
      title: data.value.title,
      orderType: '購物車',
      pay: '未付款',
      people: 1,
      amount: data.value.amount
    })
  }
  router.push({ path: '/cart', query: { id: route.query.id } })
}
</script>
<template>
  <div class="list-page">
    <div>
      <div>
        <h2>{{ data.title }}</h2>
      </div>
      <div>
        <div>
          <img :src="data.img" alt="" />
        </div>
        <div>
          <h2>行程介紹</h2>
          <h3>產品編號:{{ data.id }}</h3>
          <h3>剩餘:{{ data.last }}</h3>
          <h3>出發日期:{{ newdata }}</h3>
          <h3>航班:{{ data.airplane }}</h3>
          <div>
            <h4>{{ data.notice1 }}</h4>
            <h4>{{ data.notice2 }}</h4>
            <h4>{{ data.notice3 }}</h4>
            <h4>{{ data.notice4 }}</h4>
          </div>
        </div>
      </div>
      <div>
        <h3>{{ data.amount }}</h3>
        <button @click="toCart" class="btn2">手刀報名</button>
      </div>
    </div>
    <div>
      <h3>千萬別錯過</h3>
      <div>
        <div v-for="(item, index) in cityData" :key="index">
          <div>
            <h3>
              <router-link
                @click="getdata"
                :to="{ path: '/list-index', query: { id: item.id } }"
                >{{ item.title }}</router-link
              >
            </h3>
            <div><img :src="item.img" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.list-page {
  width: 80vw;
  height: 500px;
  margin: auto;
  display: flex;
  border-radius: 10px;
  margin-top: 20px;
  background-color: white;
  > div:nth-child(1) {
    width: 75%;
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
  > div:nth-child(2) {
    width: 25%;
    height: 100%;
    background-color: rgb(133, 133, 255);
    border-radius: 10px;
    > h3 {
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: azure;
    }
    > div:nth-child(2) {
      overflow: auto;
      height: 450px;
      background-color: rgb(236, 108, 108);
    }
    img {
      width: 100%;
    }
  }
}
</style>
