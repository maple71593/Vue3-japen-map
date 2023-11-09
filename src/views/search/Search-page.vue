<script setup>
import { useComStore } from '../../stores'
const useCom = useComStore()
</script>
<template>
  <div class="search-container">
    <table>
      <tr>
        <th>行程編號</th>
        <th>出發時間</th>
        <th>產品名稱</th>
        <th>航空公司</th>
        <th>價格</th>
        <th>狀態</th>
      </tr>
      <tr v-for="(item, index) in useCom.SearchData" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.time.toDate().toLocaleDateString() }}</td>
        <td>
          <router-link :to="{ path: '/list-index', query: { id: item.id } }">{{
            item.title
          }}</router-link>
        </td>
        <td>{{ item.airplane }}</td>
        <td>{{ item.amount }}</td>
        <td>none</td>
      </tr>
    </table>
  </div>
</template>
<style lang="scss" scoped>
/* 版芯 */
.search-container {
  width: 80vw;
  margin: auto;
  > table {
    width: 100%;
    border: 1px solid black;
    th {
      font-size: 20px;
      height: 40px;
      background-color: bisque;
    }
    td {
      font-size: 20px;
      color: rgb(96, 96, 96);
    }
  }
}
</style>
