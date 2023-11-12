<script setup>
import { useComStore } from '@/stores'
const useCom = useComStore()
</script>
<template>
  <loading
    v-model:active="useCom.isLoading"
    :can-cancel="true"
    :lock-scroll="true"
    opacity="1"
    transition="custom-fade"
  >
  </loading>
</template>

<style type="text/css">
@keyframes custom-fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.custom-fade-enter-active {
  animation: custom-fade 1s;
}
.custom-fade-leave-active {
  opacity: 0;
}
@keyframes ldio-6bb837a511t {
  0% {
    opacity: 1;
    backface-visibility: hidden;
    transform: translateZ(0) scale(1.5, 1.5);
  }
  100% {
    opacity: 0;
    backface-visibility: hidden;
    transform: translateZ(0) scale(1, 1);
  }
}
</style>
