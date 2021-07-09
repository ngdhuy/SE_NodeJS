/**
 * * NodeJS - HTTP Module
 */

'use strict'

var http = require('http')
var url = require('url')

const hostname = 'localhost' // '127.0.0.1'
const port = 8000

// setup server
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end("<h1>Hello world</h1>")
})

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})