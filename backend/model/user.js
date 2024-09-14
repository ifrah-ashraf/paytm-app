const mongoose = require('mongoose');
const schema = mongoose.Schema ;

const userSchema = new schema({
    userName:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String ,
        require:true,
        trim:true
    },

    password:{
        type:String,
        require:true,
        trim:true
    }
})

const accountSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = new mongoose.model("User", userSchema);
const Account = new mongoose.model("Account", accountSchema)

module.exports= {
    User,
    Account
}