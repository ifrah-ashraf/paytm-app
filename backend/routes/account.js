const express = require("express")
const mongoose = require('mongoose');
const router = express.Router()
const {Account} = require('../model/user')
const { authMiddleware } = require("../middleware")

router.get("/balance", authMiddleware,async (req, res) => {
    const account = await Account.findOne({
        userId : req.userId
    })

    if(account){
        res.json({
            balance : account.balance
        })
    }

})

router.post("/transfer", authMiddleware , async (req , res) => {
    const session =  await mongoose.startSession();

    session.startTransaction();
    const {amount , to} = req.body

    //fetch the account which is sending the balance

    const account = await Account.findOne({userId: req.userId}).session(session)

    if (!account || account.balance <amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficient balance"
        })
    }

    //geting the receiver account info
    const toAccount = await Account.findOne({userId : to}).session(session)

    if (!toAccount){
        res.status(400).json({
            message:"Invalid account"
        })
    }

    await Account.updateOne({userId : req.userId}, {$inc : {balance : -amount} }).session(session)
    await Account.updateOne({userId : to}, {$inc : {balance : amount } }).session(session)

    await session.commitTransaction()
    res.status(200).json({
        message:"transaction successful"
    })
}) 
module.exports = router