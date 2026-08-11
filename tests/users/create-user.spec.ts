import { test, APIRequestContext, expect } from '@playwright/test';

test('Create user, expect 200 status', async ({ request }: {request: APIRequestContext}) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Users`, {
        data: {
            id: 1, 
            userName: 'testuser', 
            password: 'testpassword'
        }
    });
    expect(response.status()).toBe(200);
})