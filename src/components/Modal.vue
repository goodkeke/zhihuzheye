<template>

</template>
<script lang="ts">
import {defineComponent, onUnmounted} from 'vue'

export default defineComponent({
  name: "Loader",
  props: {
    text: {
      type: String,
      default: '加载中'
    },
    background: {
      type: String
    }
  },
  setup(props){
    const node = document.createElement('div')
    node.id = 'back'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
    return {
    }
  }
})
</script>
<style scoped>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>
