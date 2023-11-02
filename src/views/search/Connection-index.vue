<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores'
const useStore = useUserStore()
const name = ref(useStore.username ? useStore.username : null)
const Email = ref(useStore.email ? useStore.email : null)
const PhoneNum = ref()
</script>
<template>
  <div class="Connection-index">
    <div>
      <img src="../../../public/money-check-edit.png" alt="" />
      <h1>旅遊諮詢:</h1>
    </div>
    <div>
      <div>
        <div>
          <h3>諮詢類別:</h3>
          <div>
            <select>
              <option value="option1">自由行</option>
              <option value="option2">團體旅遊</option>
              <option value="option3">家族旅遊</option>
              <option value="option4">蜜月旅行</option>
            </select>
          </div>
        </div>
        <div>
          <h3>聯絡人姓名:</h3>
          <input type="text" name="" v-model="name" id="" />
        </div>
        <div>
          <h3>聯絡Email:</h3>
          <input type="text" name="" v-model="Email" id="" />
        </div>
        <div>
          <h3>連絡電話:</h3>
          <input type="text" name="" v-model="PhoneNum" id="" />
        </div>
      </div>
      <div>
        <div>
          <h3>資訊來源:</h3>
          <div>
            <select>
              <option value="option1">Google搜尋</option>
              <option value="option2">社群網站</option>
              <option value="option3">電視廣告</option>
              <option value="option4">親朋好友介紹</option>
              <option value="option4">其他</option>
            </select>
          </div>
        </div>
        <div>
          <h3>需求說明(700字內):</h3>
          <textarea name="mytext" rows="6" cols="40" required></textarea>
        </div>
      </div>
    </div>
    <div>
      <button class="btn2">送出</button>
      <button class="btn2">清空</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Connection-index {
  margin: auto;
  border-radius: 10px;
  margin-top: 30px;
  width: 80vw;
  height: 80vh;
  background-color: #a8dd9d;
  > div:nth-child(1) {
    height: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    background-color: #5fbe4c;
    h1 {
      color: rgb(245, 245, 245);
      margin-left: 10px;
    }
    img {
      margin-left: 20px;
      width: 30px;
      height: 30px;
    }
  }

  > div:nth-child(2) {
    // width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // background-color: #ccc;
    h3 {
      margin: 10px;
      display: inline-block;
    }
    input {
      padding: 8px;
      border: 1px solid #ccc;
      width: 300px;
      border-radius: 5px;
      outline: none;
      background-color: white;
      // box-sizing: border-box;
    }
    > div:nth-child(1) {
      width: 300px;
    }
    > div:nth-child(2) {
      width: 300px;
    }
  }
  > div:nth-child(3) {
    margin-top: 20px;
    // background-color: #5fbe4c;
    text-align: center;
    button {
      margin: 10px;
    }
  }
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 8px;
  border: 1px solid #ccc;
  width: 200px;
  border-radius: 5px;
  outline: none;
  background-color: white;
}
textarea {
  width: 400px;
  height: 200px;
  appearance: none;
  padding: 8px;
  border: 1px solid #ccc;
  width: 200px;
  border-radius: 5px;
  outline: none;
  background-color: white;
}
</style>
