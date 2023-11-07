<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'
import { ref, computed, defineProps } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
//接收滾動數據
const { scrollRef } = defineProps(['scrollRef'])
const BannerBar = computed(() => scrollRef.scrollRef > 300)
// 獲取資料庫數據並存取在content
const content = ref([])
const uesCardPages = async () => {
  const db = useFirestore()
  const querySnapshot = await getDocs(collection(db, 'Plan'))
  querySnapshot.forEach((doc) => {
    content.value.push(doc.data())
  })
}
uesCardPages()
// swiper.js模組
const modules = [EffectCoverflow, Pagination, Autoplay]
</script>
<template>
  <div class="content">
    <div>
      <div class="content-p" :class="{ contentp: BannerBar }">精選旅程</div>
      <div class="content-after" :class="{ contentafter: BannerBar }"></div>
    </div>
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :effect="'coverflow'"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      :grabCursor="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
    >
      <SwiperSlide v-for="(item, index) in content" :key="index">
        <h3 class="card-page-h3">{{ item.location }}</h3>
        <img :src="item.img" alt="" />
        <div class="card-page-text">
          <h3>{{ item.title }}</h3>
          <h3>{{ item.content1 }}</h3>
          <h2>{{ item.amount }}</h2>
        </div>
      </SwiperSlide>
    </swiper>
  </div>
</template>

<style>
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family:
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 70%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.content {
  width: 1200px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 100px;
  margin-top: 30px;
  margin-bottom: 100px;
  padding-top: 30px;
  text-align: left;
  border-radius: 30px;
  display: flex;
}

/* 控制文字標題 */
.content-p {
  color: rgb(72, 72, 73);
  font-size: 50px;
  font-weight: 1000;
  margin-bottom: 10px;
  box-shadow: 10px, 10px;
  left: -50px;
  position: relative;
  opacity: 0;
  transition: 2s;
}
.contentp {
  color: rgb(72, 72, 73);
  font-size: 50px;
  font-weight: 1000;
  margin-bottom: 10px;
  box-shadow: 10px, 10px;
  left: 0;
  position: relative;
  opacity: 1;
  transition: 1s;
}

/* 控制文字標題下方假裝的偽元素 ()*/
.content-after {
  width: 1%;
  height: 1px;
  background-color: brown;
  margin-bottom: 10px;
  transition: 2s;
}
.contentafter {
  width: 100%;
  height: 3px;
  margin-bottom: 10px;
  background-color: brown;
}
/* 卡片標題文字 */
.card-page-h3 {
  position: absolute;
  font-size: 50px;
  color: rgb(237, 237, 237);
  transition: 0.2s;
  text-shadow: 1px 1px 1px black;
}
.card-page-text {
  width: 100%;
  height: 40%;
  font-size: 13px;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 1px black;
  bottom: 0;
  left: 0;
  border-radius: 0px 0px 10px 10px;
  background: linear-gradient(
    to bottom,
    rgba(200, 200, 200, 0.5),
    rgba(255, 255, 255, 1)
  );
  position: absolute;
}
.card-page-text h2 {
  width: 100%;
  height: 40%;
  font-size: 30px;
  color: rgb(255, 0, 0);
  bottom: 0;
  left: 1;
  text-align: right;
  position: absolute;
}
.card-page-text h2::before {
  content: '$';
  width: 100%;
  height: 40%;
  font-size: 30px;
  color: rgb(255, 0, 0);
  bottom: 0;
  left: 1;
  text-align: right;
}
.card-page-text h2::after {
  content: '起';
  width: 100%;
  height: 40%;
  font-size: 25px;
  color: rgb(0, 0, 0);
  bottom: 0;
  left: 1;
  text-align: right;
}
/* 卡片圖片控制 */
.card-page img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
