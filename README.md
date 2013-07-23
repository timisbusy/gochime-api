# gochime-api

GoChime API wrapper for Node.js.

## install

    npm install gochime

## test your api token

    var gochime = require('gochime');
    gochime.test('MY_API_TOKEN', function (err, res) {
      if (err) { throw err; }
      console.log(res); // should log { success: true }
    });

## use

    var gochime = require('gochime');
    gochime.use('MY_API_TOKEN');
    gochime.addUsers('MY_AUDIENCE_ID', ['jim@jimbo.com'], 'email', function (err, res) {
      if (err) { throw err; }
      console.log(res); // should log { success: true }
    });

## add users of multiple types

    var gochime = require('gochime');
    gochime.use('MY_API_TOKEN');
    gochime.addFormattedUsers('MY_AUDIENCE_ID', [{ email: 'jim@jimbo.com'}, { email: 'tim@jimbo.com'}, { phone: '5555555555'}, { fbuid: '585191676' }], function (err, res) {
      if (err) { throw err; }
      console.log(res); // should log { success: true }
    });

## run tests

First, create a conf.js file in the package's root directory. It should look like this:

    module.exports = {
        token: "YOUR_TOKEN"
      , testAudience: "YOUR_AUDIENCE_ID"
    }

Then run:
    
    node test.js

The response should be:

    { success: true }
    { success: true }
    { success: true }