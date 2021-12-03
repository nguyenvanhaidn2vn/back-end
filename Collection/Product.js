const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Product= new Schema({
    name:{
        type:String,
        default:''
    },
    info:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        min:0,
        default:0,
    },
    image:{
        type:String,
        default:'',
    }
})
module.exports =mongoose.model('products',Product)