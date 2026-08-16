import { test, APIRequestContext, expect } from '@playwright/test';

test.beforeAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Users`, {
        data: {
            id: 60,
            userName: 'changedGuy',
            password: 'changedPassword'
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        id: 60, 
        userName: 'changedGuy',
        password: 'changedPassword'
    })
});

test('Update user, expect 200 status', async ({ request }: { request: APIRequestContext}) => {
    const response = await request.put(`https://fakerestapi.azurewebsites.net/api/v1/Users/60`, {
        data: {
            id: 60,
            userName: 'changedGuy',
            password: 'changingPassword'
        }
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        id: 60, 
        userName: 'changedGuy',
        password: 'changingPassword'
    })
});

test('Update user with incorrect userName field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put(`https://fakerestapi.azurewebsites.net/api/v1/Users/60`, {
        data: {
            id: 60,
            userName: 10,
            password: 'changingPassword'
        }
    });
    expect(response.status()).toBe(400);
});

test('Update user with incorrect id field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put(`https://fakerestapi.azurewebsites.net/api/v1/Users/60`, {
        data: {
            id: 'john',
            userName: 'changedGuy',
            password: 'changingPassword'
        }
    });
    expect(response.status()).toBe(400);
});

test('Update user with incorrect password field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put(`https://fakerestapi.azurewebsites.net/api/v1/Users/60`, {
        data: {
            id: 60,
            userName: 'changedGuy',
            password: 14
        }
    });
    expect(response.status()).toBe(400);
});

