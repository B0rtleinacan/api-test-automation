import { test, APIRequestContext, expect } from '@playwright/test';

test.beforeAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Books', {
        data: {
            id: 250,
            title: 'updatetitle',
            description: 'updateDescription',
            pageCount: 400,
            excerpt: 'updateExcerpt',
            publishDate: '2024-06-01T00:00:00Z',
        }
    });
    expect(response.status()).toBe(200);
})

// Positive test
test('Remove a book using DELETE, expect 200 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Books/250');
    expect(response.status()).toBe(200);
})

// Negative test
test('Remove a book using DELETE but a book that doesnt exist, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Books/999999999999999999999999');
    expect(response.status()).toBe(400);
})