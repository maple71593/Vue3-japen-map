<script setup>
import Footer from '@/views/home/components/Footer-index.vue'
import Banner from '@/views/home/components/Banner-index.vue'
import Content from '@/views/home/components/Content-index.vue'
import ContentIndex from '@/views/home/components/Content-2-index.vue'
import Main from '@/views/home/components/main-index.vue'
import MessageBox from '@/components/Message-Box.vue'
import { ref } from 'vue'
const scrollRef = defineProps(['scrollRef'])
const refBox = ref(null)
console.log(refBox.value)
</script>

<template>
  <div>
    <MessageBox :ref="refBox"></MessageBox>
    <Banner></Banner>
    <Content :scrollRef="scrollRef"></Content>
    <ContentIndex :scrollRef="scrollRef"></ContentIndex>
    <Main :scrollRef="scrollRef"></Main>
    <Footer></Footer>
  </div>
</template>
<style></style>
