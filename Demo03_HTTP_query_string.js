/**
 * * Read and access query string in url request
 */

 'use strict'

 var http = require('http')
 var url = require('url')
 
 const hostname = 'localhost'
 const port = 8000
 
 // GET: localhost:8000?a=100&b=hello
 const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'})
    let query = url.parse(req.url, true).query;
    console.log(query)
    res.write(`Data have a = ${query.a} and b = ${query.b}`)
    return res.end()
 })
 
 server.listen(port, hostname, () => {
     console.log(`Server is running at http://${hostname}:${port}`)
 })