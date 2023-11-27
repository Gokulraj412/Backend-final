const catchAsyncError = require('../middlewares/catchAsyncError')
const UserDetail = require('../models/UserDetail')
const APIFeatures = require("../utils/apiFeatures")

// register user -  {{base_url}}/api/v1/user/register
exports.registerUser = catchAsyncError(async(req,res,next)=>{
 
   
    let BASE_URL = process.env.BACKEND_URL
    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    const user = await UserDetail.create(req.body);
    console.log(req.body);
    res.status(200).json({
        sucess:true,
        user
    })
    
})

// exports.getUserPhone = async (req, res, next) => {
  
//   try {
//     let buildQuery = () => {
//       return new APIFeatures(UserDetail.find(), req.query).search().filter()
//   }
  
//   const user = await buildQuery().query;

    
//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Internal Server Error',
//     });
//   }
// };
exports.loginUser = catchAsyncError(async(req, res, next)=>{
  const{phoneNo}= req.body
console.log(phoneNo);
  if(!phoneNo){
    return next(new ErrorHandler('Please enter valid Mobile No',400))
  }
  //finding the user database

  const user = await UserDetail.findOne({phoneNo});
  if(!user){
    return next(new ErrorHandler('No user found in this Mobile NO ',401))
  }
 
  res.status(200).json({
   success:true,
   user
  }) 

})
// getAlluser -  {{base_url}}/api/v1/user/users

exports.getAllUser = catchAsyncError(async(req,res,next)=>{
    const users = await UserDetail.find();
    res.status(200).json({
      success:true,
      users
     }) 
  })
// updateuser -  {{base_url}}/api/v1/user/update/:id

  exports.updateUser = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
      name:req.body.name,
      email: req.body.email,
    //   role: req.body.role
    }
     const user = await UserDetail.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators: true,
    })
  
    res.status(200).json({
      success:true,
      user
     }) 
  })
  
// deleteuser -  {{base_url}}/api/v1/user/delete/:id

  exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await UserDetail.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
    })
  })