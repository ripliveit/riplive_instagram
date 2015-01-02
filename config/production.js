var config = {
    id: process.env.INSTAGRAM_ID,
    secret: process.env.INSTAGRAM_SECRET,
    url: 'http://onair.riplive.it',
    callback: 'http://onair.riplive.it/photos',
    tags: [
        'ripliveit'
    ]
};

module.exports = config;
