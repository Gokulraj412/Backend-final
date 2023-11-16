const catchAsyncError = require('../middlewares/catchAsyncError')
const Admin = require('../models/adminModel')

//registerAdmin  -  {{base_url}}/api/v1/admin/register
exports.registerAdmin= catchAsyncError(async (req, res, next)=>{
    const{email,password}= req.body;
    
    let BASE_URL = process.env.BACKEND_URL
    if(process.env.NODE_ENV === 'production'){
     BASE_URL = `${req.prortocol}://${req.get('host')}`
    }
 
 
  const admin =   await Admin.create({
    email,
    password
 
    });
    res.status(200).json({
        success:true,
        admin
       }) 
 
 })
 //loginAdmin - {{base_url}}/api/v1/admin/login
 exports.loginAdmin = catchAsyncError(async(req, res, next)=>{
   const{email,password }= req.body
 
   if(!email||!password){
     return next(new ErrorHandler('Please enter name,password',400))
   }
   //finding the user database
 
   const admin = await Admin.findOne({email}).select('+password');
   if(!admin){
     return next(new ErrorHandler('Invalid email or password ',401))
   }
   if(!await admin.isValidPassword(password)){
     return next(new ErrorHandler('Invalid email or password ',401))
   }
   res.status(200).json({
    success:true,
    admin
   }) 
 
 })