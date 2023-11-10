<script setup>
import { useComStore } from '../stores'
const useCom = useComStore()
</script>
<template>
  <div
    class="Msg-Box"
    :class="{
      MsgBoxErr: useCom.MsgType === 1,
      MsgBoxExc: useCom.MsgType === 2,
      MsgBoxSuc: useCom.MsgType === 3
    }"
  >
    <img
      class="ComImg"
      src="../../public/cross-circle.png"
      v-show="useCom.MsgType === 1"
      alt=""
    />
    <img
      class="ComImg"
      src="../../public/envelope.png"
      v-show="useCom.MsgType === 3"
      alt=""
    />
    <img
      class="ComImg"
      src="../../public/exclamation.png"
      v-show="useCom.MsgType === 2"
      alt=""
    />
    <h4 class="ComH4">{{ useCom.Message }}</h4>
    <button class="ComBtn" @click="useCom.MessageClose()">x</button>
  </div>
</template>
<style scoped>
.Msg-Box {
  width: 300px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  z-index: 5;
  border-radius: 25px;
  border: 2px solid white;
  transition: 1s;
}
.MsgBoxSuc {
  width: 300px;
  height: 30px;
  display: flex;
  background-color: rgb(127, 255, 104);
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 5vh;
  margin: auto;
  opacity: 1;
  z-index: 5;
  border-radius: 25px;
  border: 2px solid white;
}
.MsgBoxErr {
  width: 300px;
  height: 30px;
  display: flex;
  background-color: rgb(255, 99, 99);
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 5vh;
  margin: auto;
  opacity: 1;
  z-index: 5;
  border-radius: 25px;
  border: 2px solid rgb(255, 174, 174);
}
.MsgBoxExc {
  width: 300px;
  height: 30px;
  display: flex;
  background-color: rgb(255, 247, 99);
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 5vh;
  margin: auto;
  opacity: 1;
  z-index: 5;
  border-radius: 25px;
  border: 2px solid rgb(228, 252, 94);
}
.ComBtn {
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: rgb(255, 255, 255);
  border: 3px solid rgb(225, 225, 225);
  margin-right: 10px;
}
.ComH4 {
  margin-left: 20px;
  color: rgb(249, 249, 249);
  text-shadow: 1px 1px 1px rgb(126, 126, 126);
}
.ComImg {
  margin-left: 10px;
  width: 15px;
  height: 15px;
}
</style>
