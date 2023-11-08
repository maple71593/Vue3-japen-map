<script setup>
import { onMounted, ref } from 'vue'
import Header from '@/views/home/components/header-index.vue'
import { useRoute } from 'vue-router'
import Side from '@//components/Side-components.vue'
import Calendar from '@/components/Calendar-index.vue'
import FakeHeader from '@/components/Fake-Header.vue'
const route = useRoute()
// 監聽滾動屬性 並附值給ref
const scrollRef = ref()
// 監聽屬性邏輯
const handleScroll = () => {
  const scrollY = window.scrollY
  scrollRef.value = scrollY
}
handleScroll()
// 掛載監聽屬性
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>
<template>
  <div>
    <Header :scrollRef="scrollRef"></Header>
    <FakeHeader></FakeHeader>
    <Calendar
      style="margin: 10px auto; z-index: 10"
      v-show="route.path === '/home' || route.path === '/Search-Page'"
    ></Calendar>
    <router-view :scrollRef="scrollRef"></router-view>
    <Side></Side>
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
}

a {
  list-style-type: none;
  text-decoration: none;
}
input:focus {
  outline: none;
}

.container {
  width: 1280px;
  display: flex;
  margin: auto;
}
/* // .btn {
//   display: inline-block;
//   padding: 10px 20px;
//   font-size: 25px;
//   font-weight: bold;
//   text-align: center;
//   text-decoration: none;
//   background-color: #3498db;
//   color: #fff;
//   border: 2px solid #2980b9;
//   border-radius: 5px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition:
//     background-color 0.3s,
//     transform 0.3s;
// }

// .btn:hover {
//   background-color: #2980b9;
//   transform: translateY(-2px);
// }
// .btn2 {
//   display: inline-block;
//   padding: 10px 20px;
//   font-size: 18px;
//   font-weight: bold;
//   text-align: center;
//   text-decoration: none;
//   background-color: #3498db;
//   color: #fff;
//   border: 2px solid #2980b9;
//   border-radius: 5px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition:
//     background-color 0.3s,
//     transform 0.3s;
// }

// .btn2:hover {
//   background-color: #2980b9;
//   transform: translateY(-2px);
// }
// .btn3 {
//   display: inline-block;
//   padding: 5px;
//   font-size: 12px;
//   font-weight: bold;
//   text-align: center;
//   text-decoration: none;
//   background-color: #3498db;
//   color: #fff;
//   border: 2px solid #2980b9;
//   border-radius: 5px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition:
//     background-color 0.3s,
//     transform 0.3s;
// }

// .btn3:hover {
//   background-color: #2980b9;
//   transform: translateY(-2px);
// } */
</style>
