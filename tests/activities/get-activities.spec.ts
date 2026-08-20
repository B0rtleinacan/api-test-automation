import { test, APIRequestContext, expect } from '@playwright/test';

// ACT-001
test('Get all activities, expect 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get("https://fakerestapi.azurewebsites.net/api/v1/Activities");
    expect(response.status()).toBe(200);
})

// ACT-002
test('Get activities from ID, expect 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get("https://fakerestapi.azurewebsites.net/api/v1/Activities/1");
    expect(response.status()).toBe(200);
})

// ACT-005
test('Get activities but a non-existant ID, expect 404', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get("https://fakerestapi.azurewebsites.net/api/v1/Activities/-1");
    expect(response.status()).toBe(404);
})

// ACT-004
test('Get activities but incorrect value type, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get("https://fakerestapi.azurewebsites.net/api/v1/Activities/real");
    expect(response.status()).toBe(400);
})

// ACT-003 
test('Get activities but ID is wrong, expect 404', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get("https://fakerestapi.azurewebsites.net/api/v1/Activities/999999");
    expect(response.status()).toBe(404);
})