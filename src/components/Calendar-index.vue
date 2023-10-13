<script setup>
import { getTime } from '@/api/home.js'
// import { ref } from 'vue'
const GetDate = async () => {
  const { data } = await getTime()
  const nowTime = data.datetime
  const nowWeek = data.day_of_week
  console.log(data, '現在時間', nowTime, '現在第', nowWeek, '周')
}
GetDate()
</script>
<template>
  <div class="calender">
    <h3>月份</h3>
    <table>
      <thead>
        <tr>
          <th>
            <div>一</div>
          </th>
          <th>
            <div>二</div>
          </th>
          <th>
            <div>三</div>
          </th>
          <th>
            <div>四</div>
          </th>
          <th>
            <div>五</div>
          </th>
          <th>
            <div>六</div>
          </th>
          <th>
            <div>日</div>
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<style></style>
