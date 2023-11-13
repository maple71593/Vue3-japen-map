<script setup>
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  increment,
  deleteDoc,
  getDoc,
  setDoc
} from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useUserStore, useComStore } from '@/Stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const useCom = useComStore()
const useStore = useUserStore()
const db = useFirestore()
// 增加人數
const addPeo = async (item) => {
  const updataCart = doc(db, `/UserData/${useStore.email}/cart`, `${item}`)
  await updateDoc(updataCart, {
    people: increment(1)
  })
}
// 減少人數
const reducePeo = async (item, people) => {
  if (people <= 1) return useCom.MessageBox('數量不能低於1', 2)
  const updataCart = doc(db, `/UserData/${useStore.email}/cart`, `${item}`)
  await updateDoc(updataCart, {
    people: increment(-1)
  })
}

// 刪除功能
const Delete = async (item) => {
  useCom.MessageBox('刪除成功', 3)
  await deleteDoc(doc(db, `/UserData/${useStore.email}/cart`, `${item}`))
}
//獲取當前時間，當作訂單編號
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
const day = currentDate.getDate().toString().padStart(2, '0')
const hours = currentDate.getHours().toString().padStart(2, '0')
const minutes = currentDate.getMinutes().toString().padStart(2, '0')
const seconds = currentDate.getSeconds().toString().padStart(2, '0')
const todayDate = `${year}${month}${day}`
const currentTime = `${year}/${month}/${day},${hours}:${minutes}:${seconds}`
//結帳功能
const UserOrder = ref()
const orderUID = ref()
const DatabaseAllUID = ref()
const goPay = async () => {
  useCom.isLoading = true
  useCom.MessageBox('前往結帳頁面', 3)
  //新增資料庫訂單總數
  const washingtonRef = doc(db, 'Database', 'order')
  await updateDoc(washingtonRef, {
    id: increment(1)
  })
  // 取得資料庫訂單總數
  const docRef = doc(db, 'Database', 'order')
  const docSnap = await getDoc(docRef)
  DatabaseAllUID.value = docSnap.data().id
  // 將日期與資料庫總數Data 存放在orderUID.value
  orderUID.value = todayDate + DatabaseAllUID.value.toString()
  //獲取用戶個人資訊訂單UID
  const DocRef = doc(db, 'UserData', `${useStore.email}`)
  const DocSnap = await getDoc(DocRef)
  UserOrder.value = DocSnap.data().order
  //更新用戶個人資訊訂單UID(已備未來查詢訂單用)
  UserOrder.value.push(orderUID.value)
  const WashingtonRef = doc(db, 'UserData', `${useStore.email}`)
  await updateDoc(WashingtonRef, {
    order: UserOrder.value
  })
  // 新增資料至訂單資料庫
  useStore.UserCart.forEach(async (item) => {
    await addDoc(
      collection(
        db,
        `/UserData/${useStore.email}/Order/${orderUID.value}/Order`
      ),
      item
    )
  })
  //新增當前時間與其他資料
  await setDoc(
    doc(db, `/UserData/${useStore.email}/Order`, `${orderUID.value}`),
    {
      order: orderUID.value,
      time: currentTime,
      state: '未付款',
      total: useStore.Total
    }
  )
  //刪除全數購物車
  useStore.UserCart.forEach(async (item) => {
    await deleteDoc(doc(db, `/UserData/${useStore.email}/cart`, item.title))
  })
  router.push({
    path: '/pay',
    query: { UID: orderUID.value }
  })
  setTimeout(() => {
    useCom.isLoading = false
  }, 100)
}
</script>
<template>
  <MessageBox></MessageBox>
  <transition appear>
    <div class="Cart-page">
      <div>
        <img src="../../../public/shopping-cart.png" alt="" />
        <h1>我的購物車:</h1>
      </div>
      <table>
        <tr>
          <th>行程編號</th>
          <th>產品名稱</th>
          <th>單價</th>
          <th>數量</th>
          <th>小計</th>
          <th>操作</th>
        </tr>
        <tr
          v-for="(item, index) in useStore.UserCart"
          :key="index"
          v-show="useStore.UserCart"
        >
          <td>{{ item.id }}</td>
          <td>
            <img :src="item.img" alt="" />
            <p>{{ item.title }}</p>
          </td>
          <td>{{ item.amount }}</td>
          <td>
            <button @click="reducePeo(item.title, item.people)">-</button>
            <p>{{ item.people }}</p>
            <button @click="addPeo(item.title)">+</button>
          </td>
          <td>{{ item.amount * item.people }}</td>
          <td><button @click="Delete(item.title)">刪除</button></td>
        </tr>
      </table>
      <div class="nullCart" v-show="useStore.UserCart.length <= 0">
        <img src="./../../../public/none.2de70258.png" alt="" />
        <h2>空空如也</h2>
      </div>
      <br />
      <hr />
      <br />
      <div class="CartTotal" v-show="!useStore.UserCart.length <= 0">
        <div>
          <h1>共計 {{ useStore.UserCart.length }} 個行程</h1>
        </div>
        <div>
          <h1>總金額 : {{ useStore.Total }}$</h1>
        </div>
        <button @click="goPay" class="btn">去結帳</button>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.Cart-page {
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
    td:nth-child(2) {
      text-align: start;
      p {
        display: inline;
        margin-left: 10px;
      }
      img {
        width: 100px;
        height: 100px;
        vertical-align: middle;
      }
    }
    td:nth-child(4) {
      p {
        margin-left: 15px;
        display: inline;
        vertical-align: middle;
      }
      button {
        width: 30px;
        height: 30px;
        @include phone {
          width: 20px;
          height: 20px;
        }
      }
    }
    td {
      height: 120px;
      font-size: 20px;
      text-align: center;
      @include phone {
        font-size: 10px;
      }
    }
  }
}
.CartTotal {
  text-align: end;
  padding-bottom: 30px;
  h1 {
    // text-align: end;
    margin-bottom: 10px;
  }
  button {
    width: 100px;
    height: 50px;
    padding: 10px;
    font-size: 20px;
  }
}
.nullCart {
  text-align: center;
  img {
    width: 300px;
    height: 300px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
