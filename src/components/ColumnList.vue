<template>
  <div class="row">
    <div v-for="column in columnList" :key="index"  class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, PropType} from 'vue'
import {ColumnProps} from "../store";

export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props){
    const columnList = computed(() => {
      return props.list.map(item => {
        return item
      })
    })
    return {
      columnList
    }
  }
})
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>