var client = require('./lib/client');

function test (key, cb) {
  client.test(key, cb);
}

function use (key) {
  if (!key) { return console.log('use must include a key!'); }
  client.use(key);
}

function addUsers (audience, users, type, cb) {
  client.addFormattedUsers(audience, formatUsers(users, type), cb);
}

function addFormattedUsers (audience, formattedUsers, cb) {
  client.addFormattedUsers(audience, formattedUsers, cb);
}

function removeUsers (audience, users, type, cb) {
  client.removeFormattedUsers(audience, formatUsers(users, type), cb);
}

function removeFormattedUsers (audience, formattedUsers, cb) {
  client.removeFormattedUsers(audience, formattedUsers, cb);
}

function formatUsers (users, type) {
  var formattedUsers = [];
  users.forEach(function (user) {
    formattedUsers.push({ type: user });
  });
  return formattedUsers;
}

module.exports = {
    use: use
  , test: test
  , addUsers: addUsers
  , addFormattedUsers: addFormattedUsers
  , formatUsers: formatUsers
  , removeUsers: removeUsers
  , removeFormattedUsers: removeFormattedUsers
}