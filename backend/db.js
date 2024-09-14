const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const uri = process.env.MONGO_URI

const db = async () => {
    try {
        const con = await mongoose.connect(uri)
        console.log(`mongodb connected : ${con.connection.host}`)
    }
    catch(error){
        console.error(error)
    }
}

module.exports = db;

