<script setup>
import Footer from '@/views/home/components/Footer-index.vue'
import Banner from '@/views/home/components/Banner-index.vue'
import Content from '@/views/home/components/Content-index.vue'
import ContentIndex from '@/views/home/components/Content-2-index.vue'
// import Main from '@/views/home/components/main-index.vue'
const scrollRef = defineProps(['scrollRef'])
</script>

<template>
  <div>
    <MessageBox></MessageBox>
    <Banner style="position: relative; top: -75px; z-index: -1"></Banner>
    <Content :scrollRef="scrollRef"></Content>
    <ContentIndex :scrollRef="scrollRef"></ContentIndex>
    <!-- <Main :scrollRef="scrollRef"></Main> -->
    <Footer></Footer>
  </div>
</template>
<style></style>
