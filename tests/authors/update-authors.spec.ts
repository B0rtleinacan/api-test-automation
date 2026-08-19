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

// Positive Test
// AUT-011
test('Using PUT to update author, expect 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put('https://fakerestapi.azurewebsites.net/api/v1/Authors/592', {
        data: {
            id: 592,
            idBook: 300,
            firstName: "Yuh",
            lastName: "last Name fr"
        }
    });
    expect(response.status()).toBe(200);
})

// Negative Test
// AUT-012
test('Using PUT to update author that does not exist, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put('https://fakerestapi.azurewebsites.net/api/v1/Authors/99999999999999', {
        data: {
            id: 99999999999999,
            idBook: 300,
            firstName: "Yuh",
            lastName: "last Name fr"
        }
    });
    expect(response.status()).toBe(400);
})

// teardown
test.afterAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Authors/592');
    expect(response.status()).toBe(200);
})