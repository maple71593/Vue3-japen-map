<script setup>
import { collection, query, onSnapshot } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useUserStore } from '@/Stores'
import { ref } from 'vue'

const useStore = useUserStore()
const UserCart = ref([])
const db = useFirestore()
const q = query(
  collection(db, `/UserData/${useStore.email}/cart`)
  //   where('people', '==', 1)
)
onSnapshot(q, (querySnapshot) => {
  let num = 0
  querySnapshot.forEach((doc) => {
    UserCart.value.push(doc.data())
    num = num + doc.data().people
  })
  useStore.CartNum = num
})
</script>
<template>
  <div class="order-page">
    <div>
      <img src="../../../public/shopping-cart.png" alt="" />
      <h1>我的購物車:</h1>
    </div>
    <table>
      <tr>
        <th>訂單編號</th>
        <th>產品名稱</th>
        <th>訂單狀態</th>
        <th>付款狀態</th>
        <th>人數</th>
        <th>總金額</th>
      </tr>
      <tr v-for="(item, index) in UserCart" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.orderType }}</td>
        <td>{{ item.pay }}</td>
        <td>{{ item.people }}</td>
        <td>{{ item.amount * item.people }}</td>
      </tr>
      <!-- <tr>
        <td>空空如也</td>
      </tr> -->
    </table>
  </div>
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
    background-color: rgb(250, 110, 110);
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
  }
}
</style>
