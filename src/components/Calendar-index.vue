<script setup>
// import { getTime } from '@/api/home.js'
import { ref } from 'vue'
// 全部演算數據的儲存
const DateArrayRef = ref({})
//獲取現在時間 年 月 日
const Now = new Date()
const Year = Now.getFullYear()
const Month = Now.getMonth() + 1
// 進入函數[三個參數](推算的年份，推算的月份，遍歷幾次)
const GetDate = (Year, Month, index) => {
  // 取得每個月的第一天
  const firstDay = new Date(Year, Month - 1, 1)
  const dayOfWeek = firstDay.getDay()
  //取得下個月的回推這個月的最後一天(獲得當月總共有幾天)
  const GetMonLastDay = new Date(Year, Month, 0).getDate()
  // 新增日期資料為空共計6個禮拜42天
  const DateArray = Array.from({ length: 42 }, (_, index) => [''])
  // 將為空的資料儲存到Ref
  DateArrayRef.value[index] = DateArray
  // 將數據從每個月的第一天開始導入 遍歷推進ref
  for (let i = 1; i <= GetMonLastDay; i++) {
    const ref = {
      year: Year,
      mon: Month,
      date: i
    }
    DateArrayRef.value[index][dayOfWeek + i - 1] = ref
  }
}
// 遍歷當前月份往後推算12個月
for (let i = 0; i <= 12; i++) {
  // 當前最大月份不得超過12個月
  let month = (Month + i) % 13
  // 取得年分
  let year = Year
  // 判斷是否跨份
  if (month < Month) {
    year = year + 1
    month += 1
  }
  //呼叫函數 並回傳參數
  GetDate(year, month, i)
}
const getdata = (data) => {
  console.log(CharacterData)
}
getdata()
</script>
<template>
  <div>
    <input
      class="inputTest"
      type="text"
      placeholder="出發日期 年/月/日"
    /><input class="inputTest" placeholder="結束日期 年/月/日" type="text" />
  </div>
  <div class="btn">
    <button class="btnup">上一個</button>
    <button class="btndon">下一個</button>
  </div>
  <div class="calenderCOM">
    <div class="calender" v-for="(items, indexs) in DateArrayRef" :key="indexs">
      <div class="vforbox">
        <h2>{{ items[15].year }}年{{ items[15].mon }}月</h2>
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
            <tr class="datebox" v-for="(item, index) in items" :key="index">
              <td @click="getdata(item)">{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.inputTest {
  box-sizing: border-box;
  padding-left: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 420px;
  height: 40px;
  font-size: 20px;
  border-radius: 10px;
}

.calenderCOM {
  width: 870px;
  overflow: hidden;
  display: flex;
  position: relative;
}
.btn1 {
  position: relative;
}
.btnup {
  top: 40%;
  left: -1%;
  width: 40px;
  height: 60px;
  background-color: aqua;
  position: absolute;
}
.btndon {
  width: 40px;
  height: 60px;
  background-color: rgb(46, 46, 46);
  position: absolute;
}
.vforbox {
  text-align: center;
  border-radius: 10px;
  margin-left: 10px;
  background-color: #f37e7e;
  color: rgb(255, 255, 255);
}
.vforbox h2 {
  line-height: 50px;
  height: 50px;
  font-size: 30px;
}
.tablebox {
  height: 22px;
  font-size: 20px;
}
.ManthBox {
  width: 420px;
  display: flex;
  flex-wrap: wrap;
}
.datebox {
  border: 1px solid rgb(225, 225, 225);
  width: 60px;
  height: 30px;
  box-sizing: border-box;
  display: flex;
  margin: auto;
  border-radius: 10px;
  cursor: pointer;
}
</style>
