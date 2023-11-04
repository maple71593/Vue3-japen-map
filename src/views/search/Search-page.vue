<script setup>
import Calendar from '@/components/Calendar-index.vue'
import { ref } from 'vue'
import { useFirestore } from 'vuefire'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useRoute } from 'vue-router'
const route = useRoute()
const SeachData = ref(route.query.location)
const db = useFirestore()
const SearchData = ref([])
const getdata = async () => {
  const citiesRef = collection(db, 'Plan')
  const q = query(citiesRef, where('location', '==', `${SeachData.value}`))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
    SearchData.value.push(doc.data())
  })
}
getdata()
console.log(SearchData.value)
const show = ref(false)
</script>
<template>
  <div>
    <div class="search-container">
      <div v-if="!SearchData">
        <div class="search-result">
          <h2>搜尋結果</h2>
          <h1>沒有找到滿意的結果嗎</h1>
          <button class="btn" @click="show = !show">換個條件搜尋看看!</button>
        </div>
      </div>
      <div class="search-All-page" v-else>
        <Calendar></Calendar>
        <div
          class="search-page"
          v-for="(item, index) in SearchData"
          :key="index"
        >
          <div class="search-page-img">
            <img :src="item.img" alt="" />
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
.search-All-page {
  margin-top: 50px;
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
