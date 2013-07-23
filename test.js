var gochime = require('./index')
  , conf = require('./conf');

gochime.test(conf.token, function (err, res) {
  if (err) { throw err; }
  console.log(res);
});

gochime.use(conf.token);

gochime.addUsers(conf.testAudience, ['test@gochime.com'], 'email', function (err, res) {
  if (err) { throw err; }
  console.log(res);
});

gochime.addFormattedUsers(conf.testAudience, [{email:'test@gochime.com'}, {phone: '5555555555'}], function (err, res) {
  if (err) { throw err; }
  console.log(res);
});