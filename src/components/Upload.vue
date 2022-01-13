<template>
  <div class="file-upload">
    <input type="file"
           name="file"
           ref="fileInput"
           class="file-input d-none"
           @change="handlerFileChange"/>
    <div class="image-box">
      <img v-if="fileData.url" :src="fileData.url" class="w-100 h-200"/>
      <button class="btn btn-primary" @click.prevent="triggerUpload">
        <span>{{fileStatus === 'loading' ? '正在上传...' : '上传图片'}}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import axios from "axios";
type Uploadstatus = 'ready' | 'loading' | 'success' | 'error'// 字符串字变量
export default defineComponent({
  components: {},
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup({props}) {
    const stateText = ref({
      'ready': '上传图片',
      'loading': '正在上传',
      'succes': '上传成功',
      'error': '上传失败',
    })
    const fileData = ref({})
    const fileStatus = ref<Uploadstatus>('ready')
    const handlerFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if(target.files){
        fileStatus.value = 'loading'
        // target.files不是Array，将其转换化Array
        const files = Array.from(target.files);
        const uploadFile = files[0]
        const formData = new FormData()
        formData.append(uploadFile.name, uploadFile)
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res: any) => {
          fileStatus.value = 'success'
          fileData.value = res.data.data
        }).catch(() => {
          fileStatus.value = 'error'
        }).finally(() => {
          if(fileInput.value){
            console.log('file res2222====>',fileInput)
            // fileInput.value.value = ''
          }
        })
      }
    }
    // 在setup中拿到dom节点， 传入泛型
    const fileInput = ref<null | HTMLInputElement>(null)
    const triggerUpload = () => {
      if(fileInput.value){    // dom节点存在
        fileInput.value.click()
      }
    }
    return {
      fileData,
      fileInput,
      fileStatus,
      stateText,
      triggerUpload,
      handlerFileChange
    }
  }
})
</script>

<style scoped>

</style>
