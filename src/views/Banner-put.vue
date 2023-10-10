<script setup>
import { ref } from 'vue'
const ChangePageNum = ref(0)
const BackPic = ref([
  '../assets/pt1.jpg',
  '../assets/pt2.jpg',
  '../assets/pt3.jpg',
  '../assets/pt4.jpg'
])
const changeIMG = (item) => {
  const url = new URL(item, import.meta.url).href
  return url
}
const ChangePage = () => {
  setInterval(() => {
    ChangePageNum.value !== BackPic.value.length - 1
      ? ChangePageNum.value++
      : (ChangePageNum.value = 0)
  }, 5000)
}
ChangePage()
</script>

<template>
  <div class="banner">
    <transition-group>
      <div
        ref="formRef"
        v-for="(item, index) in BackPic"
        :key="index"
        class="Img-Box"
        v-show="index === ChangePageNum"
      >
        <img class="ImgBoxIMG" :src="changeIMG(item)" alt="" />
      </div>
    </transition-group>
    <div class="test-box">
      <h1>有多久沒出門旅行</h1>
      <h2>現在就來趟旅程吧</h2>
      <button class="btn">開始旅程</button>
    </div>
  </div>
</template>
<style>
/* banner 輪播圖*/
.banner {
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
  width: 100%;
  min-width: 380px;
  height: 100%;
  position: absolute;
}
.test-box {
  width: 50%;
  font-size: 30px;
  color: rgb(117, 117, 117);
  top: 10%;
  left: 10%;
  position: absolute;
  background: transparent;
  color: white;
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
