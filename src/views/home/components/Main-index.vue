<script setup>
import { getMasterPic } from '@/api/home.js'
import { computed, ref, defineProps } from 'vue'
const scrollRef = defineProps(['scrollRef'])
const Mixshow = computed(() => scrollRef.scrollRef > 1700)
const pic = ref([])
const useMasterPic = async () => {
  const { data } = await getMasterPic()
  pic.value = data
}
useMasterPic()
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
    <div class="main-box" :class="{ mainbox: Mixshow }">
      <div class="master" v-for="item in pic" :key="item.id">
        <div class="master-testBox">
          <h2>{{ item.name }}</h2>
          <h3>{{ item.studying }}</h3>
          <h3>{{ item.studying2 }}</h3>
          <h3>{{ item.studying3 }}</h3>
          <h3>{{ item.studying4 }}</h3>
          <p>{{ item.test }}</p>
        </div>
        <img :src="item.img" alt="" />
      </div>
      <div>
        <div class="content-p" :class="{ contentp: Mixshow }">專業團隊</div>
        <div class="content-after" :class="{ contentafter: Mixshow }"></div>
      </div>
    </div>
  </div>
</template>
<style>
.main {
  width: 100%;
  margin: 100px 0px;
}
.main-box {
  width: 1200px;

  display: flex;
  flex-wrap: wrap;
  position: relative;
  transition: 1.5s;
  opacity: 0;
  z-index: 1;
}
.mainbox {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  opacity: 1;
  z-index: 1;
}
/* 控制最上頭的標題 */
.main-box-text {
  font-size: 100px;
}
/* 控制文字標題 */
.content-p {
  color: rgb(72, 72, 73);
  font-size: 50px;
  font-weight: 1000;
  margin-bottom: 10px;
  box-shadow: 10px, 10px;
  left: -50px;
  position: relative;
  opacity: 0;
  transition: 2s;
}
.contentp {
  color: rgb(72, 72, 73);
  font-size: 50px;
  font-weight: 1000;
  margin-bottom: 10px;
  box-shadow: 10px, 10px;
  left: 0;
  position: relative;
  opacity: 1;
  transition: 1s;
}

/* 控制文字標題下方假裝的偽元素 ()*/
.content-after {
  width: 1%;
  height: 1px;
  background-color: brown;
  margin-bottom: 10px;
  transition: 2s;
}
.contentafter {
  width: 100%;
  height: 3px;
  margin-bottom: 10px;
  background-color: brown;
}
/* 控制卡片盒子整體 */
.master {
  width: 270px;
  height: 400px;
  position: relative;
  text-align: center;
  transition: 1s;
}
.master:hover {
  position: relative;
  text-align: center;
  z-index: 2;
}
/* 控制下面v-for最後兩個的高度 讓他們有重疊的感覺 */
/* .main-box div:nth-child(6) {
  margin-top: -20%;
}
.main-box div:nth-child(7) {
  margin-top: -20%;
} */
/* 控制for的裡面的文字盒子樣式 */
.master-testBox {
  font-size: 12px;
  opacity: 0;
  transition: 1s;
  bottom: 0;
  position: absolute;
}
.master:hover .master-testBox {
  font-size: 12px;
  opacity: 1;
  text-shadow: 5px 5px 10px black;
  color: rgb(171, 240, 216);
  background: linear-gradient(to top, rgb(69, 69, 69), rgba(128, 128, 128, 0));
  z-index: 2;
  bottom: 10%;
  position: absolute;
}
/* 圖片 */
.master img {
  width: 270px;
  height: 400px;
  top: 0%;
  left: 0%;
  position: absolute;
  z-index: -1;
  width: 100%;
}
</style>
