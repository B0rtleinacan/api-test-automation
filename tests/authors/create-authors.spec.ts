import { test, APIRequestContext, expect } from '@playwright/test';
import { positiveAuthorsData, negativeAuthorsData } from './authorData';

// Positive test | AUT-007
test('Creates an author on POST, expect 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
        data: {
            id: 592,
            idBook: 300,
            firstName: "first Name fr",
            lastName: "last Name fr"
        }
    });
    expect(response.status()).toBe(200);
});

// Negative tests | AUT-008
test('Creates an author on POST but idBook is a missing value, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
        data: {
            id: 593,
            idBook: '',
            firstName: "first Name fr",
            lastName: "last Name fr"
        }
    });
    expect(response.status()).toBe(400);
});

// Negative tests | AUT-009
test('Creates an author on POST but idBook is an incorrect value, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
        data: {
            id: 593,
            idBook: "three hundred",
            firstName: "first Name fr",
            lastName: "last Name fr"
        }
    });
    expect(response.status()).toBe(400);
});

test('Creates an author on POST but firstName is an incorrect value, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
        data: {
            id: 593,
            idBook: 300,
            firstName: 12,
            lastName: "last Name fr"
        }
    });
    expect(response.status()).toBe(400);
});

test('Creates an author on POST but lastName is an incorrect value, expect 400', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
        data: {
            id: 593,
            idBook: 300,
            firstName: "first Name fr",
            lastName: 12
        }
    });
    expect(response.status()).toBe(400);
});

// Edge case | AUT-010
test('Creates an author on POST with an emoji, expect 200', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
        data: {
            id: 592,
            idBook: 300,
            firstName: "first Name fr 😀",
            lastName: "last Name fr"
        }
    });
    expect(response.status()).toBe(200);
});

// Test data usage

// Positive data
for (const data of positiveAuthorsData) {
    test(`Create an author using POST for ${data.id} using positive test data, expect 200`, async ({ request }: { request: APIRequestContext }) => {
        const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
            data: {
                id: data.id, 
                idBook: data.idBook,
                firstName: data.firstName,
                lastName: data.lastName
            }
        })
        expect(response.status()).toBe(data.expectedStatus)
    })
}

// Negative data

for (const data of negativeAuthorsData) {
    test(`Create an author using POST for ${data.id} but negative test data, expect 400`, async ({ request }: { request: APIRequestContext }) => {
        const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
            data: {
                id: data.id, 
                idBook: data.idBook,
                firstName: data.firstName,
                lastName: data.lastName
            }
        })
        expect(response.status()).toBe(data.expectedStatus)
    })
}

// tear down
test.afterAll(async ({ request }: { request: APIRequestContext }) => {
    const response = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Authors/292');
    expect(response.status()).toBe(200)
})

// test data teardown
test.afterAll(async ({ request }: { request: APIRequestContext }) => {
    for (const data of positiveAuthorsData) {
        const response = await request.delete(`https://fakerestapi.azurewebsites.net/api/v1/Authors/${data.id}`);
        expect(response.status()).toBe(200);
    }
})