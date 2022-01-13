<template>
  <div class="create-post-page container">
    <h4>新建文章</h4>
<!--    <input type="file" name="file" @change="handlerFileChange"/>-->
    <upload class="my-3"></upload>
    <validate-form @form-submit="onFormSubmit">
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
import {GlobalDataProps, PostProps} from '../store'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "CreatePost",
  components: {ValidateInput, ValidateForm, Upload},
  setup() {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()

    const titleVal = ref('')
    const titleRules: RulesProp = [
      {type: 'required', message: '文章标题不能为空'},
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const onFormSubmit = (res: boolean) => {
      if(res) {
        const {column} = store.state.user
        if(column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column
          }
          store.commit('createPost', newPost)
          router.push({name: 'column', params: {id: column}})
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

        console.log('target1111====>',formData)
        axios.post('/upload', formData, {
          // 添加一个content-type
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res: any) => {
          console.log('file res2222====>',res)
        })
      }
    }
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit,
      handlerFileChange
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
