<!-- <script setup>
// import japenMap from '@/components/JapenMap.vue'
import headerBar from '@/views/header.vue'
import Banner from '@/views/Banner-put.vue'
import Content from '@/views/Content-vue.vue'
import { onMounted, ref } from 'vue'
const shwo = ref(false)
const shwo1 = ref(false)
const shwo2 = ref(false)
const shwo3 = ref(false)
const handleScroll = () => {
  console.log(window.scrollY)
  if (window.scrollY > 100) shwo.value = true
  if (window.scrollY > 995) shwo1.value = true
  if (window.scrollY > 1800) shwo2.value = true
  if (window.scrollY > 2600) shwo3.value = true
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <headerBar></headerBar>
    <banner></banner>
    <transition-group>
      <Content v-show="shwo"></Content>
      <Content v-show="shwo1"></Content>
      <Content v-show="shwo2"></Content>
      <Content v-show="shwo3"></Content>
    </transition-group>
  </div>
</template> -->
<script setup>
import { onMounted, ref } from 'vue'
// import japenMap from '@/components/JapenMap.vue'
import headerBar from '@/views/header.vue'
import Banner from '@/views/Banner-put.vue'
import Content from '@/views/Content-vue.vue'
import MainIndex from '@/views/main-index.vue'
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
    <headerBar :scrollRef="scrollRef"></headerBar>
    <banner></banner>
    <Content :scrollRef="scrollRef"></Content>
    <MainIndex :scrollRef="scrollRef"></MainIndex>
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
