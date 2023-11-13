<script setup>
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useUserStore, useComStore } from '../../stores'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import emailjs from '@emailjs/browser'
const useCom = useComStore()
const route = useRoute()
const router = useRouter()
const useStore = useUserStore()
const db = useFirestore()
const OrderData = ref([])
const total = ref(0)
const GetData = async () => {
  const querySnapshot = await getDocs(
    collection(db, `/UserData/${useStore.email}/Order/${route.query.UID}/Order`)
  )
  querySnapshot.forEach((doc) => {
    OrderData.value.push(doc.data())
    total.value = total.value + Number(doc.data().total)
  })
}
GetData()
const PayEnd = async () => {
  useCom.isLoading = true
  await updateDoc(
    doc(db, `/UserData/${useStore.email}/Order`, `${route.query.UID}`),
    {
      state: '已付款'
    }
  )
  sendEmail()
  router.replace('/')
  setTimeout(() => {
    useCom.isLoading = false
    useCom.MessageBox('付款成功!', 3)
  }, 500)
}

const sendEmail = () => {
  let templateParams = {
    to_name: useStore.username,
    to_email: useStore.email,
    message: route.query.UID
  }
  let Public = import.meta.env.VITE_VUE_APP_PAY_PUBLIC_KEY
  let template = import.meta.env.VITE_VUE_APP_PAY_TEMPLATE_KEY
  let Server = import.meta.env.VITE_VUE_APP_PAY_SERVICE_KEY
  emailjs.send(Server, template, templateParams, Public).then(
    (result) => {
      console.log('SUCCESS!', result.text)
    },
    (error) => {
      console.log('FAILED...', error.text)
    }
  )
}
</script>
<template>
  <MessageBox></MessageBox>
  <transition appear>
    <div class="Pay-page">
      <div>
        <img src="../../../public/usd-circle.png" alt="" />
        <h1>付款頁面 :</h1>
      </div>
      <div>
        <div>
          <div><h1>請輸入資料</h1></div>
          <div>
            <h3>訂單編號 : {{ route.query.UID }}</h3>
            <h3>請輸入卡號</h3>

            <input
              type="text"
              name="pan_no1"
              size="4"
              value=""
              maxlength="4"
              onKeyUp="setBlur(this,'pan_no2');"
            />-
            <input
              type="text"
              name="pan_no2"
              size="4"
              value=""
              maxlength="4"
              onKeyUp="setBlur(this,'pan_no3');"
            />-
            <input
              type="text"
              name="pan_no3"
              size="4"
              value=""
              maxlength="4"
              onKeyUp="setBlur(this,'pan_no4');"
            />-
            <input type="text" name="pan_no4" size="4" value="" maxlength="4" />
            <h3>信用卡背面後三碼檢查碼 :</h3>
            <input
              type="text"
              name="pan_no3"
              size="3"
              value=""
              maxlength="3"
              onKeyUp="setBlur(this,'pan_no4');"
            />
            <h3>信用卡有效日期</h3>
            <input type="text" size="4" value="" maxlength="4" />年
            <input type="text" size="4" value="" maxlength="2" />月
          </div>
        </div>
        <div>
          <div>
            <div><h3>請確認以下資料</h3></div>
            <div>
              <table>
                <tr>
                  <th>產品名稱</th>
                  <th>人數</th>
                  <th>小計</th>
                </tr>
                <tr v-for="(item, index) in OrderData" :key="index">
                  <td>{{ item.title }}</td>
                  <td>{{ item.people }}</td>
                  <td>{{ item.total * item.people }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div>
            <p>總計 : {{ total }} 元</p>
            <button @click="PayEnd" class="btn2">付款</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.Pay-page {
  margin: auto;
  border-radius: 10px;
  margin-top: 30px;
  width: 80vw;
  height: 80vh;
  > div:nth-child(1) {
    height: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    background-color: rgb(226, 228, 89);
    h1 {
      color: rgb(255, 255, 255);
      text-shadow: 1px 1px 3px rgb(126, 126, 126);
      margin-left: 10px;
    }
    img {
      margin-left: 20px;
      width: 30px;
      height: 30px;
    }
  }
  > div:nth-child(2) {
    background-color: beige;
    height: 300px;
    display: flex;
    > div:nth-child(1) {
      background-color: rgb(255, 202, 123);
      width: 60%;
      height: 300px;
      h1 {
        margin-left: 10px;
      }
      > div:nth-child(2) {
        background-color: rgb(220, 220, 220);
        height: 100%;

        h3 {
          margin-left: 10px;
        }
        input {
          padding-left: 5px;
          margin: 0px 10px;
          border-radius: 5px;
          border: 1px solid rgb(174, 174, 144);
          width: 70px;
          height: 20px;
        }
      }
    }
    > div:nth-child(2) {
      background-color: rgb(37, 98, 151);
      width: 40%;
      height: 343px;
      > div:nth-child(1) {
        border-radius: 10px;

        > div:nth-child(1) {
          h3 {
            margin: 10px;
            text-align: center;
            background-color: aliceblue;
            border-radius: 10px;
          }
        }
        > div:nth-child(2) {
          max-height: 300px;
          min-height: 300px;
          overflow-y: auto;
        }
      }
      > div:nth-child(2) {
        text-align: end;
        p {
          color: rgb(81, 81, 81);
          font-size: 30px;
        }
      }
    }
  }
}
table {
  width: 95%;
  border-radius: 10px;
  margin: 10px auto;
  th {
    border-radius: 10px;
    background-color: bisque;
  }
  td {
    height: 40px;
    padding: 10px;
    border: 1px solid wheat;
    border-radius: 10px;
    text-align: center;
    color: aliceblue;
  }
}
</style>
