import { test, APIRequestContext, expect } from '@playwright/test';

// ACT-006
test('Create an activity, expect 200', async ({ request }: { request: APIRequestContext }) => {
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

// ACT-008
test('Create an activity but title is missing, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Activities', {
        data: {
            id: 32,
            title: 49,
            dueDate: '2024-06-15T00:00:00Z',
            completed: true
        }
    });
    expect(response.status()).toBe(400);
});

//ACT-009
test('Create an activity but JSON body is empty, expect 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Activities', {
        data: {}
    });
    expect(response.status()).toBe(200);
});

// tear down
test.afterAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Activities/31');
    expect(response.status()).toBe(200);
})