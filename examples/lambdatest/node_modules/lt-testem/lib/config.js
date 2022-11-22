var defaults = require('./default-options');

function Config (options) {
  this.options = Object.assign({}, defaults, options);

  this._auth = {
    username:  this.options.username  || process.env.LT_USERNAME,
    accessKey: this.options.accesskey || process.env.LT_ACCESS_KEY,
    build:     this.options.build,
    tunnel: this.options.tunnel,
    tunnelIdentifier: this.options.tunnelIdentifier
  };

  this._desired = {
    "browserName"      : this.options.browser,
    "deviceName"       : this.options.deviceName,
    "deviceOrientation": this.options.deviceOrientation,
    "tags"             : this.options.tags,
    "name"             : this.options.sessionName,
    "public"           : this.options.visibility,
    "build"            : this._auth.build,
    "tunnel" : this._auth.tunnel,
    "tunnelIdentifier" : this._auth.tunnelIdentifier
  };

  if (this.options.version) {
    this._desired.version = this.options.version;
  }

  if (this.options.maxDuration) {
    this._desired.maxDuration = this.options.maxDuration;
  }

  if (this.options.platform.match(/iOS|Android/)) {
    // Appium requires to seperate strings, https://www.lambdatest.com/capabilities-generator/
    this._desired.platformName = this.options.platform;

    if (this.options.platformVersion) {
      this._desired.platformVersion = this.options.platformVersion;
    }
  } else {
    // Selenium just one
    this._desired.platform = this.options.platform || '';

    if (this.options.platformVersion) {
      this._desired.platform += ' ' + this.options.platformVersion;
    }
  }

  this.url = this.options.url;
  this.timeout = this.options.timeout;
  this.connect = this.options.connect;
  this.attach = this.options.attach;

  this._launcherOptions = {
    user: this._auth.username,
    key: this._auth.accessKey,
    tunnelIdentifier: this._auth.tunnelIdentifier,
    vmVersion: this.options.vmVersion,
    tunnelDomains: this.options.tunnelDomains,
    logger: console.log,
    verbose: true,
    connectRetries: this.options.connectRetries
  };
}

Config.prototype.desired = function() {
  return this._desired;
};

Config.prototype.auth = function() {
  return this._auth;
};

Config.prototype.launcherOptions = function() {
  return this._launcherOptions;
};

module.exports = Config;
