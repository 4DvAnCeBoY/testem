#!/usr/bin/env node

var ltTestem = require('lt-testem');
var pidFile = 'lt_tunnel.pid';

ltTestem.disconnect(pidFile);
