const express = require("express");
const app = express()
const cors = require('cors')
/* const User = require('./model/user') */
const mainRouter = require('./routes/index')
const dotenv = require("dotenv")
const db = require('./db')
dotenv.config()

const PORT = process.env.PORT || 3002
app.use(cors())
app.use(express.json())
db()

app.use(express.json())
app.use('/api', mainRouter)



app.listen(PORT, () => console.log(`server is running on port ${PORT}`))



