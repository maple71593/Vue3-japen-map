<script setup>
import { useRoute } from 'vue-router'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { ref } from 'vue'
const db = useFirestore()
const route = useRoute()
const data = ref()
const q = query(collection(db, 'Plan'), where('id', '==', `${route.query.id}`))
const getdata = async () => {
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    data.value = doc.data()
  })
}
getdata()
console.log(data.value)
</script>
<template>
  <div class="list-page">
    <div>
      <div>
        <h2>{{ data.title }}</h2>
      </div>
      <div>
        <div>
          <img :src="data.img" alt="" />
        </div>
        <div>
          <h3>行程</h3>
          <h3>產品編號:{{ data.id }}</h3>
          <h3>剩餘:{{ data.last }}</h3>
          <h3>出發日期:{{ data.time }}</h3>
          <h3>航班:{{ data.airplane }}</h3>
          <div>
            <h4>{{ data.notice1 }}</h4>
            <h4>{{ data.notice2 }}</h4>
            <h4>{{ data.notice3 }}</h4>
            <h4>{{ data.notice4 }}</h4>
          </div>
        </div>
      </div>
      <div>
        <h3>{{ data.amount }}</h3>
        <button class="btn2">手刀報名</button>
      </div>
    </div>
    <div>另一邊</div>
  </div>
</template>
<style lang="scss" scoped>
.list-page {
  width: 80vw;
  margin: auto;
  display: flex;
  border-radius: 10px;
  margin-top: 20px;
  background-color: white;
  > div:nth-child(1) {
    width: 50%;
    border-radius: 10px;

    > div:nth-child(1) {
      background-color: rgb(166, 166, 180);
      height: 50px;
      line-height: 50px;
      color: antiquewhite;
      border-radius: 10px 0px 0px 0px;
      > h2 {
        margin-left: 20px;
      }
    }
    > div:nth-child(2) {
      display: flex;
      > div:nth-child(1) {
        width: 50%;
        img {
          width: 100%;
        }
      }
      > div:nth-child(2) {
        width: 50%;
        color: rgb(90, 90, 90);
        background-color: rgb(255, 255, 255);
        h3 {
          margin-left: 10px;
          margin-top: 10px;
          font-size: 20px;
        }
        > div {
          margin-top: 10px;
          h4 {
            display: inline;
            background-color: rgb(111, 228, 119);
            border-radius: 25px;
            padding: 10px;
            margin-left: 5px;
          }
        }
      }
    }
    > div:nth-child(3) {
      font-size: 30px;
      color: rgb(95, 95, 95);
      text-align: end;
      h3 {
        display: inline;
        // margin-right: 20px;
        margin: 10px;
      }
      h3::before {
        content: '$';
      }
      h3::after {
        content: '人/起';
        font-size: 20px;
      }
      button {
        margin: 10px;
      }
    }
  }
  > div:nth-child(2) {
    width: 50%;
    background-color: rgb(255, 255, 255);
  }
}
</style>
