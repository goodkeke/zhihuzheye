<template>
  <div class="create-post-page container">
    <h4>新建文章</h4>
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
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, {RulesProp} from "../components/ValidateInput.vue";
import {GlobalDataProps} from '../store'
import {PostProps} from '../common/testData'
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "CreatePost",
  components: {ValidateInput, ValidateForm},
  props: {
  },
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
        const {columnId} = store.state.user
        if(columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({name: 'column', params: {id: columnId}})
        }
      }
    }
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit
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
