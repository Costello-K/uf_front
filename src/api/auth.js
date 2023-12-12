import { axiosInstance } from '@/axios';
import { BaseApiController } from './BaseApiController';

class UserApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
  }

  async registerUser(formData) {
    const path = '/auth/users/';
    return this.baseApiClient.makeRequest('POST', path, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  async jwtCreate(formData) {
    const path = '/auth/jwt/create/';
    return this.baseApiClient.makeRequest('POST', path, formData);
  }

  async jwtRefresh(refreshToken, config = {}) {
    const path = '/auth/jwt/refresh/';
    return this.baseApiClient.makeRequest('POST', path, { 'refresh': refreshToken }, config);
  }
}

const userApiController = new BaseApiController(axiosInstance);
export const authUserApi = new UserApiController(userApiController);
