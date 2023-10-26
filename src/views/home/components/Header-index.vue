<script setup>
import { computed, defineProps, ref } from 'vue'
import { useUserStore } from '../../../stores'
import { useRouter } from 'vue-router'
// 滾輪監控
const scrollRef = defineProps(['scrollRef'])
const show = computed(() => scrollRef.scrollRef > 800)
//隱藏會員div
const showUser = ref(false)
const changeshow = () => {
  showUser.value = false
  return false
}
// 路由跳轉
const router = useRouter()
const toLogin = () => {
  router.push('/login')
}
// 獲取用戶資訊
const userStore = useUserStore()
console.log(userStore.userpic, userStore.username, userStore.email)
</script>
<template>
  <div class="header" :class="{ headREer: show }">
    <h4 class="logo" @click="$router.push('/')">宏宏旅行社</h4>
    <ul>
      <li>
        <router-link :to="'/home'">旅遊諮詢</router-link>
      </li>
      <li><router-link :to="'/home'">精選旅程</router-link></li>
      <li><router-link :to="'/home'">購物車</router-link></li>
    </ul>
    <div v-if="!userStore.token">
      <button @click="toLogin" class="btn">會員登入</button>
    </div>
    <div
      class="side-userBox"
      v-else
      :class="{ SideUserBox: show ? changeshow() : showUser }"
      @click="showUser = !showUser"
    >
      <div class="user-show">
        <img src="../../../../public/paidasun.jpeg" alt="" />
      </div>
      <ul class="user-side-box">
        <li>
          <router-link :to="'/user/center'"
            ><img
              src="../../../../public/user.png"
              alt=""
            />會員中心</router-link
          >
        </li>
        <li>
          <router-link :to="'/user/passwordChange'"
            ><img
              src="../../../../public/password.png"
              alt=""
            />修改密碼</router-link
          >
        </li>
        <li>
          <router-link :to="'/user/dataChange'"
            ><img
              src="../../../../public/userdata.png"
              alt=""
            />修改會員資料</router-link
          >
        </li>
        <li>
          <router-link :to="'/home'"
            ><img
              src="../../../../public/loginout.png"
              alt=""
            />登出</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* header頁首*/

.header {
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  background: linear-gradient(to bottom, #474747, transparent);
  top: 0;
  width: 100%;
  z-index: 100;
  transition: 1.5s ease-in-out;
  > ul {
    vertical-align: middle;
    display: flex;
    > li {
      list-style-type: none;
      padding: 10px;
      margin: auto;
      > a {
        font-size: 25px;
        padding-right: 10px;
        text-decoration: none;
        text-align: center;
        color: rgb(255, 255, 255);
        position: relative;
      }
      > a:hover {
        font-size: 25px;
        padding-right: 10px;
        text-decoration: none;
        text-align: center;
        color: rgb(255, 255, 255);
        text-shadow: 5px 5px 5px rgb(0, 0, 0);
        position: relative;
      }
      > a:after {
        content: '';
        width: 0%;
        height: 0;
        background-color: red;
        font-size: 25px;
        padding-right: 10px;
        text-decoration: none;
        color: rgb(255, 255, 255);
        bottom: -10px;
        left: 0;
        position: absolute;
        transition: 0.5s;
      }
      > a:hover::after {
        content: '';
        width: 80%;
        height: 2px;
        background-color: red;
        font-size: 25px;

        padding-right: 10px;
        text-decoration: none;
        color: rgb(255, 255, 255);
        bottom: -10px;
        left: 0;
        position: absolute;
      }
    }
  }
}
.headREer {
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  background: linear-gradient(to bottom, #474747, transparent);
  top: -100px;
  width: 100%;
  z-index: 100;
}
.logo {
  width: 300px;
  height: 50px;
  text-align: center;
  font-size: 50px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.side-userBox {
  width: 15vw;
  transition: 0.2s;
  border-radius: 10px;
  box-sizing: border-box;
  > div {
    width: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 10px;
    border: 2px solid rgb(1, 101, 209);
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  ul {
    opacity: 0;
    li {
      margin: 10px;
      font-size: 0;
    }
  }
}
.SideUserBox {
  width: 15vw;
  background-color: rgb(123, 123, 123);
  border-radius: 10px;
  border: 2px solid rebeccapurple;
  box-sizing: border-box;
  > div {
    width: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 10px;
    border: 2px solid rebeccapurple;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  ul {
    opacity: 1;
    li {
      margin-top: 20px;
      font-size: 20px;
      list-style: none;
      padding: 10px;
      a {
        color: antiquewhite;
      }
      img {
        margin-right: 10px;
        width: 20px;
      }
    }
    li:hover {
      color: rgb(255, 255, 255);
      padding: 10px;
      text-shadow: 1px 1px 3px rgb(0, 0, 0);
      background-color: antiquewhite;
      border-radius: 10px;
    }
  }
}
</style>
