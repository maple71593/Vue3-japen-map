<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <div class="Login-page">
    <div class="register" v-if="show">
      <div>
        <h1>加入我們</h1>
        <input type="email" src="" alt="" placeholder="請輸入你的電子郵件" />
        <input type="password" placeholder="請輸入你的密碼" />
        <button>註冊</button>
        <button @click="show = !show">已有會員</button>
      </div>
    </div>
    <div class="login" v-else>
      <div>
        <h1>歡迎回來</h1>
        <input type="email" src="" alt="" placeholder="請輸入你的電子郵件" />
        <input type="password" placeholder="請輸入你的密碼" />
        <button>登入</button>
        <button @click="show = !show">已有會員</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Login-page {
  @extend %container-100;
}
.register {
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid bisque;
  border-radius: 10px;
  text-align: center;
  > div {
    input {
      width: 300px;
      height: 30px;
      margin: 10px;
      border-radius: 10px;
      display: block;
    }
    button {
      display: block;
      width: 300px;
      height: 30px;
      margin: 10px;
      border-radius: 10px;
      background-color: #003ec5df;
      font-size: 15px;
      color: rgb(253, 253, 253);
    }
  }
}
.login {
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid bisque;
  border-radius: 10px;
  text-align: center;
  > div {
    input {
      width: 300px;
      height: 30px;
      border-radius: 10px;
      display: block;
      margin: 10px;
    }
    button {
      display: block;
      width: 300px;
      height: 30px;
      margin: 10px;
      border-radius: 10px;
      background-color: #a0b5e3df;
      font-size: 15px;
      color: rgb(253, 253, 253);
    }
  }
}
</style>
