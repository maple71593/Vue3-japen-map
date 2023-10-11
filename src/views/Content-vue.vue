<script setup>
import { ref, onMounted } from 'vue'
const cardPages = ref([
  {
    title: '東京',
    imageSrc: '../assets/page1.jpg'
  },
  {
    title: '大阪',
    imageSrc: '../assets/page2.jpg'
  },
  {
    title: '京都',
    imageSrc: '../assets/page3.jpg'
  },
  {
    title: '神戶',
    imageSrc: '../assets/page4.jpg'
  },
  {
    title: '福岡',
    imageSrc: '../assets/page5.jpg'
  },
  {
    title: '北海道',
    imageSrc: '../assets/page6.jpg'
  },
  {
    title: '青森',
    imageSrc: '../assets/page7.jpg'
  },
  {
    title: '廣島',
    imageSrc: '../assets/page8.jpg'
  },
  {
    title: '鹿兒島',
    imageSrc: '../assets/page9.jpeg'
  },
  {
    title: '輕井澤',
    imageSrc: '../assets/page10.jpg'
  },
  {
    title: '金澤',
    imageSrc: '../assets/page11.jpg'
  },
  {
    title: '沖繩',
    imageSrc: '../assets/page12.jpg'
  }
])
//獲取本地資訊圖片
const changeIMG = (item) => {
  const url = new URL(item, import.meta.url).href
  return url
}
const pro = defineProps({ value: String })
console.log(pro)
const noActivated = ref(false)
const BannerBar = ref(false)
const handleScroll = () => {
  const scrollY = window.scrollY
  console.log(scrollY)
  scrollY > 250 ? (BannerBar.value = true) : BannerBar.value
  scrollY > 350 ? (noActivated.value = true) : noActivated.value
}
handleScroll()
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="content">
    <div class="content-p" :class="{ contentp: BannerBar }">精選旅程</div>
    <div class="content-after" :class="{ contentafter: BannerBar }"></div>
    <div class="card">
      <div
        class="card-page"
        :class="{ cardpage: noActivated }"
        v-for="(item, index) in cardPages"
        :key="index"
      >
        <h3 class="card-page-h3">{{ item.title }}</h3>
        <img :src="changeIMG(item.imageSrc)" alt="" />
      </div>
    </div>
  </div>
</template>
<style>
.content {
  width: 1200px;
  margin-top: 30px;
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
  background-color: rgb(198, 198, 198);
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
  background-color: rgb(198, 198, 198);
  border-radius: 10px;
  bottom: 7px;
  right: 5px;
  position: relative;
}
/* 卡片標題文字 */
.card-page-h3 {
  position: absolute;
  font-size: 50px;
  color: rgb(223, 223, 223);
}
/* 卡片圖片控制 */
.card-page img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
