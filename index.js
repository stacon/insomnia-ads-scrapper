const {serverStart} = require('./libs/serverStart');

const http = require('http');
serverStart();

http.createServer((_, response)=> {
  response.writeHead(200);
  response.end();
}).listen(process.env.PORT || 5000);
