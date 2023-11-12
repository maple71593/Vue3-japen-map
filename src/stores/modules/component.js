import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useComStore = defineStore('components', () => {
  const SearchData = ref([])
  const Message = ref()
  const MsgType = ref()
  const isLoading = ref(false)
  const scrollRef = ref()
  let timer = null
  const MessageBox = (Msg, Type) => {
    Message.value = Msg
    MsgType.value = Type
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      MessageClose()
      clearTimeout(timer)
    }, 2000)
  }
  const MessageClose = () => {
    Message.value = ''
    MsgType.value = ''
  }
  const CleanSearchData = () => {
    SearchData.value = []
  }
  return {
    Message,
    MsgType,
    MessageBox,
    MessageClose,
    SearchData,
    CleanSearchData,
    isLoading,
    scrollRef
  }
})
