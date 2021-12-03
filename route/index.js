const Account = require('../Collection/Account')
const jwt = require('jsonwebtoken')
const Product = require('../Collection/Product');
const multer= require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image/product')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.')[1])
  }
})
var upload = multer({ storage: storage })
const route = (app)=>{
    app.post('/signin',async(request,response)=>{
        const {userName,passWord}=request.body;
        try {
          const findAccount=await Account.findOne({userName});
          console.log(findAccount)
          if(findAccount)
          {
            if(passWord===findAccount.passWord)
            {
              const token= await jwt.sign({_id:findAccount._id},'abcbca123')
              return response.json({
                success:true,
                message:'Đăng nhập thành công',
                token,
                user:{
                  lastName:findAccount.lastName,
                  firstName:findAccount.fisrtName,
                  userName:findAccount.userName,
                  role:findAccount.role
                }
              })
            }
            else
              return response.json({
                success:false,
                message:'Sai mật khẩu',
              })
          }
          else
            return response.json({
              success:false,
              message:'Tài khoản không tồn tại'
            })
        } catch (error) {
          return response.json({
            success:false,
            message:'Lỗi Server'
          })
        }

        
      })
      
    app.post('/allPost',async(request,response)=>{
        try {
          const getToken= request.headers.authorization.split(' ')[1];
        const verifyToken = await jwt.verify(getToken,'abcbca123');
        console.log(verifyToken)
        } catch (error) {
          return response.json({
            success:false,
            message:'Token khong ton tai'
          })
        }
      })
    app.post('/create-product',upload.single('image'),async(request,response)=>{
        console.log(request.file);
        const {name,price,info}=request.body;
        if(!name)
          return response.json({
            success:false,
            messages:'tên sản phẩm không được để trống'
          })
        try{
          const newProduct = new Product({
            name,
            info,
            price,
            image: '/images/'+request.file.filename,

          })
          const saveProduct=await newProduct.save();
          return response.json({
            success:true,
            product:saveProduct
          })
         
        }catch(err){
            return response.json({
              success:false,
            })
        }
    })
    
    app.get('/list-product',async(request,response)=>{
      try{
        const products = await Product.find({})
        const newProducts = products.map(value=>{
          return{
            _id:value._id,
            name:value.name,
            info:value.info,
            price:value.price,
            image:process.env.API_URL+value.image
          }
        })
        return response.json({
          products:newProducts
        })
      }catch(err){
        return response.json({
          success:false,
          message:'Lỗi Server'
        })
      }
    })
    app.post('/create-staff',async(request,response)=>{
      const {lastName,firstName,role,userName,passWord}=request.body;
        try {
            const findAccount = await Account.findOne({userName});
            if(findAccount)
              return response.json({
                success:false,
                messages:'Tài khoản tồn tại rồi'
              })
            else{
              const account = new Account({
                userName,
                passWord,
                lastName,
                firstName,
                role,
            })
            const newAccount=await account.save()
            return response.json({
              success:true,
              account:newAccount
            })
            }
           
        } catch (error) {
          console.log(error.toString())
          return response.json({
            success:false,
            messages:'Lỗi Server'
          })
        }



          const token =await jwt.sign({_id:123,name:'NguyenVanHai'},'abcbca123');
          return res.json({
            success: true,
            token
          })
    })
}
module.exports = route