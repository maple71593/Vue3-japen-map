<script setup>
import { collection, query, getDocs } from 'firebase/firestore'
import { ref } from 'vue'
import { useFirestore } from 'vuefire'
const db = useFirestore()
const Choice = ref([])
// 執行搜索函數
// const SeachData = ref(route.query.location)
const getdata = async () => {
  const citiesRef = collection(db, 'Plan')
  const q = query(citiesRef)
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
    Choice.value.push(doc.data())
  })
}
getdata()
</script>
<template>
  <div>
    <div class="search-container">
      <div class="search-All-page">
        <div class="search-page" v-for="(item, index) in Choice" :key="index">
          <div class="search-page-img">
            <img :src="item.img" alt="" />
          </div>
          <div class="search-page-text">
            <h2
              @click="
                $router.push({ path: '/list-index', query: { id: item.id } })
              "
            >
              {{ item.title }}
            </h2>
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
