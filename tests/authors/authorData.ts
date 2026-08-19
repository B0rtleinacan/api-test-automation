export const positiveAuthorsData = [
    {
        id: 594,
        idBook: 400,
        firstName: 'Gilbert',
        lastName: 'Arenas',
        expectedStatus: 200
    },
    {
        id: 595,
        idBook: 401,
        firstName: 'Lebron',
        lastName: 'James',
        expectedStatus: 200
    },
    {
        id: 596,
        idBook: 402,
        firstName: 'John',
        lastName: 'Jhon',
        expectedStatus: 200
    }
]

export const negativeAuthorsData = [
    {
        id: 597,
        idBook: 'fortnite',
        firstName: 'Gilber',
        lastName: 'Arenas',
        expectedStatus: 400
    },
    {
        id: 598,
        idBook: 400,
        firstName: 1,
        lastName: 'Arenas',
        expectedStatus: 400
    },
    {
        id: 594,
        idBook: 400,
        firstName: 'Gilber',
        lastName: 2,
        expectedStatus: 400
    }
]