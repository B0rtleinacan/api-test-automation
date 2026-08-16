import { test, APIRequestContext, expect } from '@playwright/test';
import { correctBookData } from './fakeData/user.data';

test.beforeAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Books', {
        data: {
            id: 250,
            title: 'updatetitle',
            description: 'updateDescription',
            pageCount: 400,
            excerpt: 'updateExcerpt',
            publishDate: '2024-06-01T00:00:00Z',
        }
    });
    expect(response.status()).toBe(200);
})

// Positive tests
test('Update title, expect status code 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put('https://fakerestapi.azurewebsites.net/api/v1/Books/250', {
        data: {
            id: 250,
            title: 'titleUpdated',
            description: 'updateDescription',
            pageCount: 400,
            excerpt: 'updateExcerpt',
            publishDate: '2024-06-01T00:00:00Z',
        }
    })
    expect(response.status()).toBe(200);
})

test('Update description, expect status code 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put('https://fakerestapi.azurewebsites.net/api/v1/Books/250', {
        data: {
            id: 250,
            title: 'updatetitle',
            description: 'DescriptThese',
            pageCount: 400,
            excerpt: 'updateExcerpt',
            publishDate: '2024-06-01T00:00:00Z',
        }
    })
    expect(response.status()).toBe(200);
})

test('Update pageCount, expect status code 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.put('https://fakerestapi.azurewebsites.net/api/v1/Books/250', {
        data: {
            id: 250,
            title: 'updatetitle',
            description: 'updateDescription',
            pageCount: 405,
            excerpt: 'updateExcerpt',
            publishDate: '2024-06-01T00:00:00Z',
        }
    })
    expect(response.status()).toBe(200);
})