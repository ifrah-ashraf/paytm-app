const express = require('express')
const jwt = require('jsonwebtoken')
const zod = require('zod')
const { JWT_SECRET } = require ('../config')
const router = express.Router()
const {User} = require('../model/user')
const {Account} = require('../model/user')
const { authMiddleware } = require("../middleware")


const signupSchema = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post('/signup', async (req, res) => {
    
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const user = User.findOne({ 
        username: body.userName
    })

    const user_Id = user._id

    if(user._id){
        return res.json({
            message : "Email already taken"
        })
    }

    const dbUser = await User.create(body)

    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random()*10000
    })

    
    
    const JWT_token = jwt.sign({
        userId : dbUser._id
    },JWT_SECRET)

    res.json({
        messsage : "user created successfully" , 
        token : JWT_token
    })

})

const signinSchema = zod.object({
    userName : zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const body = req.body ;
    const { success } = signinSchema.safeParse(req.body)
    
    if (!success){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        userName: body.userName,
        password: body.password
    })

    if(user){
        const token =  jwt.sign({
            userId : user._id
        },JWT_SECRET)

        res.json({
            token : token
        })

        return;
    }

    res.status(411).json({
        message : "Error while logging in"
    })
    
})

const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

router.put('/',authMiddleware ,async (req, res) => {
    const body = req.body
    const {success} = updateSchema.safeParse(req.body)

    if (!success){
        return res.json({
            message: "Error while updating "
        })
    }
    
    const result = await User.updateOne( {
        _id: req.userId
    },body )
    
    if (result) {
        return res.status(200).json({
            message: "User updated successfully."
        });
    }
})

router.get("/bulk", async(req, res)=>{
    const filter =  req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex" : filter 
            }
        },{
            lastName : {
                "$regex": filter 
            }
        }]
    });

    res.json({
        user : users.map(user => ({
            userName : user.userName ,
            firstName : user.firstName ,
            lastName : user.lastName ,
            id : user._id
        })
    )
    })
})

module.exports = router