<template>
  <div class="signup-page mx-auto p-3 w-330">
    <validate-form @form-submit="submit" btn-text="注册新用户">
      <div class="mb-3 d-flex flex-row justify-content-start align-items-center">
        <label class="form-label">邮箱地址 :</label>
        <div class="flex-grow-1">
          <validate-input type="text"
                          ref="inputRef"
                          v-model="model.email"
                          :rules="rule.emailRules"
                          placeholder="请输入邮箱地址"></validate-input>
        </div>
      </div>
      <div class="mb-3 d-flex flex-row justify-content-start align-items-center">
        <label class="form-label">昵称 :</label>
        <div class="flex-grow-1">
          <validate-input type="text"
                          v-model="model.nickName"
                          :rules="rule.nameRules"
                          placeholder="请输入昵称"></validate-input>
        </div>
      </div>
      <div class="mb-3 d-flex flex-row justify-content-start align-items-center">
        <label class="form-label">密码 :</label>
        <div class="flex-grow-1">
          <validate-input type="text"
                          v-model="model.password"
                          :rules="rule.pwdRules"
                          placeholder="请输入密码"></validate-input>
        </div>
      </div>
      <div class="mb-3 d-flex flex-row justify-content-start align-items-center">
        <label class="form-label">重复密码 :</label>
        <div class="flex-grow-1">
          <validate-input type="text"
                          v-model="model.password2"
                          :rules="rule.pwdAgainRules"
                          placeholder="请再次输入密码"></validate-input>
        </div>
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput from "../components/ValidateInput.vue";
import createMessage from "../components/CreateMessage";
import axios from "axios";

export default defineComponent({
  components: {ValidateInput, ValidateForm},
  props: {},
  setup(){
    const router = useRouter()
    onMounted(() => {
      if (localStorage.getItem('formData')){
        model.value = JSON.parse(localStorage.getItem('formData'))
      }
    })
    const model = ref({})
    const rule = ref({
      emailRules: [
        {type: 'required', message: '电子邮箱地址不能为空'},
        {type: 'email', message: '请输入正确的电子邮箱格式'}
      ],
      nameRules: [
        {type: 'required', message: '请输入昵称'},
      ],
      pwdRules: [
        {type: 'required', message: '请输入密码'},
      ],
      pwdAgainRules: [
        {type: 'required', message: '请再次输入密码'},
        {type: 'custom',
          validator: () => {
            return model.value.password === model.value.password2
          },
          message: '两次密码不一致'
        },
      ]
    })
    const submit = async (res: boolean) =>{
      if(res){
        let {password2, ...payload} = {...model.value}
        localStorage.setItem('formData', JSON.stringify(payload))
        axios.post('/users/', payload).then(() =>{
          localStorage.removeItem('formData')
          createMessage('注册成功', 'success')
          router.push('/')
        })
      }
    }
    return{
      rule,
      model,
      submit
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
