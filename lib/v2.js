var request = require("request")
  , baseUrl = "https://api.gochime.com/";


function handleResponse (cb) {
  return function (err, res, data) {
    if (err) { return cb(err); }
    if (data.error) { return cb(new Error(data.error)); }
    if (typeof data === "string") {
      try {
        var parsed = JSON.parse(data);
        data = parsed;
      } catch (e) {
        console.log("error parsing response");
      }
    }
    return cb(null, data);
  }
}

function _request (key, method, url, message, cb) {
  if (!key) { return cb(new Error("You must provide an api key."))}
  var post = {
    method: method,
    url: url,
    json: message
  };
  post.json.token = key;
  request.post(post, handleResponse(cb));
}


function client () {

  function identify (key, message, cb) {
    _request(key, "POST", baseUrl + "identify", message, cb);
  }

  function track (key, message, cb) {
    _request(key, "POST", baseUrl + "track", message, cb);
  }

  function alias (key, message, cb) {
    _request(key, "POST", baseUrl + "alias", message, cb);
  }

  function test (key, cb) {
    if (!key || typeof key !== "string") { return cb(new Error("You must provide a key to test.")); }
    
    var message = {};
    _request(key, "POST", baseUrl + "audience/test", message, cb);
  }

  function addUsers (key, audience, users, cb) {
    var message = {
        audience: audience
      , members: users
      };
    _request(key, "POST", baseUrl + "audience/members", message, cb);
  }

  function removeUsers (key, audience, users, cb) {
    var message = {
        audience: audience
      , members: users
      };
    _request(key, "DELETE", baseUrl + "audience/members", message, cb);
  }

  return {
      identify: identify
    , track: track
    , alias: alias
    , test: test
    , addUsers: addUsers
    , removeUsers: removeUsers
    }
}



module.exports = client;
