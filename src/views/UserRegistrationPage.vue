<template>
  <v-sheet
      width="400"
      class="mx-auto mt-15"
  >
      <v-form @submit.prevent="submitUserRegistrationForm">
        <v-file-input
          v-model="formData.avatar"
          :label="'avatar'"
          :rules="validationRules.avatar"
          :error-messages="errors.avatar"
          prepend-icon="mdi-camera"
          show-size
          accept=".png, .jpeg, .jpg"
        />
        <v-text-field
          v-for="(value, key) in FIELDS_FORM_REGISTRATION"
          :key="key"
          v-model="formData[value.model]"
          :label="value.label"
          :rules="validationRules[key]"
          :error-messages="errors[value.model]"
          :type="value.type"
        />
        <BaseButton
          type="submit"
          class="w-100"
          button-name="registration"
        />
      </v-form>
  </v-sheet>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { formUtils } from '@/utils';
import { authUserApi } from '@/api';
import { objUtils } from '@/utils';
import { FIELDS_FORM_REGISTRATION, VALIDATION_RULES } from '@/constants';
import BaseButton from '@/components/BaseButton';


export default {
  name: 'UserRegistrationPage',
  components: {
    BaseButton,
  },
  setup() {
    const router = useRouter();
    const formData = ref({
      avatar: null,
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    });
    const errors = ref({
      avatar: '',
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    });

    const validationRules = ref({
      ...VALIDATION_RULES,
      confirm_password: [
        v => !!v || 'Password required',
        v => v === formData.value.password || 'Password not match'
      ]
    })

    const createMultipartFormData = obj => {
      const newFormData = new FormData();
      for (const field in obj.value) {
        if (field !== 'avatar') {
          newFormData.append(field, obj.value[field]);
        } else if (field === 'avatar' && obj.value[field] && obj.value[field][0]) {
          newFormData.append(field, obj.value[field][0]);
        }
      }
      return newFormData
    }

    const submitUserRegistrationForm = async () => {
      const isFormValid = formUtils.formValidator(formData, validationRules);
      if (!isFormValid) {
        return;
      }

      try {
        const multipartFormData = createMultipartFormData(formData);
        const { status } = await authUserApi.registerUser(multipartFormData);
        if (status === 201) {
          router.push('/authorization');
        }
      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    return {
      FIELDS_FORM_REGISTRATION,
      validationRules,
      formData,
      errors,
      submitUserRegistrationForm,
    };
  }
};
</script>

<style scoped>
.v-form > *:not(:last-child) {
  margin-bottom: 10px;
}
</style>
