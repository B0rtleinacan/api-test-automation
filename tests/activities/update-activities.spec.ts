import { test, APIRequestContext, expect } from '@playwright/test';

test.beforeAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Activities', {
        data: {
            id: 31,
            title: 'run',
            dueDate: '2024-06-15T00:00:00Z',
            completed: true
        }
    });
    expect(response.status()).toBe(200);
})

// ACT-011
test('Update activity, expect 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put('https://fakerestapi.azurewebsites.net/api/v1/Activities/31', {
        data: {
            id: 31,
            title: 'away',
            dueDate: '2024-06-15T00:00:00Z',
            completed: true
        }
    });
    expect(response.status()).toBe(200);
})

// ACT-012
test('Update activity, ID incorrect in body, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put('https://fakerestapi.azurewebsites.net/api/v1/Activities/32', {
        data: {
            id: 8000000000000000000,
            title: 'a399399393',
            dueDate: '2024-06-15T00:00:00Z',
            completed: false
        }
    });
    expect(response.status()).toBe(400);
})

// ACT-013
test('Update activity, ID does not exist, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put('https://fakerestapi.azurewebsites.net/api/v1/Activities/999999999999999999999999', {
        data: {
            id: 9999999999999999999999,
            title: 'a399399393',
            dueDate: '2024-06-15T00:00:00Z',
            completed: false
        }
    });
    expect(response.status()).toBe(400);
})

test.afterAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Activities/31');
    expect(response.status()).toBe(200);
})