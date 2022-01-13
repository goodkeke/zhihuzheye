import Message from './Message.vue'
import {createApp} from "vue";
export type MessageType = 'success' | 'error' | 'default'
const createMessage = (message: string, type: string, timeout = 2000) => {
    const messageAlert = createApp(Message, {
        message,
        type
    })
    const node = document.createElement('div')
    document.body.appendChild(node)
    messageAlert.mount(node)
    setTimeout(() => {
        messageAlert.unmount(node)
        document.body.removeChild(node)
    }, timeout)
}
export default createMessage