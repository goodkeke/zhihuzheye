import {onMounted, onUnmounted, ref, Ref} from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
    const isClickOutside = ref(false)
    const handler = (e: MouseEvent) => {
        if (elementRef.value){
            if(elementRef.value.contains(e.target as HTMLElement)){
                console.log('elementRef.value=====>', elementRef.value)
                isClickOutside.value = false
            }else {
                isClickOutside.value = true
            }
        }
    }
    onMounted(() => {
        console.log('onMounted 111111111')
        document.addEventListener('click', handler)
    })
    onUnmounted(() => {
        console.log('onUnmounted 2222222222')
        document.removeEventListener('click', handler)
    })
    return isClickOutside
}
export default useClickOutside
