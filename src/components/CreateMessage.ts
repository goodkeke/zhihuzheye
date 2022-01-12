import Message from "./Message.vue";
import {createApp, onUnmounted} from "vue";

export type MessageType = 'success' | 'error' | 'default'
const createMessage = (message:string,type:MessageType,timeout=2000) => {
    const messageInstance = createApp(Message, {
        message,
        type
    })
    const mountNode = document.createElement('div') // 创建一个DOM节点
    document.body.appendChild(mountNode)  // 添加节点
    messageInstance.mount(mountNode)        // 节点挂载组件
    setTimeout(() => {
        messageInstance.unmount(mountNode)      // 节点卸载组件
        document.body.removeChild(mountNode)    // 删除节点
    },timeout)
}

export default createMessage
