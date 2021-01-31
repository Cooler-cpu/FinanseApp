const { Router } = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')

const router = Router()
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({extended: false})

const config = require('config')


//models
const User = require('../models/User')
const Spendings = require('../models/Spendings')
const Earnings = require('../models/Earnings')



// api/profile
router.post(
    '/profile', urlencodedParser, async (req, res) => 
    {
        try{
            
        console.log("id", req.body.userID);

          const userId = req.body.userID;
          const user = await User.findOne({_id: userId})

          console.log("user", user);

            var Items = {
                 "items": [
                     { "id": 1, "name": String(user["email"]), "balanse": String(user["balanse"])},
                   ] 
             }


          res.send(Items);
        } catch (e){
            console.log('Profile query Error', e)
        }
    }   
)

router.post(
    '/balanseSet', urlencodedParser, 

    [
        check('data', 'balanse is not valid').isNumeric()
    ],

    async (req, res) =>
    {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        {
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data entered'
            })
        }

        try{
            const data = req.body.data;

            const userID = req.body.userID;
            
            await User.findOneAndUpdate(
      
                {'_id': String(userID)},
                { $set: {balanse: data}}, // param update
                function(err, result){
                     
                    console.log(result);
                }
            );

            res.status(200);
        }catch(e){
            console.log("BalanseSET query error", e)
        }
    }
)

//add spend
router.post(
    '/addSpending', urlencodedParser, 
    [
        check('cost', 'cost is not valid').isNumeric()
    ],

    async (req, res) =>
    {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty())
            {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data entered'
                })
            }
            
            const userID = String(req.body.userID);

            const userSpends = await Spendings.find({ spendsBy:  userID })
            
            //################################
            // if user dont have a spends data
            if(!userSpends.length){


                let Spend = new Spendings({
                    spendsBy: req.body.userID,
                    SpendingsData: [{
                        date: new Date(), 
                        cost: req.body.cost,
                        category: req.body.category,
                        note: req.body.note
                    }]
                })
                const response = await Spend.save();

                // res.json({
                //     data: response
                // });
                res.json(200);
                       //################################
            } else {   // add data to array of spendings


                let objSpend = { 
                    date: new Date(),
                    cost: String(req.body.cost), 
                    category: String(req.body.category),
                    note: String(req.body.note)
                };

                Spendings.findOneAndUpdate({spendsBy: req.body.userID}, { $push: { SpendingsData: objSpend } },
                    function (error, success) {
                                if (error) {
                                    console.log("db error", error);
                                } else {
                                    console.log(success);
                                }
                            }
                    )

                res.json(200);
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'add Spending server-error'}); //server error
        }
    }
)

//get all spendings
router.post(
    '/getSpendings', urlencodedParser, 
    async (req, res) =>
    {
        try{
            userID = req.body.userID.userId;

            const userSpends = await Spendings.find({ spendsBy:  userID });

            if(!userSpends.length){
                // res.send("data is dont exist");
            }
            else{

                const DataSpending = [];
                for(let key in userSpends[0].SpendingsData){
                    DataSpending[key] = userSpends[0].SpendingsData[key]
                }   

                res.send(DataSpending);
            }

        }catch(e){
            console.log("user spendings query error", e);
        }
    }
)


//add earning  

router.post(
    '/addEarning', urlencodedParser, 
    [
        check('cost', 'cost is not valid').isNumeric()
    ],

    async (req, res) =>
    {

        try {

        const errors = validationResult(req);

        if (!errors.isEmpty())
        {
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data entered'
            })
        }
    
        const userID = String(req.body.userID);

        const userEarnings = await Earnings.find({ earnBy:  userID })

        //################################
        // if user dont have a spends data
        if(!userEarnings.length){

                let Earn = new Earnings({
                    earnBy: req.body.userID,
                    EarningsData: [{
                        date: new Date(), 
                        cost: req.body.cost,
                        category: req.body.category,
                        note: req.body.note,
                        type: "earn"
                    }]
                })
                const response = await Earn.save();

                // res.json({
                //     data: response
                // });
                res.json(200);
                       //################################
            } else {   // add data to array of spendings


                let objEarn= { 
                    date: new Date(),
                    cost: String(req.body.cost), 
                    category: String(req.body.category),
                    note: String(req.body.note)
                };

                Earnings.findOneAndUpdate({earnBy: req.body.userID}, { $push: { EarningsData: objEarn } },
                    function (error, success) {
                                if (error) {
                                    console.log("db error", error);
                                } else {
                                    console.log(success);
                                }
                            }
                    )

                res.json(200);
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'add Spending server-error'}); //server error
        }

    }
)


//get all Earnings
router.post(
    '/getEarnings', urlencodedParser, 
    async (req, res) =>
    {
        try{
            userID = req.body.userID.userId;

            const userEarnings = await Earnings.find({ earnBy:  userID });

            if(!userEarnings.length){
                // res.send("data is dont exist");
            }
            else{

                const DataEarnings = [];
                for(var key in userEarnings[0].EarningsData){
                    DataEarnings[key] = userEarnings[0].EarningsData[key]
                }   

                res.send(DataEarnings);
            }

        }catch(e){
            console.log("user spendings query error", e);
        }
    }
)


//
router.post(
    '/getRecordSpends/toDate',  urlencodedParser, 
    async (req, res) =>
    {

    const userID = req.body.userID;
    const DateStart = req.body.DateStart;
    const DateEnd = req.body.DateEnd;

    const start = new Date(String(DateStart));
    const end = new Date(String(DateEnd));

    console.log("DateStart", start);
    console.log("DateEnd", end);

     const userSpends = await Spendings.find({ spendsBy:  userID });

     const DataSpending = [];
     for(let key in userSpends[0].SpendingsData){
         DataSpending[key] = userSpends[0].SpendingsData[key]
     }   

     const CurrDataSpending = [];
     DataSpending.map( element => {
        if(element.date >= start && element.date <= end){
        CurrDataSpending.push(element);
        }
        else{
            return false
        }
     })

        res.send(CurrDataSpending);
    }
)


router.post(
    '/getRecordEarns/toDate', urlencodedParser, 
    async (req, res) =>
    {
    const userID = String(req.body.userID);
    const DateStart = req.body.DateStart;
    const DateEnd = req.body.DateEnd;

    const start = new Date(String(DateStart));
    const end = new Date(String(DateEnd));
    console.log(userID)

    const userEarnings = await Earnings.find({ earnBy:  userID });


    const DataEarnings = [];
    for(let key in userEarnings[0].EarningsData){
        DataEarnings[key] = userEarnings[0].EarningsData[key]
    } 

    const CurrDataEarnings = [];
    DataEarnings.map( element => {
        if(element.date >= start && element.date <= end){
        CurrDataEarnings.push(element);
        }
        else{
            return false
        }
     })

        res.send(CurrDataEarnings);
    }
)


module.exports = router




