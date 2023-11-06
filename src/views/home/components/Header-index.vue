<script setup>
import { computed, defineProps, ref } from 'vue'
import { useUserStore, useComStore } from '../../../stores'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const userStore = useUserStore()
const useCom = useComStore()
const router = useRouter()
const auth = useFirebaseAuth()
const SignOut = () => {
  signOut(auth)
    .then(() => {
      userStore.SignOutClsData()
      useCom.MessageBox('已登出', 3)
      setTimeout(() => {
        router.replace('/home')
      }, 2000)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
// 滾輪監控
const scrollRef = defineProps(['scrollRef'])
const show = computed(() => scrollRef.scrollRef > 800)
//隱藏會員div
const showUser = ref(false)
const changeshow = () => {
  showUser.value = false
  return false
}
</script>
<template>
  <div class="header" :class="{ headREer: show }">
    <div class="logo">
      <h4 @click="router.push('/')">宏宏旅行社</h4>
    </div>
    <ul>
      <li><router-link :to="'/Choice'">精選旅程</router-link></li>
      <li>
        <router-link :to="'/Connection'">旅遊諮詢</router-link>
      </li>
      <li><router-link :to="'/Order'">訂單查詢</router-link></li>
    </ul>
    <div class="Login-btn" v-if="!userStore.token">
      <button @click="router.push('/Login/LoginPage')" class="btn">
        會員登入
      </button>
    </div>
    <div
      class="side-userBox"
      v-else
      :class="{ SideUserBox: show ? changeshow() : showUser }"
      @click="showUser = !showUser"
    >
      <div>
        <img
          :src="userStore.userpic ? userStore.userpic : userStore.noUserpic"
          alt=""
        />
      </div>
      <h3>歡迎回來，{{ userStore.username }}</h3>
      <ul>
        <li>
          <router-link :to="'/user/center'"
            ><img
              src="../../../../public/user.png"
              alt=""
            />會員中心</router-link
          >
        </li>
        <li>
          <router-link :to="'/user/dataChange'"
            ><img
              src="../../../../public/userdata.png"
              alt=""
            />修改個人資訊</router-link
          >
        </li>
        <li>
          <router-link :to="'/user/ChangePic'"
            ><img
              src="../../../../public/picture.png"
              alt=""
            />修改大頭貼</router-link
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
          <router-link @click="SignOut" :to="'/home'"
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
  margin: auto;
  height: 100px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  background: linear-gradient(to bottom, #474747, transparent);
  top: 0;
  width: 100%;
  z-index: 3;
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
  margin: auto;
  height: 100px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  background: linear-gradient(to bottom, #474747, transparent);
  top: -100px;
  width: 100%;
  z-index: 100;
}
.logo {
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  // text-align: center;
  font-size: 50px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}
.Login-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.side-userBox {
  width: 15vw;
  height: 100%;
  transition: 0.2s;
  border-radius: 10px;
  box-sizing: border-box;
  h3 {
    opacity: 0;
    display: none;
  }

  > div {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 10px;
    border: 2px solid rgb(1, 101, 209);
    > img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  ul {
    opacity: 0;
    display: none;
  }
}
.SideUserBox {
  width: 300px;
  height: 500px;
  background-color: rgb(218, 218, 218);
  border-radius: 10px;
  border: 2px solid rgb(255, 255, 255);
  box-sizing: border-box;
  h3 {
    opacity: 1;
    display: block;
    color: #474747;
    margin-top: 10px;
    text-align: center;
    padding: 10px;
    border: 1px solid rgb(151, 151, 151);
    font-size: 20px;
  }
  > div:nth-child(1) {
    margin: auto;
    width: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 10px;
    border: 2px solid rgb(255, 255, 255);
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  ul {
    opacity: 1;
    display: block;
    li {
      display: block;
      margin: 10px;
      font-size: 0;
      a {
        display: block;
        color: #757575;
        margin-top: 20px;
        font-size: 20px;
        list-style: none;
        padding: 10px;
      }
      a:hover {
        color: rgb(255, 255, 255);
        padding: 10px;
        text-shadow: 1px 1px 3px rgb(138, 138, 138);
        background-color: antiquewhite;
        border-radius: 10px;
      }
      img {
        margin-right: 10px;
        width: 20px;
      }
    }
  }
}
</style>
