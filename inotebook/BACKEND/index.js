const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 8080

app.use(express.json())
connectToMongo()

app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))

app.listen(port,()=>{
    console.log('listning at ',port);
})