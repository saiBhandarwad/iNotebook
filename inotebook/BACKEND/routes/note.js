const express = require('express')

const router = express.Router()

router.get('/',(req,res)=>{
    res.send('hi i am note slash endpoint')
})

module.exports = router