import { test, APIRequestContext, expect } from '@playwright/test';
import { correctBookData, incorrectBookData } from './fakeData/book-test.data'

// Positive test for creating a new book using POST
test('Create a new book, expect 200 status and response body to match the created book', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Books`, {
        data: {
            id: 201, 
            title: 'bookTitle',
            description: 'bookDescription',
            excerpt: 'bookExcerpt',
            publishDate: '2024-06-01T00:00:00Z',
            pageCount: 100
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        id: 201, 
        title: 'bookTitle',
        description: 'bookDescription',
        excerpt: 'bookExcerpt',
        publishDate: '2024-06-01T00:00:00Z',
        pageCount: 100
    })
});

// Negative test for creating a new book with missing required fields

test('Create a new book with incorrect title field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Books`, {
        data: {
            id: 202, 
            title: 202,
            description: 'bookDescription',
            excerpt: 'bookExcerpt',
            publishDate: '2024-06-01T00:00:00Z'
        }
    });
    expect(response.status()).toBe(400);
});

test('Create a new book with incorrect description field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Books`, {
        data: {
            id: 202, 
            title: "bookTitle",
            description: 202,
            excerpt: 'bookExcerpt',
            publishDate: '2024-06-01T00:00:00Z'
        }
    });
    expect(response.status()).toBe(400);
});

test('Create a new book with incorrect excerpt field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Books`, {
        data: {
            id: 202, 
            title: "bookTitle",
            description: "bookDescription",
            excerpt: 202,
            publishDate: '2024-06-01T00:00:00Z'
        }
    });
    expect(response.status()).toBe(400);
});

test('Create a new book with incorrect publishDate field, expect 400 status', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post(`https://fakerestapi.azurewebsites.net/api/v1/Books`, {
        data: {
            id: 202, 
            title: "bookTitle",
            description: "bookDescription",
            excerpt: "bookExcerpt",
            publishDate: 202
        }
    });
    expect(response.status()).toBe(400);
});

// Using test data for positive tests

for (const data of correctBookData) {
    test(`Using test data to create books ${data.objectTitle}`, async ({ request }: { request: APIRequestContext }) => {
        const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Books', {
            data: {
                id: data.id, 
                title: data.title,
                description: data.description,
                excerpt: data.excerpt,
                pageCount: data.pageCount,
                publishDate: data.publishDate
            }
        });
        expect(response.status()).toBe(data.expectedStatus);
    });
}

// Test data for negative tests

for (const data of incorrectBookData) {
    test(`Attempt to create books using invalid fields ${data.objectTitle}, expect 400 status code`, async ({ request }: { request: APIRequestContext }) => {
        const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Books', {
            data: {
                id: data.id, 
                title: data.title,
                description: data.description,
                excerpt: data.excerpt,
                pageCount: data.pageCount,
                publishDate: data.publishDate
            }
        });
        expect(response.status()).toBe(data.expectedStatus);
    });
}

// Tear down of created books after tests are complete

test.afterAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete(`https://fakerestapi.azurewebsites.net/api/v1/Books/201`);
    expect(response.status()).toBe(200);
})

test.afterAll(async ({ request }: { request: APIRequestContext }) => {
    for (const data of correctBookData){
        const response = await request.delete(`https://fakerestapi.azurewebsites.net/api/v1/Books/${data.id}`);
    expect(response.status()).toBe(200);
    }
})