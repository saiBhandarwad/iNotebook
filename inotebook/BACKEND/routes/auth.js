const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT_SIGNATURE = 'saiisagoodboy'

router.get('/', (req, res) => {
    res.send('hi this is auth slash endpoint')
})

//creating a new user (doesn't require authentication)

router.post('/signUp', [
    body('name', 'Enter a valid name and min length should be 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password length must be 6 character').isLength({ min: 6 }),
], async (req, res) => {
    try {
        const result = validationResult(req)
        //if any errors are occured
        if (!result.isEmpty()) {
            return res.status(401).json({ error: result.array() })
        }
        //check whether a user already exist or not
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(500).send({ msg: "email already exist" })
        } else {
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
            const response = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: { id: response.id }
            }
            const authToken = jwt.sign(data, JWT_SIGNATURE)
            res.json({authToken})
        }
    } catch (error) {
        res.status(500).send('internal error occured')
    }
})

//login endpoint

router.post('/login', [
    body('email', 'please provide valid email or email is not registered yet').isEmail(),
    body('password', 'password can not be blank').exists()
], async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    res.send(user)
})

module.exports = router