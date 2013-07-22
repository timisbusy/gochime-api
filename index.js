var client = require('./lib/client');

function test (key, cb) {
  client.test(key, cb);
}

function use (key) {
  if (!key) { return console.log('use must include a key!'); }
  client.use(key);
}


function addUser (audience, user, type, cb) {
  client.addUser(audience, user, type, cb);
}

module.exports = {
    use: use
  , test: test
  , addUser: addUser
}