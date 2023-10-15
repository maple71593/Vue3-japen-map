<script setup>
import { ref } from 'vue'
import { GetBannerBcak } from '@/api/home.js'
import Calendar from '@/components/Calendar-index.vue'
const ChangePageNum = ref(0)
const show = ref(false)
const Pic = ref()
const useBannerBcak = async () => {
  const { data } = await GetBannerBcak()
  Pic.value = data
  setInterval(() => {
    ChangePageNum.value !== Pic.value.length - 1
      ? ChangePageNum.value++
      : (ChangePageNum.value = 0)
  }, 5000)
}
useBannerBcak()
</script>

<template>
  <div class="banner-change">
    <transition-group>
      <div
        ref="formRef"
        v-for="(item, index) in Pic"
        :key="index"
        class="Img-Box"
        v-show="index === ChangePageNum"
      >
        <img class="ImgBoxIMG" :src="item.img" alt="" />
      </div>
    </transition-group>
    <div class="gotravel" v-if="show">
      <h1>有多久沒出門旅行</h1>
      <h2>現在就來趟旅程吧</h2>
      <button @click="show = !show" class="btn">開始旅程</button>
    </div>
    <div class="test-box" v-else>
      <Calendar></Calendar>
      <button @click="show = !show" class="btn">再想想</button>
    </div>
  </div>
</template>
<style>
/* banner 輪播圖*/
.banner-change {
  width: 100%;
  height: 800px;
  min-width: 380px;
  background-color: rgb(131, 131, 131);
  box-sizing: border-box;
  position: relative;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
.ImgBoxIMG {
  width: 100vw;
  min-width: 380px;
  height: 100%;
  position: absolute;
}
.gotravel {
  color: #fff;
  font-size: 100px;
}
.test-box {
  top: 35%;
  left: 10%;
  position: absolute;
}
.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #3498db;
  color: #fff;
  border: 2px solid #2980b9;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    transform 0.3s;
}

.btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}
</style>
