<template>
  <h3 class="my-5">
    Add new Task
  </h3>

  <v-form
      @submit.prevent="submitCreateTaskForm"
      class="w-75 ma-auto my-5"
  >
    <v-text-field
        v-model="formData.title"
        label="Title"
        :rules="VALIDATION_RULES.name"
        :error-messages="errors.title"
    />
    <v-textarea
        v-model="formData.description"
        label="Description"
        :rules="VALIDATION_RULES.description"
        :error-messages="errors.description"
    />
    <BaseButton
        type="submit"
        class="w-100"
        button-name="Create"
    />
  </v-form>
</template>

<script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { tasksApi } from '@/api';
  import { formUtils, objUtils } from '@/utils';
  import { VALIDATION_RULES } from '@/constants';
  import BaseButton from '@/components/BaseButton.vue';

  export default {
    name: 'TaskForm',
    components: {
      BaseButton,
    },
    setup() {
      const store = useStore();
      const formData = ref({
        title: '',
        description: '',
      });
      const errors = ref({
        title: '',
        description: '',
      });

      const submitCreateTaskForm = async () => {
        const isFormValid = formUtils.formValidator(formData, ref(VALIDATION_RULES));
        if (!isFormValid) {
          return;
        }

        try {
          const {data} = await tasksApi.createTask(formData.value);
          store.commit('taskList/addTask', data);
        } catch (err) {
          errors.value = objUtils.createEmptyObject(errors.value);
          errors.value = objUtils.mergeObjects(errors.value, err.response.data);
        }
      };

      return {
        formData,
        VALIDATION_RULES,
        errors,
        submitCreateTaskForm,
      }
    }
  };
</script>
