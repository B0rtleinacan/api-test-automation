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

test('Create user with incorrect userName field, expect 400 status', async ({ request }: {request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Users`, {
        data: {
            id: 10,
            userName: 10,
            password: 'anotherOne'
        }
    })
    expect(response.status()).toBe(400);
})

test('Create user with incorrect id field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Users`, {
        data: {
            id: 'john',
            userName: 'somethingDifferent',
            password: 'shmleg'
        }
    })
    expect(response.status()).toBe(400);
})

test('Create user with incorrect password field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Users`, {
        data: {
            id: 49,
            userName: 'usedName',
            password: 14
        }
    })
    expect(response.status()).toBe(400)
})

