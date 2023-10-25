<script setup>
import { onMounted, ref } from 'vue'
import Header from '@/views/home/components/header-index.vue'
import Side from '@//components/Side-components.vue'
import { useFirebaseAuth } from 'vuefire'
// 監聽滾動屬性 並附值給ref
const scrollRef = ref()
// 監聽屬性邏輯
const handleScroll = () => {
  const scrollY = window.scrollY
  scrollRef.value = scrollY
}
const auth = useFirebaseAuth()
const user = auth.currentUser
console.log(user)
handleScroll()
// 掛載監聽屬性
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>
<template>
  <div>
    <Header :scrollRef="scrollRef"></Header>
    <router-view :scrollRef="scrollRef"></router-view>
    <Side></Side>
  </div>
</template>
<style>
* {
  margin: auto;
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
</style>
