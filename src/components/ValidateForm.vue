<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">{{btnText}}</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import {defineComponent, onUnmounted} from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  emits: ['form-submit'],
  props: {
    btnText: {
      type: String,
      default: '提交'
    }
  },
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];
    const submitForm = ()=> {
      console.log('funcArr', funcArr)
      const res = funcArr.map(func => func()).every(res => res);
      context.emit('form-submit', res)
    }
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return{
      submitForm
    }
  }
})
</script>

<style scoped>

</style>
