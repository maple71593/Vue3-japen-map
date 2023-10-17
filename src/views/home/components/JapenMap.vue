<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { GetCardPages } from '@/api/home.js'
import { ref } from 'vue'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const picRef = ref()
    const getpic = async () => {
      const { data } = await GetCardPages()
      picRef.value = data
      console.log(picRef.value)
    }
    getpic()
    return {
      picRef,
      modules: [EffectCoverflow, Pagination]
    }
  }
}
</script>
<template>
  <Swiper
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
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
    <SwiperSlide v-for="(item, index) in picRef" :key="index">
      <h3 class="card-page-h3">{{ item.title }}</h3>
      <img :src="item.imageSrc" alt="" />
    </SwiperSlide>
  </Swiper>
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
  width: 100%;
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
  margin-top: 30px;
  margin-bottom: 100px;
  padding-top: 30px;
  text-align: left;
  border-radius: 30px;
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
  transition: 1s;
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
/* 卡片盒子 */
.card {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
}
/* 卡片控制 */
.card-page {
  width: 280px;
  margin: 10px;
  font-size: 20px;
  text-shadow: 10px;
  background-color: rgb(198, 198, 198);
  border-radius: 10px;
  bottom: -50px;
  right: 0px;
  position: relative;
  opacity: 0;
  transition: 1.3s ease-out;
}
.cardpage {
  width: 280px;
  margin: 10px;
  font-size: 20px;
  text-shadow: 10px;
  border-radius: 10px;
  bottom: 0px;
  right: 0px;
  opacity: 1;
  position: relative;
}
/* 控制卡片滑鼠靠近 */
.cardpage:hover {
  width: 280px;
  margin: 10px;
  font-size: 20px;
  text-shadow: 10px;
  border-radius: 10px;
  bottom: 7px;
  right: 5px;
  position: relative;
}
/* 卡片標題文字 */
.card-page-h3 {
  position: absolute;
  font-size: 50px;
  color: rgb(193, 193, 193);
  transition: 0.2s;
  text-shadow: 1px 1px 1px black;
}
.cardpage:hover .card-page-h3 {
  position: absolute;
  font-size: 50px;
  color: rgb(227, 227, 227);
  text-shadow: 1px 1px 10px black;
}
/* 卡片圖片控制 */
.card-page img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
