import { APIRequestContext } from '@playwright/test';

export class UsersApi {
    constructor(private apiClient: APIRequestContext) {}

    async createUSer(id: number, userName: string, password: string) {
        return this.apiClient.post('/Users', {
            data: {
                id: id,
                userName: userName,
                password: password
            }
        });
    }

    async getUser(id: number) {
        return this.apiClient.get(`/Users/${id}`);
    }

    async deleteUser(id: number) {
        return this.apiClient.delete(`/Users/${id}`);
    }
}