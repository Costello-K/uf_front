<template>
  <v-card>
    <v-toolbar color="#ededed">
      <v-toolbar-title>
        My profile
      </v-toolbar-title>
    </v-toolbar>
    <div class="d-flex flex-row">
      <div class="w-100">
        <div class="pa-5 mb-15" style="border-bottom: 1px solid gray">
          <v-container class="d-flex">
            <v-img
                :src="`${BASE_URL}${userData.avatar}`"
                class="avatar"
            />
            <div class="text-user-info">
              <v-card className="text-left elevation-0">
                <InfoLine
                    v-for="(field, i) in AUTH_USER_INFO_FIELDS"
                    :key="`${i}_${field.name}`"
                    :label="field.label"
                    :value="userData[field.name]"
                />
              </v-card>
            </div>
          </v-container>
        </div>

        <TaskList/>

        <TaskForm/>
      </div>
    </div>
  </v-card>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { tasksApi } from '@/api';
  import { AUTH_USER_INFO_FIELDS, BASE_URL } from '@/constants';
  import InfoLine from '@/components/InfoLine';
  import TaskForm from '@/components/TaskForm.vue';
  import TaskList from "@/components/TaskList.vue";

  export default {
    name: 'UserProfilePage',
    components: {
      TaskList,
      TaskForm,
      InfoLine,
    },
    setup() {
      const store = useStore();
      const userData = ref({});

      async function fetchUserTasks() {
        try {
          const {
            data: {
              results,
            }
          } = await tasksApi.getTaskList();
          store.commit('taskList/setTaskListData', results);
        } catch (error) {
          console.error('Failed to fetch user tasks:', error);
        }
      }

      onMounted(async () => {
        userData.value = store.state.authUser.user;
        await fetchUserTasks();
      });

      return {
        userData,
        AUTH_USER_INFO_FIELDS,
        BASE_URL,
      }
    }
  };
</script>

<style scoped>
  .avatar {
    max-width: 200px;
    max-height: 200px;
    width: auto;
    height: auto;
    border-radius: 20px;
    object-fit: cover;
  }

  .text-user-info {
    padding-left: 30px;
  }
</style>
