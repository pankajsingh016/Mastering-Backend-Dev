//http: hyper text transfer protocol
//https: hyper text transfer protocol secured

const http = require('http');

const server = http.createServer(function (req,res){
    res.end('Hello-World');
})

server.listen(3000);