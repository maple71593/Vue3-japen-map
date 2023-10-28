<script setup>
import fake from '@/components/fake-Header.vue'
</script>
<template>
  <fake></fake>
  <div class="userCenter">
    <div>
      <ul>
        <li><router-link to="/user/center">會員中心</router-link></li>
        <li>
          <router-link to="/user/dataChange">修改個人資訊</router-link>
        </li>
        <li>
          <router-link to="/user/ChangePic">修改大頭照</router-link>
        </li>
        <li><router-link to="/user/passwordChange">修改密碼</router-link></li>
      </ul>
    </div>
    <div><router-view></router-view></div>
  </div>
</template>
<style lang="scss" scoped>
.router-link-active {
  color: rgb(241, 134, 134);
}
.userCenter {
  margin-top: 30px;
  width: 80vw;
  background-color: rgb(167, 182, 182);
  display: flex;
  border-radius: 25px;
  > div:nth-child(1) {
    width: 25%;
    height: 100%;
    border-radius: 25px 0px 0px 25px;
    background-color: #3d816b;
    ul {
      li {
        font-size: 30px;
        text-align: center;
        list-style: none;
        margin: 30px;
        position: relative;
      }
      li::after:hover {
        content: '';
        width: 100%;
        height: 1px;
        background-color: rgb(225, 106, 106);
        right: 0;
        bottom: -10px;
        position: absolute;
      }

      li:hover {
        font-size: 30px;
        list-style: none;
        margin: 30px;
      }
    }
  }
  > div:nth-child(2) {
    width: 75%;
    height: 100%;
  }
}
</style>
