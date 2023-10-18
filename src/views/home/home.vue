<script setup>
import { onMounted, ref } from 'vue'
// import JapenMapcopy from '@/views/home/components/JapenMap-copy.vue'
import ContentIndex from '@/views/home/components/Content-2-index.vue'
import Footer from '@/views/home/components/Footer-index.vue'
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
    <ContentIndex :scrollRef="scrollRef"></ContentIndex>
    <Main :scrollRef="scrollRef"></Main>
    <Footer></Footer>
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
