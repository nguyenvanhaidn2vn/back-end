const express = require('express')
var morgan = require('morgan')
const jwt= require("jsonwebtoken")
const app = express()
const port = 4444;
const route =require('./route/index');
const cors=require('cors')
const database = require('./utils/database')
const path = require('path')
database.connection();
require('dotenv').config();
app.use(morgan('combined'))
app.use(cors())
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())
app.use('/images',express.static(path.join(__dirname,'/public/image/product/')))


route(app)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

})