const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv =require('dotenv')
const path = require('path')

dotenv.config({path:path.join(__dirname,"config/config.env")})

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))

const user = require('./routes/User')
const astrologer = require('./routes/astrologer')
const admin = require('./routes/Admin')

app.use('/api/v1',user)
app.use('/api/v1',astrologer)
app.use('/api/v1',admin);


module.exports = app
