import axios from 'axios'
const instance = axios.create({
  //可設置基礎地址，超時時間
  baseURL: '',
  timeout: ''
})

// 添加請求攔截器
instance.interceptors.request.use(
  (config) => {
    // 在發送請求之前做些什麼
    return config
  },
  (error) => {
    // 對請求錯誤做些什麼
    return Promise.reject(error)
  }
)

// 添加回應攔截器
instance.interceptors.response.use(
  (response) => {
    // 對回應資料做點什麼
    return response
  },
  (error) => {
    // 對回應錯誤做點什麼
    return Promise.reject(error)
  }
)
export default instance
