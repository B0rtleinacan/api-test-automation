import { test, APIRequestContext, expect } from '@playwright/test';

// positive test case for getting all books using GET request
test('Get all books, expect 200 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Books`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test('Get all books, expect 200 status and response body to be an array', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Books`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
});

test('Get all books, expect 200 status and response body to have length greater than 0', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Books`);
    expect(response.ok()).toBeTruthy(); 
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.length).toBeGreaterThan(0);
}); 

test('Get books using ID, expect 200 status and response body to match the book with the given ID', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Books/1`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
});

test('Get Books schema, expect 200 status and response body to match the schema', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Books/1`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        pageCount: expect.any(Number),
        excerpt: expect.any(String),
        publishDate: expect.any(String),
    });
});

// Negative test cases for books
test('Get book using invalid ID using a positive number out of range, expect 404 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Books/201`); 
    expect(response.status()).toBe(404);
})

test('Get book using invalid ID using a negative number, expect 404 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Books/-1`);
    expect(response.status()).toBe(404);
});