<script setup>
import { collection, query, getDocs, getDoc, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useUserStore, useComStore } from '@/stores'
import { ref } from 'vue'
const useStore = useUserStore()
const useCom = useComStore()
const db = useFirestore()
const orderData = ref()
const orderNum = ref()
const Email = ref()
const order = ref([])
const UserOrder = ref({})
const searchDate = ref({})
// 獲取用戶的訂單號碼
const getUserOrder = async () => {
  if (useStore.token) {
    const docRef = doc(db, 'UserData', `${useStore.email}`)
    const docSnap = await getDoc(docRef)
    UserOrder.value = docSnap.data().order
  }
}
getUserOrder()
//獲取用戶訂單資訊
const getUserOrderData = async () => {
  if (useStore.token) {
    const q = query(
      collection(
        db,
        `UserData/${useStore.email}/Order/${orderData.value}/Order`
      )
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      order.value.push(doc.data())
    })
    const docRef = doc(
      db,
      `/UserData/${useStore.email}/Order`,
      `${orderData.value}`
    )
    const docSnap = await getDoc(docRef)
    searchDate.value = docSnap.data()
  }
}
//輸入電子郵件跟訂單編號的查詢
const getData = async () => {
  if (Email.value === '' || orderNum.value === '')
    return useCom.MessageBox('請輸入指定資料', 1)
  const docRef = doc(db, `/UserData/${Email.value}/Order`, `${orderNum.value}`)
  const docSnap = await getDoc(docRef)
  searchDate.value = docSnap.data()
}
// 清空數據
const clean = () => {
  Email.value = ''
  orderNum.value = ''
  orderData.value = ''
  order.value = []
  searchDate.value = {}
}
</script>
<template>
  <MessageBox></MessageBox>
  <transition appear>
    <div class="order-page">
      <div>
        <img src="../../../public/document.png" alt="" />
        <h1>訂單查詢:</h1>
      </div>
      <div>
        <div v-if="UserOrder.length > 0">
          <label for="dropdown">選擇資料：</label>
          <select id="dropdown" v-model="orderData" @change="getUserOrderData">
            <option
              v-for="(item, index) in UserOrder"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div>
          <h3>E-mail:</h3>
          <input type="text" v-model="Email" />
        </div>
        <div>
          <h3>訂單編號:</h3>
          <input type="text" v-model="orderNum" />
        </div>
        <div>
          <button @click="getData" class="btn3">查詢</button>
        </div>
        <div>
          <button @click="clean" class="btn3">清空</button>
        </div>
      </div>
      <table>
        <tr>
          <th>訂單編號</th>
          <th>訂單時間</th>
          <th>訂單狀態</th>
          <th>總金額</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>{{ searchDate.order }}</td>
          <td>{{ searchDate.time }}</td>
          <td>{{ searchDate.state }}</td>
          <td>{{ searchDate.total }}</td>
          <td></td>
        </tr>
      </table>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.order-page {
  margin: auto;
  border-radius: 10px;
  margin-top: 30px;
  width: 80vw;
  height: 80vh;
  button {
    margin-left: 20px;
    width: 60px;
    height: 35px;
  }
  > div:nth-child(1) {
    height: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    background-color: #d19797;
    h1 {
      color: rgb(245, 245, 245);
      margin-left: 10px;
    }
    img {
      margin-left: 20px;
      width: 30px;
      height: 30px;
    }
  }
  > div:nth-child(2) {
    height: 60px;
    display: flex;
    justify-content: start;
    align-items: center;
    background-color: aliceblue;
    h3 {
      margin: 0px 10px;
      display: inline-block;
    }
    input {
      box-sizing: border-box;
      width: 200px;
      height: 35px;
      padding-left: 10px;
      border-radius: 10px;
      border: 0px;
      box-shadow: 0px 1px 4px;
    }
  }
  > table {
    width: 100%;
    border: 1px solid black;
    th {
      background-color: bisque;
    }
    td {
      text-align: center;
    }
  }
}
</style>
