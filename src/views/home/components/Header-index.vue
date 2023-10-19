<script setup>
import { computed, defineProps } from 'vue'
const scrollRef = defineProps(['scrollRef'])
const show = computed(() => scrollRef.scrollRef > 800)
</script>
<template>
  <div class="header" :class="{ headREer: show }">
    <h4 class="logo" @click="$router.push('/')">宏宏旅行社</h4>
    <ul>
      <li><a href="#">旅遊諮詢</a></li>
      <li><a href="#">精選旅程</a></li>
      <li><a href="#">購物車</a></li>
      <li><a href="#">會員登入</a></li>
    </ul>
  </div>
</template>
<style>
/* header頁首*/

.header {
  height: 100px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  background: linear-gradient(to bottom, #474747, transparent);
  top: 0;
  width: 100%;
  z-index: 100;
  transition: 1.5s ease-in-out;
}
.headREer {
  height: 100px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  background: linear-gradient(to bottom, #474747, transparent);
  top: -100px;
  width: 100%;
  z-index: 100;
}

.logo {
  width: 300px;
  height: 50px;
  text-align: center;
  font-size: 50px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.header ul li a {
  font-size: 25px;
  padding-right: 10px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  border-right: 1px solid red;
}

.header ul {
  vertical-align: middle;
  display: flex;
}
.header ul li {
  list-style-type: none;
  padding: 10px;
  margin: auto;
}
</style>
