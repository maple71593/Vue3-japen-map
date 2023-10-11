<template>
  <div class="header">
    <h4 class="logo">我是log</h4>
    <ul>
      <li><a href="#">加入我們</a></li>
      <li><a href="#">精選旅程</a></li>
      <li><a href="#">購物車</a></li>
      <li><a href="#">會員中心</a></li>
    </ul>
  </div>
</template>
<style>
/* header頁首*/

.header {
  height: 100px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  background: linear-gradient(to bottom, #474747, transparent);
  top: 0;
  width: 100%;
  z-index: 100;
}

.logo {
  width: 300px;
  height: 50px;
  text-align: center;
  font-size: 50px;
  color: rgb(255, 255, 255);
}

.header ul li a {
  font-size: 25px;
  padding-right: 10px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  border-right: 1px solid red;
}

.header ul {
  vertical-align: middle;
  display: flex;
}
.header ul li {
  list-style-type: none;
  padding: 10px;
  margin: auto;
}
</style>
