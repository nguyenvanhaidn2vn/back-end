const mogoose = require('mongoose')

async function connection() {
    try{
        await mogoose.connect('mongodb://localhost:27017/E-Menu',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Ket Noi Thanh Cong')
    }catch (error){
        console.log('Ket Noi THat Bai')
    }
}
module.exports ={connection}