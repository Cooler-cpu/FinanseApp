const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

const config = require('config');

// /api/auth/register
router.post(
    '/register', urlencodedParser,
     [
        check('email', 'Email is not valid').isEmail(),
        check('password','Password minimal length 6 symbols').isLength({min: 6})
     ],
    async (req, res) => {
    try {
        console.log("Данные", req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data entered'
            })
        }
        console.log("Данные", req.body);
        // console.log(req.body)
        const {email, password} = req.body

        console.log(email, password);

        const candidate = await User.findOne({ email: email })

        if(candidate)
        {
           return res.status(400).json({message: "User exists "})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User ({email, password: hashedPassword})

        await user.save() //when promise is end user is registered

        res.status(201).json({message: 'User is registered'})

    } catch(e){
        res.status(500).json({message: 'try again server-error'}); //server error
        console.log(e);
    }
})
//  /api/auth/login
router.post(
    '/login', urlencodedParser,
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data into login in system'
            })
        }

        console.log("Данные", req.body);
        const {email, password} = req.body

        const user = await User.findOne({ email })

        console.log(user);

        if(!user)
        {
          return res.status(400).json({message: 'User is not found '})  
        }
        
        const isMatch = await bcrypt.compare(password, user.password)  // (pass entered, pass in bd)

        if(!isMatch){  // if email true and password false
            return res.status(400).json({message : 'invalid password, try again'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})

    } catch(e){
        res.status(500).json({message: 'try again server-error'}); //server error
    }
})


module.exports = router