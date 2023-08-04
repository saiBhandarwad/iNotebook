const connectToMongo = require('./db')
const express = require('express')

connectToMongo()
const app = express()
const port = 8080

app.get('/',(req,res)=>{
    res.send('<h1 style="color:blue;">A Blue Heading</h1>')
})

app.listen(port,()=>{
    console.log('listning at ',port);
})