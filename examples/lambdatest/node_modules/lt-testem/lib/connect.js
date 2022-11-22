var Bluebird = require('bluebird');
var lambdatestConnectLauncher = require('@lambdatest/node-tunnel');
var lambdatestConnectLauncherAsync = Bluebird.promisify(lambdatestConnectLauncher);

module.exports = function connect(opts) {
  opts = Object.assign({}, {
    detached: true,
    connectRetries: 2,
    downloadRetries: 2
  }, opts);

  return lambdatestConnectLauncherAsync(opts);
};
