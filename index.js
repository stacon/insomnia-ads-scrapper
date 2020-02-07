const {serverStart} = require('./libs/serverStart');
const {herokuApp} = require('./configuration.json');

serverStart();

// If it's not running as a heroku app the rest of code will not be executed
if (!herokuApp.enabled) {
  return;
}
const http = require('http');

http.createServer((_, response)=> {
  response.writeHead(200);
  response.end();
}).listen(process.env.PORT || 5000);
