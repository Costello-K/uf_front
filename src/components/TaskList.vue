<template>
  <h2 class="my-5">
    User Tasks
  </h2>

  <v-list
      class="mb-15"
      style="border-bottom: 1px solid gray"
  >
    <v-list-item v-if="taskList.length > 0">
      <v-col
          cols="10"
          class="d-flex mx-auto justify-space-between"
          v-for="task in taskList"
          :key="task.id"
      >
        <v-col cols="9" class="align-self-center d-flex">
          <div>
            <p class="bold-text">
              {{ task.title }}:
            </p>
            <p :class="{ 'task-completed': task.completed }">
              {{ task.description }}
            </p>
          </div>

        </v-col>
        <v-col cols="3" class="align-self-center d-flex">
          <v-checkbox
              class="mt-4"
              v-model="task.completed"
              @change="toggleTaskStatus(task.id, task.completed)"
          />
          <BaseButton
              class="mt-6 ml-3"
              @click="removeTask(task.id)"
              button-name="Delete"
          />
        </v-col>
      </v-col>
    </v-list-item>

    <v-list-item v-else>
      <v-list-item>No tasks available</v-list-item>
    </v-list-item>
  </v-list>
</template>

<script>
  import { onMounted, computed } from 'vue';
  import { useStore } from 'vuex';
  import { tasksApi } from '@/api';
  import { AUTH_USER_INFO_FIELDS, BASE_URL } from '@/constants';
  import BaseButton from '@/components/BaseButton.vue';

  export default {
    name: 'TaskList',
    components: {
      BaseButton,
    },
    setup() {
      const store = useStore();
      const taskList = computed(() => store.state.taskList.tasks);

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

      const toggleTaskStatus = async (taskId, completedStatus) => {
        try {
          const {status, data} = await tasksApi.updateTask(taskId, {completed: completedStatus});
          if (status === 200) {
            store.commit('taskList/updateTask', data);
          }
        } catch (error) {
          console.error('Failed to mark task as completed:', error);
        }
      };

      const removeTask = async (taskId) => {
        try {
          const {status} = await tasksApi.removeTask(taskId);
          if (status === 204) {
            store.commit('taskList/removeTask', taskId);
          }
        } catch (error) {
          console.error('Failed to remove task:', error);
        }
      };

      onMounted(async () => {
        await fetchUserTasks();
      });

      return {
        taskList,
        AUTH_USER_INFO_FIELDS,
        BASE_URL,
        toggleTaskStatus,
        removeTask,
      }
    }
  };
</script>

<style scoped>
  .bold-text {
    font-weight: bold;
  }

  .task-completed {
    text-decoration: line-through;
  }
</style>
