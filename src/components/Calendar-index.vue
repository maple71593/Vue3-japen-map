<script setup>
// import { getTime } from '@/api/home.js'
import { ref } from 'vue'
const DateArrayRef = ref()
const MonthValue = ref()
const GetDate = () => {
  //獲取現在時間 年 月 日
  const Now = new Date()
  const Year = Now.getFullYear()
  const Month = Now.getMonth() + 1
  MonthValue.value = Month
  // 取得每個月的第一個
  const firstDay = new Date(Year, Month - 1, 1)
  const dayOfWeek = firstDay.getDay()
  // 新增日期資料為空共計6個禮拜42天
  const DateArray = Array.from({ length: 42 }, (_, index) => ({
    id: index + 1,
    date: ''
  }))
  // 將為空的資料儲存到Ref
  DateArrayRef.value = DateArray

  // 將數據從每個月的第一天開始導入 遍歷進ref
  for (let i = 1; i <= 30; i++) {
    DateArrayRef.value[dayOfWeek + i - 1].date = i
  }
}
GetDate()
// const getDaysInMonth = (month) => {
//   const year = new Date().getFullYear()
//   console.log(new Date(year, month, 0).getDay())
// }
// getDaysInMonth(12)
</script>
<template>
  <div class="calender" v-for="(items, indexs) in 12" :key="indexs">
    <div>
      <div>{{ MonthValue }}月份</div>
      <table class="tablebox">
        <thead class="ManthBox">
          <tr>
            <div>一</div>
          </tr>
          <tr>
            <div>二</div>
          </tr>
          <tr>
            <div>三</div>
          </tr>
          <tr>
            <div>四</div>
          </tr>
          <tr>
            <div>五</div>
          </tr>
          <tr>
            <div>六</div>
          </tr>
          <tr>
            <div>日</div>
          </tr>
        </thead>
        <tbody class="ManthBox">
          <tr class="datebox" v-for="itme in DateArrayRef" :key="itme.id">
            <td>
              {{ itme.date }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.calender {
  width: 420px;
  background-color: #fff;
  color: black;
  display: flex;
  flex-wrap: wrap;
}
.tablebox {
  /* width: 100%; */
  box-sizing: border-box;
}
.ManthBox {
  width: 420px;
  display: flex;
  flex-wrap: wrap;
}
.datebox {
  width: 60px;
}
</style>
