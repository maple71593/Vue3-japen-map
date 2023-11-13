<template>
  <div class="fake"></div>
</template>
<style lang="scss" scoped>
.fake {
  background-color: rgb(135, 214, 214);
  width: 100vw;
  height: 100px;
  @include phone {
    height: 50px;
  }
}
</style>
