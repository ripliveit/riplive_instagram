var config = {
    id: process.env.INSTAGRAM_ID,
    secret: process.env.INSTAGRAM_SECRET,
    url: 'http://localhost:3001',
    callback: 'http://localhost:3001/photos',
    tags: [
        'ripliveit'
    ]
};

module.exports = config;
