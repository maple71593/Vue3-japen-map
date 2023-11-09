<script setup>
import { ref, defineProps, computed } from 'vue'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
const CardPages = ref([])
const uesCardPages = async () => {
  const db = useFirestore()
  const limitedQuery = query(collection(db, 'Plan'), limit(8))
  const querySnapshot = await getDocs(limitedQuery)
  querySnapshot.forEach((doc) => {
    CardPages.value.push(doc.data())
  })
}
//判斷父組件傳遞滾動data是否達到指定值
uesCardPages()
const { scrollRef } = defineProps(['scrollRef'])
const BannerBar = computed(() => scrollRef.scrollRef > 800)
const noActivated = computed(() => scrollRef.scrollRef > 900)
</script>

<template>
  <div class="content2">
    <div class="content2-p" :class="{ contentp: BannerBar }">想去哪裡</div>
    <div class="content2-after" :class="{ contentafter: BannerBar }"></div>
    <div class="card2">
      <router-link
        v-for="(item, index) in CardPages"
        :to="{ path: '/list-index', query: { id: item.id } }"
        :key="index"
      >
        <div class="card2-page" :class="{ cardpage: noActivated }">
          <h3 class="card2-page-h3">{{ item.location }}</h3>
          <img :src="item.img" alt="" />
          <h4 class="card2-page-h4-title">{{ item.title }}</h4>
        </div>
      </router-link>
    </div>
  </div>
</template>
<style>
.content2 {
  width: 1200px;
  margin: 30px auto 100px auto;
  padding-top: 30px;
  text-align: left;
  border-radius: 30px;
}

/* 控制文字標題 */
.content2-p {
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
.content2-after {
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
.card2 {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
}
/* 卡片控制 */
.card2-page {
  width: 280px;
  margin: 10px;
  font-size: 20px;
  text-shadow: 10px;
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
.card2-page-h3 {
  position: absolute;
  font-size: 50px;
  color: rgb(193, 193, 193);
  transition: 0.2s;
  text-shadow: 1px 1px 1px black;
}
.card2-page-h4-title {
  position: absolute;
  bottom: 0;
  color: aliceblue;
  background-color: rgba(0, 0, 0, 0.29);
}
.cardpage:hover .card2-page-h3 {
  position: absolute;
  font-size: 50px;
  color: rgb(227, 227, 227);
  text-shadow: 1px 1px 10px black;
}
/* 卡片圖片控制 */
.card2-page img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
