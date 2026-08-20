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
});

// ACT-014
test('Delete using DELETE method, expect 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Activities/31');
    expect(response.status()).toBe(200);
})

// ACT-015
test('Delete using DELETE method for something that does not exist, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Activities/99999999999999999999999999999');
    expect(response.status()).toBe(400);
})