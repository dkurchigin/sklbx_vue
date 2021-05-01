<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" type="text" v-model="dataValue"
           :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormText',
  mixins: [formFieldMixin],
};
</script>

<style scoped>

</style>
