const mongoose = require('mongoose')

const connectToMongo = async() =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/newInoteBook')
    console.log('connection successfull');
}  
module.exports = connectToMongo