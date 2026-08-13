import { test, APIRequestContext, expect } from '@playwright/test';

// Happy path tests

test('Get cover photos, expect 200 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos`);
    expect(response.status()).toBe(200);
});

test('Get cover photo by ID, expect 200 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/1`);
    expect(response.status()).toBe(200);
});

test('Get cover photo by idBook, expect 200 status', async ({ request }: {request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/books/covers/1`);
    expect(response.status()).toBe(200);
});

test('Get schema for cover photos, expect toMatchObject to be true', async ({ request }: { request: APIRequestContext }) =>{
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/1`);
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toMatchObject({
        id: expect.any(Number),
        idBook: expect.any(Number),
        url: expect.any(String)
    });
});

// Negative path tests

test('Get cover photo by ID, expect 404 status', async ({ request }: {request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/-1`);
    expect(response.status()).toBe(404);
});

// someone made too many ID's in both a positive and negeative direction, so a 404 test is not valid for the idBook endpoint. Endpoint will be a 400. 
test('Get cover photo by idBook, expect 400 status', async ({ request }: {request: APIRequestContext }) => {
    const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/books/covers/five`);
    expect(response.status()).toBe(400);
});

