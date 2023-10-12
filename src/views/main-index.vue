<script setup>
import axios from 'axios'
import { computed, ref, defineProps } from 'vue'
const scrollRef = defineProps(['scrollRef'])
const Mixshow = computed(() => scrollRef.scrollRef > 300)
const pic = ref([])
const getpic = async () => {
  // axios取得資料
  const { data } = await axios.get('http://localhost:3000/master')
  pic.value = data
}
getpic()
// 實驗用數據(取隨機數去判斷回傳數值並加載)
// //儲存已經存在的隨機數
// const reant = ref([])
// // 新增給v-for的數據
// const newpic = ref([])
// // 取得後端資料
// const pic = ref([])
// const getpic = async () => {
//   // axios取得資料
//   const { data } = await axios.get('http://localhost:3000/cart')
//   //附值給ref
//   pic.value = data
//   //進入計時器
//   setInterval(() => {
//     // 如果Mixshow(滾動數據是否大於300)達成條件時
//     if (Mixshow.value === true) {
//       // 執行取得隨機數
//       const randomInteger = Math.floor(Math.random() * 20) + 1
//       // 如果導入的隨機數存在 就跳出函數
//       if (reant.value.includes(randomInteger) === true) return
//       //導入沒有的隨機數
//       reant.value.push(randomInteger)
//       // 從後端數據中找出與隨機值一樣的ID
//       const setpic = pic.value.find((item) => randomInteger === item.id)
//       // 將取得的數據 push到新的數組 讓v-for更新
//       newpic.value.push(setpic)
//     }
//   }, 500)
// }
// getpic()

// console.log(pic.value)
</script>
<template>
  <div class="main">
    <div class="main-box">
      <h6 class="main-box-h6">專業團隊 帶你遊日本</h6>
      <div class="master" v-for="item in pic" :key="item.id">
        <h2>{{ item.name }}</h2>
        <h3>{{ item.studying }}</h3>
        <h3>{{ item.studying2 }}</h3>
        <p>{{ item.test }}</p>
        <img :src="item.img" alt="" />
      </div>
    </div>
  </div>
</template>
<style>
.main {
  width: 100%;
}
.main-box {
  width: 1200px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}
.main-box-h6 {
  font-size: 100px;
  bottom: -20%;
  left: 10%;
  position: absolute;
  color: rgb(125, 124, 122);
  z-index: 10;
}
.master {
  width: 380px;
  height: 600px;
  height: 100%;
  position: relative;
  text-align: center;
  z-index: 1;
}
.master img {
  top: 0%;
  left: 0%;
  position: absolute;
  width: 380px;
  z-index: 0;
}
</style>
