<script setup>
import { ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
const ChangePageNum = ref(0)
const pic = ref([])
const db = useFirestore()
const useBannerBcak = async () => {
  const querySnapshot = await getDocs(collection(db, 'BannerPic'))
  querySnapshot.forEach((doc) => {
    pic.value.push(doc.data())
  })
  setInterval(() => {
    ChangePageNum.value !== pic.value.length - 1
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
        v-for="(item, index) in pic"
        :key="index"
        class="Img-Box"
        v-show="index === ChangePageNum"
      >
        <img class="ImgBoxIMG" :src="item.img" alt="" />
      </div>
    </transition-group>
    <div class="gotravel">
      <h1>有多久沒出門旅行</h1>
      <h2>不如現在就走</h2>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* banner 輪播圖*/
.banner-change {
  width: 100vw;
  height: 800px;
  box-sizing: border-box;
  position: relative;
  top: -75px;
  z-index: -1;
  @include phone {
    top: -270px;
    height: 100vh;
  }
}
.Img-Box {
  @include phone {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
}
.ImgBoxIMG {
  width: 100vw;
  height: 100%;
  position: absolute;
  @include phone {
    max-width: 100%;
    max-height: 100%;
    bottom: 0;
    overflow: hidden;
  }
}
.gotravel {
  color: #fff;
  font-size: 40px;
  top: 35%;
  left: 10%;
  position: absolute;
  @include phone {
    top: 40%;
  }
  h1 {
    @include phone {
      font-size: 30px;
    }
  }
  h2 {
    @include phone {
      font-size: 25px;
    }
  }
}
.test-box {
  top: 35%;
  left: 10%;
  position: absolute;
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
</style>
