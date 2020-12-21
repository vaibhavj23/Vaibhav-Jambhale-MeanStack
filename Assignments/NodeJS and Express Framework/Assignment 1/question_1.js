var http= require('http');
var server=http.createServer((function(request,response)
{
    response.writeHead(200,{"Content-Type" : "text/plain"});
	//response.end(`I am listening to port: ${server.address().port}`);
}));

server.listen(3000);

console.log("abc");
