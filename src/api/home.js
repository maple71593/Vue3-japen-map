import request from '@/utils/request.js'

//獲得輪播圖圖片
export const GetBannerBcak = () =>
  request.get('http://localhost:3000/BannerBcak')

//獲取精選旅程的圖片
export const GetCardPages = () => request.get('http://localhost:3000/CardPages')

//獲得老師圖片
export const getMasterPic = () => request.get('http://localhost:3000/master')

//獲得網路時間
export const getTime = () => request.get('https://worldtimeapi.org/api/ip')

//獲取搜尋資料
export const getSecrchData = () =>
  request.get('http://localhost:3000/SearchCard')
