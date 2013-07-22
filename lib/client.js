var request = require('request');

var currentKey
  , baseUrl = 'https://api.gochime.com/';

// PUBLIC

function use (key) {
  currentKey = key;
}

function test (key, cb) {
  if (!key || typeof key !== 'string') { return cb(new Error("You must provide a key to test.")); }
  var options = {
    method: 'POST',
    url: baseUrl + 'test',
    data: {}
  };
  sendRequest(options, cb, key);
}

function addUser (audience, user, type, cb) {
  var options = {
    method: 'POST',
    url: baseUrl + 'customaudiences',
    data: {
        audience: audience
      , user: user
      , type: type
    }
  };
  sendRequest(options, cb);
}

// PRIVATE

function sendRequest (options, cb, useKey) {
  if (!useKey && !currentKey) { return cb(new Error("No key provided for call.")); }
  if (useKey) {
    options.data.apiKey = useKey;
  } else {
    options.data.apiKey = currentKey;
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
  , addUser: addUser
}