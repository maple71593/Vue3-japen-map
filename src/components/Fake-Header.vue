<template>
  <div class="fake"></div>
</template>
<style lang="scss" scoped>
@mixin pad {
  @media (max-width: 1000px) {
    @content;
  }
}
@mixin phone {
  @media (max-width: 400px) {
    @content;
  }
}
.fake {
  background-color: rgb(135, 214, 214);
  width: 100vw;
  height: 100px;
  @include phone {
    height: 50px;
  }
}
</style>
