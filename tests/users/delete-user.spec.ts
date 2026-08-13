import { test, APIRequestContext, expect } from '@playwright/test';

test.beforeAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Users`, {
        data: {
            id: 140,
            userName: 'deleteThese',
            password: 'nuts'
        }
    });
    expect(response.status()).toBe(200);
})

test('Delete user, expect 200 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete(`https://fakerestapi.azurewebsites.net/api/v1/Users/140`);
    expect(response.status()).toBe(200);
})