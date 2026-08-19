import { test, APIRequestContext, expect } from '@playwright/test';

// Setup
test.beforeAll(async ({ request }: { request: APIRequestContext }) =>{
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
        data: {
            id: 592,
            idBook: 300,
            firstName: "first Name fr",
            lastName: "last Name fr"
        }
    });
    expect(response.status()).toBe(200);
})

// Positive test
// AUT-013
test('Author is deleted using DELETE, expect 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Authors/592');
    expect(response.status()).toBe(200);
})

// AUT-014
test('Author is deleted using DELETE but its a non-existant id, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Authors/yourmom');
    expect(response.status()).toBe(400);
})