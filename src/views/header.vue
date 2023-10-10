<template>
  <div class="header">
    <div class="logo">我是log</div>
    <ul>
      <li><a href="#">觀看我</a></li>
      <li><a href="#">還沒決定</a></li>
      <li><a href="#">還沒決定</a></li>
      <li><a href="#">還沒決定</a></li>
    </ul>
  </div>
</template>
<style>
/* header頁首*/

.header {
  /* max-width: 1980px; */
  display: flex;
  justify-content: space-around;
  background-color: aliceblue;
}

.logo {
  width: 300px;
  height: 100px;
  background-color: #ffffff;
  text-align: center;
  font-size: 50px;
  color: rgb(112, 112, 112);
}

.header a img {
  width: 200px;
  height: 100px;
}

.header-input {
  display: flex;
  margin: auto;
}

.header-input input {
  width: 300px;
  height: 30px;
  padding-left: 10px;
  border-right: 0px;
  font-size: 15px;
  border-radius: 10px 0px 0px 10px;
}

.header-input button {
  width: 60px;
  height: 33px;
  font-size: 15px;
  background-color: rgb(198, 198, 198);
  color: aliceblue;
  border-radius: 0px 10px 10px 0px;
  vertical-align: middle;
}

.header-input button:hover {
  width: 60px;
  height: 33px;
  font-size: 15px;
  background-color: rgb(77, 77, 77);
  color: rgb(186, 187, 187);
  border-radius: 0px 10px 10px 0px;
  vertical-align: middle;
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

.header ul li a {
  font-size: 25px;
  padding-right: 10px;
  text-decoration: none;
  color: rgb(28, 28, 28);
  border-right: 1px solid red;
}
</style>
