<script setup>
import { ref } from 'vue'
import { useUserStore, useComStore } from '../../stores'
import emailjs from '@emailjs/browser'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
const db = useFirestore()
const useCom = useComStore()
const useStore = useUserStore()
const name = ref(useStore.username ? useStore.username : null)
const Email = ref(useStore.email ? useStore.email : null)
const PhoneNum = ref()
const type = ref()
const where = ref()
const Msg = ref()
const sendEmail = async () => {
  // 增加詢問訂單總數
  const washingtonRef = doc(db, 'Database', 'ask')
  await updateDoc(washingtonRef, {
    id: increment(1)
  })
  // 獲取詢問訂單總數
  const docRef = doc(db, 'Database', 'ask')
  const docSnap = await getDoc(docRef)
  // Emailjs參數
  let templateParams = {
    order_askNum: docSnap.data().id,
    ordsr_type: type.value,
    ordsr_name: name.value,
    ordsr_email: Email.value,
    ordsr_phone: PhoneNum.value,
    ordsr_where: where.value,
    ordsr_Msg: Msg.value
  }
  let Public = 'PKdYIFmAKtd-J7yZO'
  let template = 'template_r1fgo0b'
  let Server = 'service_kc6bj89'
  emailjs.send(Server, template, templateParams, Public).then(
    (result) => {
      useCom.MessageBox('收到您的需求，我們會盡速與您聯絡', 3)
      console.log('SUCCESS!', result.text)
      clean()
    },
    (error) => {
      useCom.MessageBox('失敗，請稍後再試', 1)
      console.log('FAILED...', error.text)
      clean()
    }
  )
}
const clean = () => {
  name.value = ''
  Email.value = ''
  PhoneNum.value = ''
  type.value = ''
  where.value = ''
  Msg.value = ''
}
</script>
<template>
  <MessageBox></MessageBox>
  <transition appear>
    <div class="Connection-index">
      <div>
        <img src="../../../public/money-check-edit.png" alt="" />
        <h1>旅遊諮詢:</h1>
      </div>
      <div>
        <div>
          <div>
            <h3>諮詢類別:</h3>
            <div>
              <select v-model="type">
                <option>自由行</option>
                <option>團體旅遊</option>
                <option>家族旅遊</option>
                <option>蜜月旅行</option>
              </select>
            </div>
          </div>
          <div>
            <h3>聯絡人姓名:</h3>
            <input type="text" name="" v-model="name" id="" />
          </div>
          <div>
            <h3>聯絡Email:</h3>
            <input type="text" name="" v-model="Email" id="" />
          </div>
          <div>
            <h3>連絡電話:</h3>
            <input type="text" name="" v-model="PhoneNum" id="" />
          </div>
        </div>
        <div>
          <div>
            <h3>資訊來源:</h3>
            <div>
              <select v-model="where">
                <option>Google搜尋</option>
                <option>社群網站</option>
                <option>電視廣告</option>
                <option>親朋好友介紹</option>
                <option>其他</option>
              </select>
            </div>
          </div>
          <div>
            <h3>需求說明(700字內):</h3>
            <textarea
              v-model="Msg"
              name="mytext"
              rows="6"
              cols="40"
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <button @click="sendEmail" class="btn2">送出</button>
        <button @click="clean" class="btn2">清空</button>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.Connection-index {
  margin: auto;
  border-radius: 10px;
  margin-top: 30px;
  width: 80vw;
  height: 80vh;
  background-color: #a8dd9d;
  > div:nth-child(1) {
    height: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    background-color: #5fbe4c;
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
    // width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // background-color: #ccc;
    h3 {
      margin: 10px;
      display: inline-block;
    }
    input {
      padding: 8px;
      border: 1px solid #ccc;
      width: 300px;
      border-radius: 5px;
      outline: none;
      background-color: white;
      // box-sizing: border-box;
    }
    > div:nth-child(1) {
      width: 300px;
    }
    > div:nth-child(2) {
      width: 300px;
    }
  }
  > div:nth-child(3) {
    margin-top: 20px;
    // background-color: #5fbe4c;
    text-align: center;
    button {
      margin: 10px;
    }
  }
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 8px;
  border: 1px solid #ccc;
  width: 200px;
  border-radius: 5px;
  outline: none;
  background-color: white;
}
textarea {
  width: 400px;
  height: 200px;
  appearance: none;
  padding: 8px;
  border: 1px solid #ccc;
  width: 200px;
  border-radius: 5px;
  outline: none;
  background-color: white;
}
</style>
