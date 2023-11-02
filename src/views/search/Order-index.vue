<script setup></script>
<template>
  <div class="order-page">
    <div>
      <img src="../../../public/document.png" alt="" />
      <h1>訂單查詢:</h1>
    </div>
    <div>
      <div>
        <h3>訂單編號:</h3>
        <input type="text" name="" id="" />
      </div>
      <div>
        <h3>訂單密碼:</h3>
        <input type="text" />
      </div>
      <div>
        <button class="btn3">查詢</button>
      </div>
      <div>
        <button class="btn3">清空</button>
      </div>
    </div>
    <table>
      <tr>
        <th>訂單編號</th>
        <th>訂單時間</th>
        <th>產品名稱</th>
        <th>訂單狀態</th>
        <th>付款狀態</th>
        <th>總金額</th>
        <th>已付金額</th>
        <th>應付金額</th>
      </tr>
      <tr v-if="false">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr v-else>
        <td>查無資料</td>
      </tr>
    </table>
  </div>
</template>
<style lang="scss" scoped>
.order-page {
  margin: auto;
  border-radius: 10px;
  margin-top: 30px;
  width: 80vw;
  height: 80vh;
  button {
    margin-left: 20px;
    width: 60px;
    height: 35px;
  }
  > div:nth-child(1) {
    height: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    background-color: #d19797;
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
    height: 60px;
    display: flex;
    justify-content: start;
    align-items: center;
    background-color: aliceblue;
    h3 {
      margin: 0px 10px;
      display: inline-block;
    }
    input {
      box-sizing: border-box;
      width: 200px;
      height: 35px;
      padding-left: 10px;
      border-radius: 10px;
      border: 0px;
      box-shadow: 0px 1px 4px;
    }
  }
  > table {
    width: 100%;
    border: 1px solid black;
    th {
      background-color: bisque;
    }
  }
}
</style>
