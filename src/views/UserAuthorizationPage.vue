<template>
  <div>
    <v-sheet
        width="350"
        class="mx-auto mt-15"
    >
      <v-form @submit.prevent="submitUserLoginForm">
        <v-text-field
            v-model="formData.username"
            label="username"
            :rules="VALIDATION_RULES.username"
        />

        <v-text-field
            v-model="formData.password"
            label="password"
            :rules="VALIDATION_RULES.password"
            type="password"
        />

        <div style="position: relative" >
          <p class="login-error">
            {{ errors.detail }}
          </p>
        </div>

        <BaseButton
            type="submit"
            class="mt-5 w-100"
            button-name="Login"
        />
      </v-form>
      <SocialLogin/>
    </v-sheet>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { authUserApi, usersApi } from '@/api';
import { auth, formUtils, objUtils } from '@/utils';
import { VALIDATION_RULES } from '@/constants';
import BaseButton from '@/components/BaseButton';
import SocialLogin from '@/components/SocialLogin';

export default {
  name: 'UserAuthorizationPage',
  components: {
    SocialLogin,
    BaseButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = ref({
      username: '',
      password: '',
    });
    const errors = ref({ detail: '' });

    const submitUserLoginForm = async () => {
      errors.value = objUtils.createEmptyObject(errors.value);

      const isFormValid = formUtils.formValidator(formData, ref(VALIDATION_RULES));
      if (!isFormValid) {
        return;
      }

      try {
        const response = await authUserApi.jwtCreate(formData.value);
        auth.setTokens(response.data);

        const { data } = await usersApi.getMyUser();
        store.commit('authUser/setUserData', data);

        router.push(`/users/${data.id}`);
      } catch (err) {
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    return {
      VALIDATION_RULES,
      formData,
      errors,
      submitUserLoginForm,
    };
  },
};
</script>

<style>
.login-error {
  width: 100%;
  color: #b02828;
  font-size: 0.75rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0%);
}
</style>
