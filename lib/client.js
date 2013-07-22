var request = require('request');

var currentToken
  , baseUrl = 'https://api.gochime.com/';

// PUBLIC

function use (token) {
  currentToken = token;
}

function test (token, cb) {
  if (!token || typeof token !== 'string') { return cb(new Error("You must provide a token to test.")); }
  var options = {
    method: 'POST',
    url: baseUrl + 'test',
    data: {}
  };
  sendRequest(options, cb, token);
}

function addFormattedUsers (audience, users, cb) {
  var options = {
    method: 'POST',
    url: baseUrl + 'audience/members',
    data: {
        audience: audience
      , members: users
    }
  };
  sendRequest(options, cb);
}

// PRIVATE

function sendRequest (options, cb, useToken) {
  if (!useToken && !currentToken) { return cb(new Error("No token provided for call.")); }
  if (useToken) {
    options.data.token = useToken;
  } else {
    options.data.token = currentToken;
  }

  request(options, handleResponse(cb));
}

function handleResponse (cb) {
  return function (err, res) {
    if (err) { return cb(err); }
    if (res.error) { return cb(new Error(res.error)); }
    if (typeof res === 'string') {
      try {
        var parsed = JSON.parse(res);
        res = parsed;
      } catch (e) {
        console.log('error parsing response');
      }
    }
    return cb(null, res);
  }
}


module.exports = {
    use: use
  , test: test
  , addFormattedUsers: addFormattedUsers
}