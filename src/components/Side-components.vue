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
    <div></div>
    <div></div>
    <div class="ToTop" @click="Totop">Top</div>
  </div>
</template>
<style>
.side-pom {
  margin: 2%;
  position: fixed;
  bottom: 0;
  right: 0;
}
.ToTop {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: radial-gradient(circle, rgb(155, 155, 152), rgb(88, 95, 88));
  cursor: pointer;
  border-radius: 50%;
}
</style>
