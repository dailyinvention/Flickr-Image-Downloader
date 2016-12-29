var crypto = require('crypto');
var request = require('request');
var OAuth = require('oauth-1.0a');
var api_info = require('./api_info');

var oauth = OAuth({
    consumer: {
        key: api_info.key,
        secret: api_info.secret
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

var request_data = {
    url: 'https://www.flickr.com/services/oauth/request_token',
    method: 'GET',
    data: {
       oauth_callback: 'oob' 
    }
};


var oauthAuthorize = oauth.authorize(request_data)

console.log(oauthAuthorize);

request({
    url: request_data.url,
    method: request_data.method,
    headers: oauth.toHeader(oauthAuthorize)
}, function(error, response, body) {
    console.log(body);
    //process your data here 
});