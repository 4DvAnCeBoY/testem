#!/usr/bin/env node

var ltTestem = require('lt-testem');
var pidFile = 'lt_tunnel.pid';

var opts = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
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
