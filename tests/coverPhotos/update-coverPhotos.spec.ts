import { test, APIRequestContext, expect } from '@playwright/test';

// setup before all tests
test.beforeAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Users`, {
        data: {
            id: 90,
            idBook: 184,
            url: 'https://example.com/coverphoto.jpg'
        }
    });
    expect(response.status()).toBe(200)
}); 


// Positive test case for updating cover photo using PUT request
test('Update cover photo, expect 200 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/90`, {
        data: {
            id: 90,
            idBook: 184,
            url: 'https://example.com/updatedcoverphoto.jpg'
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        id: 90,
        idBook: 184,
        url: 'https://example.com/updatedcoverphoto.jpg'
    })
});

// Negative test case for updating cover photos with incorrect fields
test('Update cover photo with incorrect idBook field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/90`, {
        data: {
            id: 90,
            idBook: 'invalidIdBook',
            url: 'https://example.com/updatedcoverphoto.jpg'
        }
    });
    expect(response.status()).toBe(400);
});

test('Update cover photo with incorrect url field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/90`, {
        data: {
            id: 90,
            idBook: 184,
            url: 12345
        }
    });
    expect(response.status()).toBe(400);
});
    


// Setup after all tests
test.afterAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/90`);
    expect(response.status()).toBe(200);
});