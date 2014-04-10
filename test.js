var gochime = require('./index')
  , conf = require('./conf');

gochime.test(conf.token, function (err, res) {
  if (err) { throw err; }
  console.log('test result: ', res);
});

gochime.addUsers(conf.token, conf.testAudience, [{ email: 'test@gochime.com' }], function (err, res) {
  if (err) { throw err; }
  console.log('add users result: ',res);
});

gochime.removeUsers(conf.token, conf.testAudience, [{ email:"test@gochime.com" }, { phone: "5555555555" }], function (err, res) {
  if (err) { throw err; }
  console.log('remove users result: ', res);
});
