import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';
import { computed } from 'vue';
import store from '@/store';

class UsersApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
    this.authUserId = computed(() => store.getters['authUser/getUserId']);
  }

  async getMyUser() {
    const path = '/auth/users/me/';
    return this.baseApiClient.makeRequest('GET', path);
  }
}

const usersApiController = new BaseApiController(axiosInstance);
export const usersApi = new UsersApiController(usersApiController);
