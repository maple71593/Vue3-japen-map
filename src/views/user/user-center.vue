<script setup>
import { useUserStore } from '../../stores'
const useStore = useUserStore()
const { username, phoneNum, email } = useStore
</script>
<template>
  <div class="user-center">
    <p>姓名 : {{ username }}</p>
    <p>email : {{ email }}</p>
    <p>電話 : {{ phoneNum }}</p>
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
