<script setup>
import { useUserStore } from '../../stores'
const useStore = useUserStore()
</script>
<template>
  <div class="user-center">
    <div>
      <h1>會員中心</h1>
    </div>
    <div v-if="useStore.EmailVer">
      <img src="../../../public/envelope.png" alt="" />
      <h3>Email認證用戶</h3>
    </div>
    <div v-else>
      <img src="../../../public/cross-circle.png" alt="" />
      <h3>Email尚未認證</h3>
      <button class="btn3">現在馬上認證！</button>
    </div>
    <div>
      <p>email : {{ useStore.email }}</p>
      <p>姓名 : {{ useStore.username }}</p>
      <p>電話 : {{ useStore.phoneNum }}功能停用</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.user-center {
  box-sizing: border-box;

  h1 {
    color: rgb(0, 50, 50);
  }
  p {
    font-size: 20px;
    padding: 10px;
    color: rgb(32, 32, 32);
  }
  img {
    width: 18px;
    vertical-align: text-top;
  }
  h3 {
    display: inline;
    margin: 0px 10px;
    color: rgb(57, 57, 57);
  }
  > div:nth-child(1) {
    background-color: aliceblue;
    padding: 10px;
    border-radius: 0px 10px 0px 0px;
  }
  > div:nth-child(2) {
    background-color: rgb(188, 213, 235);
    padding: 10px;
  }
}
</style>
