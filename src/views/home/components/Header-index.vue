<script setup>
import { computed, ref } from 'vue'
import { useUserStore, useComStore } from '../../../stores'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { useFirebaseAuth, useFirestore } from 'vuefire'
import { collection, query, onSnapshot } from 'firebase/firestore'
const db = useFirestore()
const showMenu = ref(false)
const useStore = useUserStore()
const useCom = useComStore()
const router = useRouter()
const auth = useFirebaseAuth()
if (useStore.token) {
  const q = query(collection(db, `/UserData/${useStore.email}/cart`))
  onSnapshot(q, (querySnapshot) => {
    let userCart = []
    let total = []
    querySnapshot.forEach((doc) => {
      userCart.push(doc.data())
      total.push(doc.data().people * doc.data().amount)
    })
    useStore.UserCart = userCart
    useStore.CartNum = userCart.length
    useStore.Total = total.reduce((total, num) => {
      return total + num
    })
  })
}
const SignOut = async () => {
  useCom.isLoading = true
  showMenu.value = false
  await signOut(auth)
    .then(() => {
      useStore.SignOutClsData()
      setTimeout(() => {
        useCom.isLoading = false
        useCom.MessageBox('已登出', 3)
        router.replace('/')
      }, 1000)
    })
    .catch((error) => {
      setTimeout(() => {
        useCom.isLoading = false
      }, 1000)
      console.log(error.code)
    })
}
// 滾輪監控
const show = computed(() => useStore.scrollRef > 800)
//隱藏會員div
const showUser = ref(false)
const changeshow = () => {
  showUser.value = false
  return false
}
</script>
<template>
  <Loading-page></Loading-page>
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
      <li>
        <router-link :to="'/Cart'">購物車 </router-link>
      </li>
      <p v-show="useStore.CartNum">{{ useStore.CartNum }}</p>
    </ul>

    <div class="Login-btn" v-if="!useStore.token">
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
          :src="useStore.userpic ? useStore.userpic : useStore.noUserpic"
          alt=""
        />
      </div>
      <h3>歡迎回來，{{ useStore.username }}</h3>
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
    <div class="menu">
      <img
        @click="showMenu = !showMenu"
        src="./../../../../public/menu-burger.png"
        alt=""
      />
    </div>
    <div class="menu-list" v-show="showMenu">
      <ul>
        <li v-if="!useStore.token">
          <router-link
            :to="{ path: '/Login/LoginPage' }"
            @click="showMenu = false"
            >還沒登入嗎</router-link
          >
        </li>
        <li v-else>歡迎回來{{ useStore.username }}</li>
        <li>
          <router-link :to="'/Choice'" @click="showMenu = false"
            ><img
              src="../../../../public/globe.png"
              alt=""
            />精選旅程</router-link
          >
        </li>
        <li>
          <router-link :to="'/Connection'" @click="showMenu = false"
            ><img
              src="../../../../public/comment.png"
              alt=""
            />旅遊諮詢</router-link
          >
        </li>
        <li>
          <router-link :to="'/Order'" @click="showMenu = false"
            ><img
              src="../../../../public/search.png"
              alt=""
            />訂單查詢</router-link
          >
        </li>
        <li>
          <router-link :to="'/Cart'" @click="showMenu = false"
            ><img
              src="../../../../public/shopping-cart.png"
              alt=""
            />購物車</router-link
          >
        </li>
      </ul>
      <ul v-show="useStore.token">
        <li>
          <router-link :to="'/user/center'" @click="showMenu = false"
            ><img
              src="../../../../public/user.png"
              alt=""
            />會員中心</router-link
          >
        </li>
        <li>
          <router-link :to="'/user/dataChange'" @click="showMenu = false"
            ><img
              src="../../../../public/userdata.png"
              alt=""
            />修改個人資訊</router-link
          >
        </li>
        <li>
          <router-link :to="'/user/ChangePic'" @click="showMenu = false"
            ><img
              src="../../../../public/picture.png"
              alt=""
            />修改大頭貼</router-link
          >
        </li>
        <li>
          <router-link :to="'/user/passwordChange'" @click="showMenu = false"
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
  width: 100vw;
  z-index: 3;
  transition: 1s ease-in-out;
  @include phone {
    height: 50px;
    justify-content: space-between;
  }
  button {
    @include phone {
      display: none;
    }
  }
  > ul {
    vertical-align: middle;
    display: flex;
    @include phone {
      display: none;
    }
    p {
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      color: aliceblue;
      background-color: red;
      border: 1px solid white;
      padding: 3px;
      top: 20px;
      left: -25px;
      border-radius: 25px;
      font-size: 15px;
      position: relative;
    }

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
        @include phone {
          font-size: 10px;
        }
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
.menu {
  display: none;
  @include phone {
    display: block;
    background-color: #62d17e;
    padding: 0px 5px;
    border-radius: 10px;
  }
  img {
    width: 40px;
    margin-top: 5px;
  }
}
.menu-list {
  top: 50px;
  left: 0px;
  position: absolute;
  background-color: #62d17e;
  border-radius: 10px 0px 20px 20px;
  width: 100vw;
  img {
    margin: 0px 10px;
  }
  ul {
    list-style: none;
    li {
      margin: 20px;
      font-size: 30px;
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
  font-size: 50px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  @include phone {
    font-size: 25px;
    width: 150px;
  }
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
  @include phone {
    display: none;
  }
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
