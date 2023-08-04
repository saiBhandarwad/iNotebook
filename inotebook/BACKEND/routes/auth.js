const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('hi this is auth slash endpoint')
})

//creating a new user (doesn't require authentication)
router.post('/',(req,res)=>{
    try {
        const user = User(req.body)
        user.save()
        res.send(req.body)
    } catch (error) {
        console.log('error occured in post at auth.js while creating user');
    }
})

module.exports = router