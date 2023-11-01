import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComStore = defineStore('components', () => {
  const Message = ref()
  const MsgShow = ref()
  const MsgType = ref()
  const MessageBox = (Msg, Type) => {
    Message.value = Msg
    MsgShow.value = true
    MsgType.value = Type
  }
  const MessageClose = () => {
    Message.value = ''
    MsgShow.value = false
    MsgType.value = ''
  }
  return { Message, MsgShow, MsgType, MessageBox, MessageClose }
})
