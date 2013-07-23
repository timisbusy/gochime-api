var request = require('request');

var currentToken
  , baseUrl = 'https://sstaging.gochime.com/';

// PUBLIC

function use (token) {
  currentToken = token;
}

function test (token, cb) {
  if (!token || typeof token !== 'string') { return cb(new Error("You must provide a token to test.")); }
  var options = {
    method: 'POST',
    url: baseUrl + 'audience/test',
    json: {}
  };
  sendRequest(options, cb, token);
}

function addFormattedUsers (audience, users, cb) {
  var options = {
    method: 'POST',
    url: baseUrl + 'audience/members',
    json: {
        audience: audience
      , members: users
    }
  };
  sendRequest(options, cb);
}

function removeFormattedUsers (audience, users, cb) {
  var options = {
    method: 'DELETE',
    url: baseUrl + 'audience/members',
    json: {
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
    options.json.token = useToken;
  } else {
    options.json.token = currentToken;
  }

  request(options, handleResponse(cb));
}

function handleResponse (cb) {
  return function (err, res, data) {
    if (err) { return cb(err); }
    if (data.error) { return cb(new Error(data.error)); }
    if (typeof data === 'string') {
      try {
        var parsed = JSON.parse(data);
        data = parsed;
      } catch (e) {
        console.log('error parsing response');
      }
    }
    return cb(null, data);
  }
}


module.exports = {
    use: use
  , test: test
  , addFormattedUsers: addFormattedUsers
  , removeFormattedUsers: removeFormattedUsers
}