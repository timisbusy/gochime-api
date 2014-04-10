# gochime-api

GoChime API wrapper for Node.js. To use the API, you will first need to create an account at [GoChime](https://www.gochime.com). You can also connect with our API in some very interesting ways through our partner [Segment.io](https://segment.io).

## install

    npm install gochime

## test your api token

    var gochime = require('gochime');
    gochime.test('MY_API_TOKEN', function (err, res) {
      if (err) { throw err; }
      console.log(res); // should log { success: true }
    });

## add users to an audience

    var gochime = require('gochime');
    gochime.addUsers('MY_API_TOKEN', 'MY_AUDIENCE_ID', [{ email: 'jim@jimbo.com'}, { email: 'tim@jimbo.com'}, { phone: '5555555555'}, { fbuid: '585191676' }], function (err, res) {
      if (err) { throw err; }
      console.log(res); // should log { success: true }
    });

## remove users from an audience

    var gochime = require('gochime');
    gochime.removeUsers('MY_API_TOKEN', 'MY_AUDIENCE_ID', [{ email: 'jim@jimbo.com'}, { email: 'tim@jimbo.com'}, { phone: '5555555555'}, { fbuid: '585191676' }], function (err, res) {
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
