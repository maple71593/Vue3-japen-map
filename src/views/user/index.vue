<script setup></script>
<template>
  <MessageBox></MessageBox>
  <div class="userCenter">
    <div>
      <ul>
        <li>
          <router-link to="/user/center" class="custom-link"
            ><img src="../../../public/user.png" alt="" />會員中心</router-link
          >
        </li>
        <li>
          <router-link to="/user/dataChange" class="custom-link"
            ><img
              src="../../../public/userdata.png"
              alt=""
            />修改個人資訊</router-link
          >
        </li>
        <li>
          <router-link to="/user/ChangePic" class="custom-link"
            ><img
              src="../../../public/picture.png"
              alt=""
            />修改大頭照</router-link
          >
        </li>
        <li>
          <router-link to="/user/passwordChange" class="custom-link"
            ><img
              src="../../../public/password.png"
              alt=""
            />修改密碼</router-link
          >
        </li>
      </ul>
    </div>
    <div><router-view></router-view></div>
  </div>
</template>
<style lang="scss" scoped>
.custom-link.router-link-active {
  color: rgb(232, 171, 171);
  font-size: 28px;
  padding: 10px;
  transition: 0.2s;
}
.custom-link {
  color: #6c4949;
}
.custom-link:hover {
  color: #ffc1c1;
}
.custom-link::before {
  content: '';
  width: 80%;
  height: 2px;
  bottom: -15px;
  left: 10%;
  opacity: 0;
  background-color: rgb(253, 253, 253);
  position: absolute;
  transition: 0.5s;
}
.custom-link:hover::before {
  content: '';
  width: 80%;
  height: 2px;
  left: 10%;
  bottom: -10px;
  opacity: 1;
  background-color: rgb(245, 245, 245);
  position: absolute;
}
.userCenter {
  margin: auto;
  margin-top: 30px;
  width: 80vw;
  background-color: rgb(167, 182, 182);
  display: flex;
  border-radius: 25px;
  img {
    width: 26px;
    margin-right: 10px;
    vertical-align: middle;
  }
  > div:nth-child(1) {
    width: 30%;
    border-radius: 25px 0px 0px 25px;
    background-color: #3d816b;
    ul {
      position: relative;
      li {
        font-size: 25px;
        // text-align: center;
        list-style: none;
        margin: 30px;
        position: relative;
      }
    }
  }
  > div:nth-child(2) {
    width: 70%;
    height: 100%;
  }
}
</style>
