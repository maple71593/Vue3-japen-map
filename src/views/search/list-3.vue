<script setup>
import { ref } from 'vue'
const where = ref('')
const check = () => {
  console.log(where.value)
}
</script>
<template>
  <Loading-page></Loading-page>
  <button @click="check">實驗</button>
  <select id="tripType" v-model="where">
    <option>Google搜尋</option>
    <option>社群網站</option>
    <option>電視廣告</option>
    <option>親朋好友介紹</option>
    <option>其他</option>
  </select>
</template>
