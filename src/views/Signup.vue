<template>
  <div class="signup-page mx-auto p-3 w-330">
    <validate-form @form-submit="submit">
      <div class="mb-3 d-flex flex-row justify-content-start align-items-center">
        <label class="form-label">邮箱地址 :</label>
        <div class="flex-grow-1">
          <validate-input type="text"
                          ref="inputRef"
                          v-model="model.emailVal"
                          :rules="rule.emailRules"
                          placeholder="请输入邮箱地址"></validate-input>
        </div>
      </div>
      <div class="mb-3 d-flex flex-row justify-content-start align-items-center">
        <label class="form-label">昵称 :</label>
        <div class="flex-grow-1">
          <validate-input type="text"
                          v-model="model.nickname"
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
import {computed, defineComponent, ref} from 'vue'
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, {RulesProp} from "../components/ValidateInput.vue";

export default defineComponent({
  components: {ValidateInput, ValidateForm},
  props: {},
  setup(props){
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
        {type: 'custom', message: '两次密码不一致', validator: () => {
            if(model.value.password !== model.value.password2){
              return false
            }else {
              return true
            }
          }},
      ]
    })
    const submit = () =>{}
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
