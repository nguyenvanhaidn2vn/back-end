const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
    userName:{
        type:String,
        required:true
    },
    passWord:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    role:{  
        type:String,
        default:'USER',
        enum:['USER','ADMIN','CHEF']
    }
})

module.exports = mongoose.model('accounts',Account);
