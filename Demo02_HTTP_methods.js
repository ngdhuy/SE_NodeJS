/**
 * * Access file system on server
 */

'use strict'

var http = require('http')
var fs = require('fs')

const hostname = 'localhost'
const port = 8000

const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => {
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write(data)
        return res.end()
    })
})

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})