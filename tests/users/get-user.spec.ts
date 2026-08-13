import { test, APIRequestContext, expect } from '@playwright/test';

test('Get user schema, expect toMatchObject to be true', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Users/1`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toMatchObject({
        id: expect.any(Number),
        userName: expect.any(String),
        password: expect.any(String)
    });
});

test('Get user, expect 404 status', async ({ request }: {request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Users/999`);

    expect(response.status()).toBe(404);
})

test('Get user by ID, expect 200 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Users/1`);

    expect(response.status()).toBe(200);
})
