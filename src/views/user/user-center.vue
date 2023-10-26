<script setup>
import { useUserStore } from '../../stores'
const useStore = useUserStore()
</script>
<template>
  <div class="user-center">
    <p>姓名 : {{ useStore.dispalyname }}</p>
    <p>email : {{ useStore.email }}</p>
    <p>身分證字號 : {{ 123 }}</p>
    <p>住址 : {{ 456 }}</p>
    <p>電話 : {{ 789 }}</p>
  </div>
</template>
<style lang="scss" scoped>
.user-center {
  text-align: start;
  p {
    font-size: 20px;
    padding: 10px;
  }
}
</style>
