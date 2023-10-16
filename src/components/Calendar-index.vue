<script setup>
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
  const DateArray = Array.from({ length: 42 }, (_, index) => [index])
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
  // 判斷是否跨年份
  if (month < Month) {
    year = year + 1
    month += 1
  }
  //呼叫函數 並回傳參數
  GetDate(year, month, i)
}

//改變月曆輪播的方向
const left = ref(0)
const ChangeLeft = (num) => {
  if (left.value === 0 && num === 435) return
  if (left.value === -4785 && num === -435) return
  const newlaft = left.value + num
  left.value = newlaft
}
//點擊改變input裡數值
const InpRefStart = ref()
const InpRefStartData = ref()
const InpRefEnd = ref()
const InpRefEndData = ref()
const StartChecked = ref(false)
const EndChecked = ref(false)
const GetData = (item) => {
  const { year, mon, date } = item
  if (year === undefined && mon === undefined && date === undefined) return
  const checkedDay = [year, mon, date].join('/')
  const checkedData = `${year}${mon.toString().padStart(2, '0')}${date
    .toString()
    .padStart(2, '0')}`

  if (StartChecked.value === true) {
    if (EndChecked.value === true) {
      if (InpRefStartData.value > checkedData) {
        alert('出發日期不能大於結束日期')
      } else {
        InpRefEnd.value = checkedDay
        InpRefEndData.value = checkedData
      }
    } else {
      InpRefEnd.value = checkedDay
      InpRefEndData.value = checkedData
      EndChecked.value = true
    }
  } else {
    if (StartChecked.value === false && EndChecked.value === false)
      InpRefStart.value = checkedDay
    console.log(StartChecked.value)
    InpRefStartData.value = checkedData
    StartChecked.value = true
  }
}
</script>
<template>
  <div>
    <input
      v-model="InpRefStart"
      class="inputTest"
      type="text"
      placeholder="出發日期 年/月/日"
    /><input
      v-model="InpRefEnd"
      class="inputTest"
      placeholder="結束日期 年/月/日"
      type="text"
    />
  </div>
  <div class="btn-Relative">
    <button class="btnLeft" @click="ChangeLeft(435)">〈</button>
    <button class="btnRight" @click="ChangeLeft(-435)">〉</button>
  </div>
  <div class="calenderCOM">
    <div
      class="calender"
      :style="{ left: left + 'px' }"
      v-for="(items, indexs) in DateArrayRef"
      :key="indexs"
    >
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
            <tr
              @click="GetData(item)"
              class="datebox"
              v-for="(item, index) in items"
              :key="index"
            >
              <td>{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
/* 處理input */
.inputTest {
  box-sizing: border-box;
  padding-left: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 425px;
  height: 40px;
  font-size: 20px;
  border-radius: 10px;
}
/* 月曆外圍(可顯現範圍) */
.calenderCOM {
  width: 870px;
  height: 260px;
  margin-left: 10px;
  overflow: hidden;
  display: flex;
}
.calender {
  top: 0px;
  left: 0px;
  transition: 0.2s ease;
  position: relative;
}
/* 月曆範圍(內部) */
.vforbox {
  width: 425px;
  text-align: center;
  border-radius: 10px;
  margin-right: 10px;
  background-color: #f37e7e;
  color: rgb(255, 255, 255);
  box-sizing: border-box;
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
/* 輪播圖方向按鈕 */
.btn-Relative {
  position: relative;
}
.btnLeft {
  width: 50px;
  height: 60px;
  font-size: 30px;
  padding-right: 10px;
  background-color: #3498db;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  top: 100px;
  left: -60px;
  position: absolute;
}

.btnLeft:hover {
  background-color: #1e87d7;
  transition: background-color 0.3s ease;
}

.btnRight {
  width: 50px;
  height: 60px;
  font-size: 30px;
  padding-left: 10px;
  background-color: #3498db;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  top: 100px;
  right: -60px;
  position: absolute;
}
.btnRight:hover {
  background-color: #1e87d7;
  transition: background-color 0.3s ease;
}
</style>
