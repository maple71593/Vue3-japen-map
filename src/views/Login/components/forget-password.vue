<script setup>
import { useComStore } from '@/stores'
const useCom = useComStore()
useCom.MessageBox('asd123', 3)
</script>
<template>
  <div>電子郵件已發送，請到信箱接收</div>
</template>
<style lang="scss" scoped></style>
