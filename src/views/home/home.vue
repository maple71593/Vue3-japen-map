<script setup>
import { onMounted, ref } from 'vue'
// import JapenMapcopy from '@/views/home/components/JapenMap-copy.vue'
import japenMap from '@/views/home/components/JapenMap.vue'
import Header from '@/views/home/components/header-index.vue'
import Banner from '@/views/home/components/Banner-index.vue'
import Content from '@/views/home/components/Content-index.vue'
import Main from '@/views/home/components/main-index.vue'
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
    <Banner></Banner>
    <Content :scrollRef="scrollRef"></Content>
    <Main :scrollRef="scrollRef"></Main>
    <japenMap></japenMap>
    <!-- <JapenMapcopy></JapenMapcopy> -->
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
/* html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
} */

#background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.5;
}
</style>
