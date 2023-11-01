<script setup>
import { useComStore } from '../stores'
const useCom = useComStore()
</script>
<template>
  <div class="Msg-Box" :class="{ MsgBoxErr: (useCom.MsgType = err) }">
    <img
      class="ComImg"
      src="../../public/cross-circle.png"
      v-if="(useCom.MsgType = err)"
      alt=""
    />
    <img class="ComImg" src="../../public/envelope.png" alt="" v-else />
    <h3 class="ComH3">{{ useCom.Message }}1231321</h3>
    <button class="ComBtn" @click="useCom.MessageClose()">x</button>
  </div>
</template>
<style scoped>
.Msg-Box {
  width: 250px;
  height: 30px;
  display: flex;
  background-color: rgb(127, 255, 104);
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 5;
  border-radius: 25px;
  border: 2px solid white;
}
.MsgBoxErr {
  width: 250px;
  height: 30px;
  display: flex;
  background-color: rgb(255, 99, 99);
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 5;
  border-radius: 25px;
  border: 2px solid white;
}
.ComBtn {
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: rgb(215, 215, 215);
  border: 3px solid rgb(202, 202, 202);
  margin-right: 10px;
}
.ComH3 {
  margin-left: 20px;
  color: rgb(59, 59, 59);
}
.ComImg {
  margin-left: 10px;
  width: 15px;
  height: 15px;
}
</style>
