<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到知乎者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3 d-flex flex-row justify-content-start align-items-center">
        <label class="form-label">邮箱地址 :</label>
        <div class="flex-grow-1">
          <validate-input type="text"
                          ref="inputRef"
                          :rules="emailRules"
                          v-model="emailVal"
                          placeholder="请输入邮箱地址">
          </validate-input>
        </div>
      </div>
      <div class="mb-3 d-flex flex-row justify-content-start align-items-center">
        <label class="form-label">密码 :</label>
        <div class="flex-grow-1">
          <validate-input type="password"
                          placeholder="请输入密码"
                          :rules="passwordRules"
                          v-model="passwordVal"></validate-input>
        </div>
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import { useRouter } from 'vue-router' // 定义路由的行为
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, {RulesProp} from "../components/ValidateInput.vue";
import {useStore} from "vuex";
import axios from "axios";

export default defineComponent({
  name: "Login",
  components: {ValidateInput, ValidateForm},
  props: {},
  setup(props){
    const router = useRouter()
    const store = useStore()
    const emailVal = ref('111@test.com')
    const emailRules: RulesProp = [
      {type: 'required', message: '电子邮箱地址不能为空'},
      {type: 'email', message: '请输入正确的电子邮箱格式'},
    ]
    const passwordVal = ref('111111')
    const passwordRules: RulesProp = [
      {type: 'required', message: '密码不能为空'}
    ]
    const onFormSubmit = async (res: boolean) => {
      if(res){
        const params = {
          email: emailVal.value,
          password: passwordVal.value
        }
         store.dispatch('loginAndFetch', params).then(data => {
           console.log('data2222====>', data)
           router.push('/')
         })
      }
    }
    return{
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  },
})
</script>

<style scoped>
.form-label{
  width: 120px;
  text-align: right;
  padding-right: 5px;
}
</style>
