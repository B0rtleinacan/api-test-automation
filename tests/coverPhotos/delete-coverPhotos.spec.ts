import { test, APIRequestContext, expect } from '@playwright/test';

test.beforeAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Users`, {
        data: {
            id: 77,
            idBook: 9029,
            url: 'https://example.com/Acoverphoto.jpg'
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test('Delete cover photo, expect 200 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/77`);
    expect(response.status()).toBe(200);
});