#!/usr/bin/env node

var ltTestem = require('lt-testem');
var pidFile = 'lt_tunnel.pid';
var lambdaTunnel = require('@lambdatest/node-tunnel');

var tunnelInstance = new lambdaTunnel();
// Replace <lambdatest-user> with your user and <lambdatest-accesskey> with your key.
var tunnelArguments = {
  user: process.env.LT_USERNAME || '<lambdatest-user>',
  key: process.env.LT_ACCESS_KEY || '<lambdatest-accesskey>',
  pidFile : pidFile
};

process.on('SIGINT', function() {
  if (tunnelInstance !== null) {
      tunnelInstance.stop(function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log('tunnelInstance Disconnected');
        process.exit();
      }
    });
  }
});

tunnelInstance.start(tunnelArguments, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Tunnel Started");
  }
});

var opts = {
  username: process.env.LT_USERNAME,
  accessKey: process.env.LT_ACCESS_KEY,
  verbose: true,
  tunnel:true,
  logger: console.log,
  pidfile: pidFile
};

console.log(opts);
if (process.env.TRAVIS_JOB_NUMBER) {
  opts.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
}

ltTestem.connect(opts).then(function () {
  process.exit();
});
