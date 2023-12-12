import { computed } from 'vue';
import store from '@/store';
import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';

class TasksApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
    this.user_id = computed(() => store.getters['authUser/getUserId']);
  }

  async getTaskList() {
    const path = `/v1/users/${this.user_id.value}/tasks/`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async createTask(formData) {
    const path = `/v1/users/${this.user_id.value}/tasks/`;
    return this.baseApiClient.makeRequest('POST', path, formData);
  }

  async updateTask(id, formData) {
    const path = `/v1/users/${this.user_id.value}/tasks/${id}/`;
    return this.baseApiClient.makeRequest('PATCH', path, formData);
  }

  async removeTask(id) {
    const path = `/v1/users/${this.user_id.value}/tasks/${id}/`;
    return this.baseApiClient.makeRequest('DELETE', path);
  }
}

const tasksApiController = new BaseApiController(axiosInstance);
export const tasksApi = new TasksApiController(tasksApiController);
