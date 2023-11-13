<script setup>
const Totop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
<template>
  <div class="side-pom">
    <div class="ToTop" @click="Totop">
      <img src="./../../public/exit.png" alt="" />
    </div>
    <div class="ToTop">
      <img src="./../../public/line.png" alt="" />
    </div>
    <div class="ToTop">
      <img src="./../../public/facebook.png" alt="" />
    </div>
    <div class="ToTop">
      <img src="./../../public/facebook-messenger.png" alt="" />
    </div>
    <div class="ToTop">
      <img src="./../../public/instagram.png" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.side-pom {
  margin: 2%;
  position: fixed;
  bottom: 0;
  right: 0;
}
.ToTop {
  width: 40px;
  height: 40px;
  margin: 10px;
  text-align: center;
  background-color: whitesmoke;
  cursor: pointer;
  border-radius: 50%;
  @include phone {
    width: 30px;
    height: 30px;
  }
  img {
    width: 40px;
    height: 40px;
    @include phone {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
