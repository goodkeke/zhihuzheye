<template>
  <div class="validate-input-container pb-3 position-relative">
    <input v-if="tag !== 'textarea'"
           class="form-control"
           :class="{'is-invalid': inputRef.error}"
           @blur="validateInput"
           v-model="inputRef.val"
           v-bind="$attrs"/>
    <!--    @input="updateValue"-->
    <textarea v-else
              class="form-control"
              :class="{'is-invalid': inputRef.error}"
              @blur="validateInput"
              v-model="inputRef.val"
              v-bind="$attrs">
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback position-absolute text-start">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import {computed, watch, defineComponent, onMounted, PropType, reactive} from 'vue'
import {emitter} from './ValidateForm.vue'

interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}

export type TagType = 'input' | 'textarea'
export type RulesProp = RuleProp[]

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export default defineComponent({
  props: {
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    },
    rules: Array as PropType<RulesProp>
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    watch(() => props.modelValue, (newValue) => {
      inputRef.val = newValue || ''
    })
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(item => {
          let passed = true
          inputRef.message = item.message
          switch (item.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'custom':
              passed = item.validator ? item.validator() : true
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style scoped>
</style>