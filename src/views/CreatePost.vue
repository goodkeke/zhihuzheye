<template>
  <div class="create-post-page container">
    <h4>新建文章</h4>
<!--    <input type="file" name="file" @change="handlerFileChange"/>-->
    <upload class="mb-4"
            action="/upload"
            :before-upload="uploadCheck"
            :uploaded="uploadedData"
            @file-uploaded="handleFileUploaded"
            @file-uploaded-error="fileUploadedError">
      <template #default>
        <div class="d-flex h-100 justify-content-center align-items-center bg-light text-secondary">
          <h4>点击上传图片</h4>
        </div>
      </template>
      <template #loading>
        <div class="d-flex justify-content-start align-items-center">
          <div class="spinner-border text-secondary" role="status"></div>
          <h4>正在上传</h4>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" height="100" class="w-auto h-100">
      </template>
    </upload>
    <validate-form class="my-4" @form-submit="onFormSubmit">
      <div class="mb-3 d-flex flex-row justify-content-start align-items-center">
        <label class="form-label">文章标题 :</label>
        <div class="flex-grow-1">
          <validate-input type="text"
                          placeholder="请输入文章标题"
                          v-model="titleVal"
                          :rules="titleRules"
          />
        </div>
      </div>
      <div class="mb-3 d-flex flex-row justify-content-start align-items-baseline">
        <label class="form-label">文章内容 :</label>
        <div class="flex-grow-1 h-100">
          <validate-input tag="textarea"
                          row="10"
                          type="text"
                          placeholder="请输入文章内容"
                          v-model="contentVal"
                          :rules="contentRules"
          />
        </div>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, onUnmounted, ref} from "vue";
import Upload from "../components/Upload.vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, {RulesProp} from "../components/ValidateInput.vue";
import {GlobalDataProps, PostProps, ResponseType, ImageProps} from '../store'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {beforeUploadCheck} from "../common/helper";
import axios from "axios";
import createMessage from "../components/CreateMessage";

export default defineComponent({
  name: "CreatePost",
  components: {ValidateInput, ValidateForm, Upload},
  setup() {
    const uploadedData = ref()
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    let imageId = ''
    const titleVal = ref('')
    const titleRules: RulesProp = [
      {type: 'required', message: '文章标题不能为空'},
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]

    const handleFileUploaded = (rowData: ResponseType<ImageProps>) => {
      if (rowData.data._id){
        imageId = rowData.data._id
      }
    }
    const onFormSubmit = (res: boolean) => {
      if(res) {
        const {column, _id} = store.state.user
        if(column) {
          const newPost: PostProps = {
            column,
            title: titleVal.value,
            content: contentVal.value,
            author: _id
          }
          if(imageId){
            newPost.image = imageId
          }
          store.dispatch('createPost', newPost).then(() => {
            createMessage('发表成功', 'success')
            router.push({name: 'column', params: {id: column}})
          })
        }
      }
    }
    const handlerFileChange = (e: Event) => {    //input 事件对象
      const target = e.target as HTMLInputElement
      const file = target.files
      if(file){
        const uploadFile = file[0]  //只选择一个文件
        // 模拟表单数据 使用formData对象
        const formData = new FormData()
        formData.append(uploadFile.name, uploadFile) //添加input值

        axios.post('/upload', formData, {
          headers: {   // 添加一个content-type
            'Content-Type': 'multipart/form-data'
          }
        }).then((res: any) => {
        })
      }
    }

    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG){
        createMessage('仅支持jpeg/png格式图片', 'error')
      }
      return isJPG
    }
    const fileUploaded = (e: ResponseType<ImageProps>) => {
      createMessage(`已上传图片ID${e._id}`, 'success')
    }
    const fileUploadedError = (e: any) => {
      createMessage(`图片上传失败`, 'error')
    }
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, {format: ['image/jpeg', 'image/png'], size: 2})
      const {passed, error} = result
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过 1Mb', 'error')
      }
      return passed
    }
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit,
      handlerFileChange,
      fileUploaded,
      fileUploadedError,
      beforeUpload,
      uploadCheck,
      uploadedData
    }
  }
})
</script>

<style scoped>
.form-label{
  width: 120px;
  text-align: right;
  padding-right: 5px;
}
</style>
