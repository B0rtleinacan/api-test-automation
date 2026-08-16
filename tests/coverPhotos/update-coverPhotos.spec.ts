import { test, APIRequestContext, expect } from '@playwright/test';

test.beforeAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Users`, {
        data: {
            id: 90,
            idBook: 184,
            url: 'https://example.com/coverphoto.jpg'
        }
    });
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

