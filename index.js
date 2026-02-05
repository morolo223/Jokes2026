const http = require('http')
const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, 'data')

const server = http.createServer((req,res)=>{

    if(req.url == '/jokes' && req.method == 'GET') getAllJokes(req,res)
    if(req.url == '/jokes' && req.method == 'POST') addJokes(req,res)

})

server.listen(3000)

function getAllJokes(req,res){
     let dir = fs.readdirSync(dataPath)

     console.log(dir)
     let allJokes = []

     dir.forEach(dirFile => {
        let file = fs.readFileSync(path.join(dataPath,dirFile))
        let jokeJson = Buffer.from(file).toString()
        let joke = JSON.parse(jokeJson)
        allJokes.push(joke)

     });
    res.end(console.log(JSON.stringify(allJokes)))
}


function addJokes(req,res){
    let data = ''
    req.on('data', (chunk)=>{
        data += chunk
    })
    req.on('end', function(){
        let joke = JSON.parse(data)
        joke.likes = 0
        joke.dislikes = 0

        let dir = fs.readdirSync(dataPath)
        let fileName = dir.length + '.json'
        let filePath = path(dataPath, fileName)
        fs.writeFileSync(filePath, JSON.stringify(joke))
    })
    res.end()
}