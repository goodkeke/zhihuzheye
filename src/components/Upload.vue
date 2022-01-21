<template>
  <div class="file-upload">
    <div class="image-box">
      <img v-if="fileData.url" :src="fileData.url" class="upload-img w-100 h-200"/>
<!--      <button class="btn btn-primary" @click.prevent="triggerUpload">-->
<!--        <span>{{fileStatus === 'loading' ? '正在上传...' : '上传图片'}}</span>-->
<!--      </button>-->
      <div class="file-upload-container p-2" v-bind="$attrs" @click.prevent="triggerUpload">
        <slot v-if="fileStatus === 'loading'" name="loading">
          <button class="btn btn-primary" >正在上传...</button>
        </slot>
        <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
          <button class="btn btn-primary">上传失败</button>
        </slot>
        <slot v-else name="default">
          <button class="btn btn-primary" >上传图片</button>
        </slot>
      </div>
    </div>

    <input type="file"
           name="file"
           ref="fileInput"
           class="file-input d-none"
           @change="handlerFileChange"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from "vue";
import axios from "axios";
type Uploadstatus = 'ready' | 'loading' | 'success' | 'error'// 字符串字变量
type checkFunction = (file: File) =>  boolean
export default defineComponent({
  components: {},
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<checkFunction>
    },
    uploaded: {
      type: Object
    }
  },
  inheritAttrs: false, // 不要继承默认的attrs
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, {emit}) {
    const stateText = ref({
      'ready': '上传图片',
      'loading': '正在上传',
      'succes': '上传成功',
      'error': '上传失败',
    })
    const fileData = ref({})
    const fileStatus = ref<Uploadstatus>(props.uploaded ? 'success' : 'ready')

    const uploadedData =  ref(props.uploaded)
    // 在setup中拿到dom节点， 传入泛型
    const fileInput = ref<null | HTMLInputElement>(null)
    const triggerUpload = () => {
      if(fileInput.value){    // dom节点存在
        fileInput.value.click()
      }
    }
    watch(() => props.uploaded,(newValue) => {
      if (newValue){
        fileStatus.value = 'success'
        uploadedData.value = newValue
      }
    })

    const handlerFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if(target.files){
        // target.files不是Array，将其转换化Array
        const files = Array.from(target.files);
        if(props.beforeUpload){
          const result = props.beforeUpload(files[0])
          if(!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        const uploadFile = files[0]
        const formData = new FormData()
        formData.append(uploadFile.name, uploadFile)
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res: any) => {
          fileStatus.value = 'success'
          uploadedData.value = res.data
          emit('file-uploaded', res.data)
        }).catch((error) => {
          fileStatus.value = 'error'
          emit('file-uploaded-error', {error})
        }).finally(() => {
          if(fileInput.value){
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileData,
      fileInput,
      fileStatus,
      stateText,
      uploadedData,
      triggerUpload,
      handlerFileChange
    }
  }
})
</script>

<style scoped>
.file-upload-container{
  cursor: pointer;
  height: 150px;
}
.file-upload-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
