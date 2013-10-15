var redis = require('redis'),
    client = redis.createClient();

exports.redis = client;
