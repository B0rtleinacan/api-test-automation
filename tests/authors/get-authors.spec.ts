import { test, APIRequestContext, expect } from '@playwright/test';

// Positive GET tests

// AUT-001
test('Get all authors, expect status 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Authors');
    expect(response.status()).toBe(200);
})

// AUT-002
test('Get authors with ID, expect status 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Authors/1');
    expect(response.status()).toBe(200);
})

test('Get Authors schema, expect status 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Authors/1');

    const responseBody = await response.json()
    expect(responseBody).toMatchObject({
        id: expect.any(Number),
        idBook: expect.any(Number),
        firstName: expect.any(String),
        lastName: expect.any(String)
    });
    expect(response.status()).toBe(200);
})

// AUT-005
test('Get author books via idBook, expect status 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Authors/authors/books/1');
    expect(response.status()).toBe(200);
})

// Negative tests

// AUT-003
test('Get all authors but authors is not correct, expect status 404', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/author');
    expect(response.status()).toBe(404);
})

// AUT-004
test('Get authors with ID but an incorrect ID is there, expect status 404', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Authors/-1');
    expect(response.status()).toBe(404);
})

// AUT-006
test('Get author books via idBook but there is an incorrect value for idBook, expect status 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Authors/authors/books/999999999999');
    expect(response.status()).toBe(400);
})

// AUT-015
test('Using SQL injection, should rejected and expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Authors/authors/books/id="1"');
    expect(response.status()).toBe(400);
})