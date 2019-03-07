const {serverStart} = require('./libs/serverStart');

const http = require('http');
serverStart();

http.createServer((request, response)=> {
  console.log(request);
  response.writeHead(200);
  response.end();
}).listen(process.env.PORT || 5000);