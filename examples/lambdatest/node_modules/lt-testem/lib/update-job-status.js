var Bluebird = require('bluebird');
var request = require("request");

var requestAsync = Bluebird.promisify(request);

module.exports = function (sessionID, auth, data) {
  var url = ["/v1/", auth.username, "/sessions/", sessionID].join("");

  return requestAsync({
    method: "PUT",
    uri: ["https://", auth.username, ":", auth.accessKey, "@api.lambdatest.com/automation/api", url].join(""),
    json: true,
    body: data
  }).then(function (response) {
    return response.body;
  });
};
