<script setup>
import { ref } from 'vue'
const cardPages = ref([
  { title: '東京', imageSrc: '../assets/page1.jpg' },
  { title: '大阪', imageSrc: '../assets/page2.jpg' },
  { title: '京都', imageSrc: '../assets/page3.jpg' },
  { title: '神戶', imageSrc: '../assets/page4.jpg' },
  { title: '福岡', imageSrc: '../assets/page5.jpg' },
  { title: '北海道', imageSrc: '../assets/page6.jpg' }
])
const changeIMG = (item) => {
  const url = new URL(item, import.meta.url).href
  return url
}
</script>

<template>
  <div class="content">
    <p>探索秘境</p>
    <div class="card">
      <div class="card-page" v-for="(item, index) in cardPages" :key="index">
        <div>{{ item.title }}</div>
        <img :src="changeIMG(item.imageSrc)" alt="" />
      </div>
    </div>
  </div>
</template>
<style>
.content {
  width: 1200px;
  margin-top: 30px;
  padding-top: 30px;
  color: rgb(0, 0, 92);
  font-size: 40px;
  text-align: center;
  border-radius: 30px;
  box-shadow: 10px, 10px;
  background-color: #b4b4b4;
}
.content p {
  color: rgb(0, 0, 92);
  font-size: 50px;
}

.content-item {
  width: 400px;
  height: 500px;
  background-color: rgb(27, 74, 28);
  border-radius: 10px;
}
.card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.card-page {
  width: 390px;
  margin-top: 10px;
  background-color: rgb(198, 198, 198);
  border-radius: 10px;
}
.card-page img {
  width: 100%;
}
</style>
