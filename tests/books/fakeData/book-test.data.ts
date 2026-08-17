export const correctBookData = [
    {
        objectTitle: '203',
        id: 203,
        title: 'The Other Place',
        description: 'A gripping psychological thriller that will keep you on the edge of your seat.',
        excerpt: 'When a young woman moves into a new apartment, she discovers a hidden room that holds dark secrets from the past.',
        publishDate: '2024-06-01T00:00:00Z',
        pageCount: 320,
        expectedStatus: 200
    },
    {
        objectTitle: '204',
        id: 204,
        title: 'The Last Voyage',
        description: 'An epic adventure across the high seas, filled with danger and intrigue.',
        excerpt: 'Captain Jameson embarks on a perilous journey to find a legendary treasure, facing treacherous waters and ruthless pirates.',
        publishDate: '2024-06-15T00:00:00Z',
        pageCount: 450,
        expectedStatus: 200
    },
    {
        objectTitle: '205',
        id: 205,
        title: 'Whispers in the Wind',
        description: 'A heartwarming tale of love, loss, and the power of friendship.', 
        excerpt: 'Wind',
        publishDate: '2024-06-12T00:00:00Z',
        pageCount: 300,
        expectedStatus: 200
    }
       
]

export const incorrectBookData = [
    {
        objectTitle: 'title',
        id: 203,
        title: 1,
        description: 'A gripping psychological thriller that will keep you on the edge of your seat.',
        excerpt: 'When a young woman moves into a new apartment, she discovers a hidden room that holds dark secrets from the past.',
        publishDate: '2024-06-01T00:00:00Z',
        pageCount: 320,
        expectedStatus: 400
    },
    {
        objectTitle: 'description',
        id: 204,
        title: 'The Last Voyage',
        description: 14,
        excerpt: 'Captain Jameson embarks on a perilous journey to find a legendary treasure, facing treacherous waters and ruthless pirates.',
        publishDate: '2024-06-15T00:00:00Z',
        pageCount: 450,
        expectedStatus: 400
    },
    {
        objectTitle: 'Excerpt',
        id: 205,
        title: 'Whispers in the Wind',
        description: 'A heartwarming tale of love, loss, and the power of friendship.', 
        excerpt: 27,
        publishDate: '2024-06-12T00:00:00Z',
        pageCount: 300,
        expectedStatus: 400
    },  
    {
        objectTitle: 'publishDate',
        id: 206,
        title: 'Whispers in the Wind',
        description: 'A heartwarming tale of love, loss, and the power of friendship.', 
        excerpt: 'Wild',
        publishDate: 2024,
        pageCount: 300,
        expectedStatus: 400
    },
    {
        objectTitle: 'pageCount',
        id: 207,
        title: 'Whispers in the Wind',
        description: 'A heartwarming tale of love, loss, and the power of friendship.', 
        excerpt: 'Wild',
        publishDate: '2024-06-12T00:00:00Z',
        pageCount: true,
        expectedStatus: 400
    },
]