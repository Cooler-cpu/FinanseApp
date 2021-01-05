const { Router } = require('express')
const bcrypt = require('bcryptjs')
 const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Spendings = require('../models/Spendings')
const router = Router()
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

const config = require('config');


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
                                    console.log("eroor flag", error);
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
                for(var key in userSpends[0].SpendingsData){
                    DataSpending[key] = userSpends[0].SpendingsData[key]
                }   

                res.send(DataSpending);
            }

        }catch(e){
            console.log("user spendings query error", e);
        }
    }
)


module.exports = router




