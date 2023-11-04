<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 全部演算數據的儲存
const DateArrayRef = ref({})
//獲取現在時間 年 月 日
const Now = new Date()
const Year = Now.getFullYear()
const Month = Now.getMonth() + 1
const NowDate = Now.getDate()
// 進入函數[三個參數](推算的年份，推算的月份，遍歷幾次)
const GetDate = (Year, Month, index) => {
  // 取得每個月的第一天
  const firstDay = new Date(Year, Month - 1, 1)
  const dayOfWeek = firstDay.getDay()
  //取得下個月的回推這個月的最後一天(獲得當月總共有幾天)
  const GetMonLastDay = new Date(Year, Month, 0).getDate()
  // 新增日期資料為空共計6個禮拜42天
  const DateArray = Array.from({ length: 42 }, (_, index) => [index + 1])
  // 將為空的資料儲存到Ref
  DateArrayRef.value[index] = DateArray
  // 將數據從每個月的第一天開始導入 遍歷推進ref
  for (let i = 1; i <= GetMonLastDay; i++) {
    const ref = {
      id: `${Year}${Month.toString().padStart(2, '0')}${i
        .toString()
        .padStart(2, '0')}`,
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
const ShowCalendar = ref(false)
const locationShow = ref(false)
const numShow = ref(false)
const InpRefPeol = ref()
const InpRefWhereGo = ref()
const isCheckStart = ref()
const isCheckedEnd = ref()
const InpRefStart = ref()
const InpRefStartData = ref()
const InpRefEnd = ref()
const InpRefEndData = ref()

// 判斷點到的數值
const GetInputData = (item) => {
  const { year, mon, date, id } = item
  //第一層判斷(是否點到空的區域與過去的日期)
  if (year === undefined && mon === undefined && date === undefined) return
  if (year <= Year && mon <= Month && date < NowDate) return
  const checkedDay = [year, mon, date].join('/')
  // 第一層判斷 (判斷開始日期是否有值)
  if (InpRefStart.value) {
    //第二層判斷(是否選到出發日 選中出發日就重製)
    if (InpRefStartData.value === id) {
      InpRefStart.value = ''
      InpRefStartData.value = ''
      InpRefEndData.value = ''
      InpRefEnd.value = ''
      isCheckStart.value = ''
      isCheckedEnd.value = ''
      // 第二層判斷(是否選到 出發天的前面日子)
    } else if (InpRefStartData.value > id) {
      InpRefStart.value = checkedDay
      InpRefStartData.value = id
      isCheckStart.value = id
    } else {
      // 第三層判斷(結束日是否有值 有值就進入判斷 沒值就傳入值)
      if (InpRefEnd.value) {
        // 第四層判斷(是否選到一樣的結束日)
        if (InpRefEndData.value === id) {
          // 選中同樣的結束日將值清空
          InpRefEnd.value = ''
          InpRefEndData.value = ''
          isCheckedEnd.value = ''
          InpRefStart.value = checkedDay
          InpRefStartData.value = id
          isCheckStart.value = id
          // 如果選中其他值，就將值傳入
        } else {
          InpRefEnd.value = checkedDay
          InpRefEndData.value = id
          isCheckedEnd.value = id
        }
      } else {
        InpRefEnd.value = checkedDay
        InpRefEndData.value = id
        isCheckedEnd.value = id
      }
    }
  } else {
    InpRefStart.value = checkedDay
    InpRefStartData.value = id
    isCheckStart.value = id
  }
}
//重置選項
const reset = () => {
  InpRefPeol.value = ''
  InpRefWhereGo.value = ''
  isCheckStart.value = ''
  isCheckedEnd.value = ''
  InpRefStart.value = ''
  InpRefStartData.value = ''
  InpRefEnd.value = ''
  InpRefEndData.value = ''
  left.value = 0
}
// 點擊人數設定
const PeolData = (n) => {
  InpRefPeol.value = n.target.textContent
  numShow.value = false
}
//點擊地點設定
const locationData = (n) => {
  InpRefWhereGo.value = n.target.textContent
  locationShow.value = false
}
const Blur = () => {
  let timer = null
  if (locationShow.value || ShowCalendar.value || numShow.value)
    timer = setTimeout(() => {
      locationShow.value = false
      ShowCalendar.value = false
      numShow.value = false
      clearTimeout(timer)
    }, 100)
}
const Focus = (n) => {
  console.log(n)
  if (locationShow.value) {
    ShowCalendar.value = false
    numShow.value = false
  } else if (ShowCalendar.value) {
    locationShow.value = false
    numShow.value = false
  } else if (numShow.value) {
    locationShow.value = false
    ShowCalendar.value = false
  }
}
const router = useRouter()
const goSearch = () => {
  router.push({
    path: '/search/Search-Page',
    query: {
      location: InpRefWhereGo.value,
      time: InpRefStart.value,
      people: InpRefPeol.value
    }
  })
}
</script>
<template>
  <div class="AllCalender">
    <div class="inp-text">
      <input
        v-model="InpRefWhereGo"
        class="inputTest"
        type="text"
        placeholder="想去哪裡呢"
        @click="locationShow = true"
        @focus="Focus"
        @blur="Blur"
      />
      <input
        v-model="InpRefStart"
        class="inputTest"
        type="text"
        readonly="readonly"
        placeholder="出發日期"
        @click="ShowCalendar = true"
        @focus="Focus"
        @blur="Blur"
      />
      <input
        v-model="InpRefEnd"
        class="inputTest"
        readonly="readonly"
        placeholder="結束日期"
        type="text"
        @click="ShowCalendar = true"
        @focus="Focus"
        @blur="Blur"
      />
      <input
        v-model="InpRefPeol"
        class="inputTest"
        readonly="readonly"
        placeholder="選擇人數"
        type="text"
        @click="numShow = true"
        @focus="Focus"
        @blur="Blur"
      />
      <div class="location" v-show="locationShow" @click="locationData">
        <p v-for="(item, index) in 10" :key="index">
          {{ index + 1 }}
        </p>
      </div>
      <div class="Calender" v-show="ShowCalendar">
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
                    <div>日</div>
                  </tr>
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
                </thead>
                <tbody class="ManthBox">
                  <tr
                    @click="GetInputData(item)"
                    class="datebox"
                    :class="{
                      //AI筆記:
                      //在Vue模板中，如果你没有明確地為某個元素或組件綁定特定的屬性或數據，
                      // Vue會將該元素的類別和屬性繼承到當前組件的數據中。
                      // 這可能會導致模板中未明確定義的屬性或類別也會被渲染，
                      // 具體渲染效果取決於你組件的數據狀態。
                      // 在你的代碼中，你使用了v-for指令來遍歷DateArrayRef數組，
                      // 但其中一些項目並未與具體的日期數據綁定，因此它們會繼承StartChecked和EndChecked類別。
                      // 這是因為在v-for循環中，Vue會儘量渲染所有的項目，即使某些項目在數據中未明確定義。
                      // 當你未為這些項目提供特定數據時，Vue會默認為它們創建數據，將它們視為未定義的數據項目，
                      // 因此它們會繼承組件上已定義的屬性或類別。
                      // 如果你希望這些空格子不繼承StartChecked和EndChecked類別，
                      // 你可以在v-for中添加條件來檢查是否為有效日期數據，
                      // 只有在日期數據可用時才應用StartChecked和EndChecked類別。
                      // 這裡，item.id === isCheckStart && item.id 和 item.id === isCheckedEnd && item.id
                      // 條件確保只有在item.id存在並與isCheckStart或isCheckedEnd匹配時才應用相應的類別。
                      // 這將防止空格子繼承這些類別，因為它們的item.id為undefined。
                      StartChecked: item.id === isCheckStart && item.id,
                      EndChecked: item.id === isCheckedEnd && item.id,
                      StartBeforeDay:
                        item.year <= Year &&
                        item.mon <= Month &&
                        item.date < NowDate,
                      BetweenChecked:
                        item.id > isCheckStart && item.id < isCheckedEnd
                    }"
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
      </div>
      <div class="num-box" v-show="numShow">
        <p v-for="(item, index) in 10" :key="index" @click="PeolData">
          {{ index + 1 }}
        </p>
      </div>
      <button @click="reset" class="input-btn">重置</button>
      <button @click="goSearch" class="input-btn">搜尋</button>
    </div>
  </div>
</template>

<style>
.AllCalender {
  width: 100vw;
  max-width: 80vw;
}
/* 處理input */
.inputTest {
  box-sizing: border-box;
  padding-left: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 250px;
  height: 40px;
  font-size: 20px;
  border: 0px;
  border-radius: 10px;
}
/* 月曆外圍(可顯現範圍) */
.Calender {
  left: 85px;
  position: absolute;
  z-index: 10;
}
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
  background-color: #f37e7ebd;
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
  justify-content: space-around;
  flex-wrap: wrap;
}
.datebox {
  border: 1px solid rgb(225, 225, 225);
  width: 60px;
  height: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
}
.StartChecked {
  border: 1px solid rgb(225, 225, 225);
  width: 60px;
  height: 30px;
  box-sizing: border-box;
  background-color: #1e87d7;
  display: flex;
  margin: auto;
  border-radius: 10px;
  cursor: pointer;
}
.EndChecked {
  border: 1px solid rgb(225, 225, 225);
  width: 60px;
  height: 30px;
  box-sizing: border-box;
  background-color: #386281;
  display: flex;
  margin: auto;
  border-radius: 10px;
  cursor: pointer;
}
.BetweenChecked {
  border: 1px solid rgb(225, 225, 225);
  width: 60px;
  height: 30px;
  box-sizing: border-box;
  background-color: #e95b5b;
  display: flex;
  margin: auto;
  border-radius: 10px;
  cursor: pointer;
}
.StartBeforeDay {
  border: 1px solid rgb(225, 225, 225);
  color: rgb(224, 161, 161);
  width: 60px;
  height: 30px;
  box-sizing: border-box;
  background-color: #e87b7b;
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
  left: 880px;
  position: absolute;
}
.btnRight:hover {
  background-color: #1e87d7;
  transition: background-color 0.3s ease;
}
/* 搜索框的按鈕 */
.input-btn {
  display: inline-block;
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #3498db;
  color: #fff;
  border: 2px solid #2980b9;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    transform 0.3s;
}

.input-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}
.inp-text {
  position: relative;
}
.num-box {
  width: 250px;
  background-color: #fff;
  top: 45px;
  border-radius: 10px;
  left: 790px;
  text-align: center;
  position: absolute;
  z-index: 10;
}
.num-box p {
  margin: 10px 0px;
  font-size: 20px;
  cursor: pointer;
}
.num-box p:hover {
  margin: 10px 0px;
  font-size: 20px;
  box-shadow: 0px 0px 10px;
  cursor: pointer;
}
.location {
  width: 250px;
  background-color: #fff;
  top: 45px;
  border-radius: 10px;
  left: 10px;
  text-align: center;
  position: absolute;
  z-index: 10;
}
.location p {
  margin: 10px 0px;
  font-size: 20px;
  cursor: pointer;
}
.location p:hover {
  margin: 10px 0px;
  font-size: 20px;
  box-shadow: 0px 0px 10px;
  cursor: pointer;
}
</style>
