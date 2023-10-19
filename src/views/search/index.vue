<script setup>
import FakeHeader from '@/components/Fake-Header.vue'
import Calendar from '@/components/Calendar-index.vue'
import { getSecrchData } from '@/api/home.js'
import { ref } from 'vue'
const show = ref(false)
const SearchData = ref()
const useSecrchData = async () => {
  const { data } = await getSecrchData()
  SearchData.value = data
}
useSecrchData()
</script>
<template>
  <FakeHeader></FakeHeader>
  <div class="search-container">
    <div v-if="show">
      <Calendar></Calendar>
      <button @click="show = !show" class="btn">返回</button>
    </div>
    <div class="search-result" v-else>
      <h2>搜尋結果</h2>
      <h1>沒有找到滿意的結果嗎</h1>
      <button class="btn" @click="show = !show">換個條件搜尋看看!</button>
    </div>
    <div class="search-All-page">
      <div class="search-page" v-for="(item, index) in SearchData" :key="index">
        <div class="search-page-img">
          <img :src="item.imageSrc" alt="" />
        </div>
        <div class="search-page-text">
          <h2>{{ item.title }}</h2>
          <h5>{{ item.content1 }}</h5>
          <h5>{{ item.content2 }}</h5>
          <h5>{{ item.content3 }}</h5>
          <h5>{{ item.content4 }}</h5>
          <h5>{{ item.content5 }}</h5>
          <h5>{{ item.content6 }}</h5>
          <h3>{{ item.amount }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
/* 版芯 */
.search-container {
  width: 80vw;
  margin: auto;
}
.search-result {
  margin-top: 10px;
  display: flex;
  flex-wrap: nowrap;
}
.search-header {
  width: 100vw;
}
.search-page {
  display: flex;
  flex-wrap: nowrap;
  margin: 3% 0px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(162, 162, 162);
}
.search-page-img {
  width: 50%;
}
.search-page-img img {
  width: 100%;
  border-radius: 10px;
}
.search-page-text {
  margin: 3%;
  width: 50%;
  font-size: 20px;
  position: relative;
}
.search-page-text h2 {
  color: rgb(203, 203, 203);
  margin: 2% 0;
  text-shadow: 0px 1px 5px black;
  cursor: pointer;
}
.search-page-text h5 {
  color: rgb(248, 158, 48);
  margin: 2% 0;
}
.search-page-text h3 {
  font-size: 30px;
  color: rgb(54, 23, 111);
  bottom: 0;
  right: 0;
  position: absolute;
}
.search-page-text h3::before {
  content: '$';
}
.search-page-text h3::after {
  content: '起';
  font-size: 25px;
  color: rgb(25, 19, 59);
}
</style>
