<script setup>
import { ref, onBeforeUnmount } from 'vue'
import router from '../../../router'
const Num = ref(10)
const changepage = () => {
  const timer = setTimeout(() => {
    router.replace('/Login')
  }, 10000)
  const clstime = setInterval(() => {
    Num.value = Num.value - 1
    console.log(Num.value)
  }, 1000)
  onBeforeUnmount(() => {
    clearInterval(clstime)
    clearTimeout(timer)
  })
}
changepage()
// changepage()
</script>
<template>
  <div class="emailcheck">
    <div>
      <p>帳號已註冊完成</p>
    </div>
    <div>
      <p>電子郵件已發送，請到信箱接收</p>
    </div>
    <div>頁面將於{{ Num }}秒後跳轉至登入頁</div>
    <button @click="router.replace('/Login')">等不了，按我跳轉</button>
  </div>
</template>
<style lang="scss" scoped>
.emailcheck {
  width: 50vw;
  height: 70vh;
  margin: auto;
  border: 3px solid rgb(0, 123, 157);
  border-radius: 10px;
  text-align: center;
  > div {
    > p {
      font-size: 30px;
    }
  }
  button {
    background: linear-gradient(45deg, #ff5733, #ffa647);
    border: none;
    color: #fff;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    border-radius: 5px;
    box-shadow: 0px 5px 0px 0px #ff5733;
    transition: box-shadow 0.3s;
  }
  button:hover {
    background: linear-gradient(45deg, #ffa647, #ff5733);
    box-shadow: 0px 7px 0px 0px #ff5733;
  }
}
</style>
