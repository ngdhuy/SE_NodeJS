/**
 * * Access file on server
 */

'use strict'

const http = require('http')
const fs = require('fs')
var url = require('url')


const hostname = 'localhost'
const port = 8000

const loadData = () => {
    const data = fs.readFileSync('data.json', {encoding:'utf-8', flag:'r'}, (error, data) => {
        if (error) {
            console.log(error)
            return null;
        } else {
            return data
        }
    })
    return data
}

const saveData = () => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(listProducts), {encoding: 'utf-8', flag:'w'}, () => {
            console.log("=> File is saved")
        })
    } catch (error) {
        console.log(error)
    }
}

var listProducts = JSON.parse(loadData())

const apiGet = (req, res) => {
    var route = req.url.substr(1)

    if (listProducts == null) {
        res.writeHead(404, {'Content-Type' : 'text/html'})
        res.end("Cannot access file")
    } else {
        res.writeHead(200, {'Content-Type' : 'text/json'})
        if(route == '')
            res.write(JSON.stringify(listProducts))
        else {
            listProducts.forEach(item => {
                if(item.id == route)
                    res.write(JSON.stringify(item))
            })
        }
        return res.end()
    }
}

const apiPost = (req, res) => {
    try {
        var reqBodyData = ''
    
        req.on('data', (data) => {
            reqBodyData += data
        })
        req.on('end', () => {
            let item = JSON.parse(reqBodyData)
            listProducts.push(item)
        })
        
        res.writeHead(200, {'Content-Type' : 'text/text'})
        res.end("Create new item is success")
    } catch (error) {
        console.log(error)
        res.writeHead(500, {'Content-Type' : 'text/text'})
        res.end("Cannot create new item")
    }
}

const apiPut = (req, res) => {
    try {
        var reqBodyData = ''
    
        req.on('data', (data) => {
            reqBodyData += data
        })
        req.on('end', () => {
            let item = JSON.parse(reqBodyData)
            listProducts.forEach((product) => {
                if (product.id == item.id) {
                    product.name = item.name
                    product.price = item.price
                }
            })
        })
        
        res.writeHead(200, {'Content-Type' : 'text/text'})
        res.end("Item is updated")
    } catch (error) {
        console.log(error)
        res.writeHead(500, {'Content-Type' : 'text/text'})
        res.end("Cannot update item")
    }
}

const apiPatch = (req, res) => {
    try {
        saveData()
        res.writeHead(200, {'Content-Type' : 'text/text'})
        res.end("File is saved")
    } catch (error) {
        console.log(error)
        res.writeHead(500, {'Content-Type' : 'text/text'})
        res.end("Cannot access file")
    }
}

const apiDelete = (req, res) => {
    try {
        var reqBodyData = ''
    
        req.on('data', (data) => {
            reqBodyData += data
        })
        req.on('end', () => {
            let item = JSON.parse(reqBodyData)
            for(let i = 0; i < listProducts.length; i++) {
                if (listProducts[i].id == item.id) {
                    listProducts.splice(i, 1)
                }
            }
        })
        
        res.writeHead(200, {'Content-Type' : 'text/text'})
        res.end("Item is updated")
    } catch (error) {
        console.log(error)
        res.writeHead(500, {'Content-Type' : 'text/text'})
        res.end("Cannot Delete item")
    }
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`)
    switch(req.method){
        case "GET":
            apiGet(req, res)
            break
        case "POST":
            apiPost(req, res)
            break
        case "PUT":
            apiPut(req, res)
            break
        case "PATCH":
            apiPatch(req, res)
            break
        case "DELETE":
            apiDelete(req, res)
            break
    } 
})

server.listen(port, hostname, () => {
    console.clear()
    console.log(`Server is running at http://${hostname}:${port}`)
})