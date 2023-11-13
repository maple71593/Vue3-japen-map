<script setup>
import { useFirebaseAuth } from 'vuefire'
import { sendEmailVerification } from 'firebase/auth'
import { useUserStore, useComStore } from '../../stores'
const useCom = useComStore()
const useStore = useUserStore()
//發送電子郵件驗證信
const auth = useFirebaseAuth()
const getVer = () => {
  useStore.EmailVer = auth.currentUser.emailVerified
}
getVer()
const SendEmail = async () => {
  await sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      useCom.MessageBox('驗證電子郵件已發送', 3)
      // ...
    })
    .catch((err) => {
      if (err.code === 'auth/too-many-requests')
        useCom.MessageBox('電子郵件已經發送囉!快去信箱接收', 1)
      console.log(err.code)
    })
}
</script>
<template>
  <div class="user-center">
    <div>
      <h1>會員中心</h1>
    </div>
    <div v-if="useStore.EmailVer">
      <img src="../../../public/envelope.png" alt="" />
      <h3>Email認證用戶</h3>
    </div>
    <div v-else>
      <img src="../../../public/cross-circle.png" alt="" />
      <h3>Email尚未認證</h3>
      <h4>認證完成後，請重新登入</h4>
      <button @click="SendEmail" class="btn3">現在馬上認證！</button>
    </div>
    <div>
      <p>email : {{ useStore.email }}</p>
      <p>姓名 : {{ useStore.username }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.user-center {
  box-sizing: border-box;
  h1 {
    color: rgb(0, 50, 50);
    @include phone {
      font-size: 20px;
    }
  }
  p {
    font-size: 20px;
    padding: 10px;
    color: rgb(32, 32, 32);
    @include phone {
      font-size: 15px;
    }
  }
  img {
    width: 18px;
    vertical-align: text-top;
  }
  h3 {
    display: inline;
    margin: 0px 10px;
    color: rgb(57, 57, 57);
  }
  > div:nth-child(1) {
    background-color: aliceblue;
    padding: 10px;
    border-radius: 0px 10px 0px 0px;
  }
  > div:nth-child(2) {
    background-color: rgb(188, 213, 235);
    padding: 10px;
  }
}
</style>
