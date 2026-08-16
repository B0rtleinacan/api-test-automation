import { test, APIRequestContext, expect } from '@playwright/test';

// Positive test
test('Create cover photo, expect 200 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos`, {
        data: {
            id: 30,
            idBook: 30,
            url: 'https://example.com/cover1.jpg'
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

// Negative tests

test('Create cover photo with incorrect title field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos`, {
        data: {
            id: 31,
            idBook: 'thirtyone',
            url: 'https://example.com/cover2.jpg'   
        }   
    });
    expect(response.status()).toBe(400);
});

test('Create cover photo with incorrect id field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos`, {
        data: {
            id: 'thirtytwo',
            idBook: 32,
            url: 'https://example.com/cover3.jpg'
        }
    });
    expect(response.status()).toBe(400);
});


// Clean up created 

test.afterAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/30`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
})