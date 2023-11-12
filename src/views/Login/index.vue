<script setup></script>
<template>
  <div class="Login-page">
    <Loading-page></Loading-page>
    <MessageBox></MessageBox>
    <transition appear>
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.Login-page {
  @extend %container-100;
}
</style>
