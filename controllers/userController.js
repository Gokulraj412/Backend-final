const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../models/userModel');
// register user -  {{base_url}}/api/v1/user/register
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const{
        name,
        dateOfBirth,
        email,
        phone,
        placeOfBirth,
        postalCode,
        city,
        state,
        country,
        address,
        gender
    } = req.body
   
    let BASE_URL = process.env.BACKEND_URL
    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    const user = await User.create({
        name,
        dateOfBirth,
        email,
        phone,
        placeOfBirth,
        postalCode,
        city,
        state,
        country,
        address,
        gender
    });
    res.status(200).json({
        sucess:true,
        user
    })
    
})
// getAlluser -  {{base_url}}/api/v1/user/users

exports.getAllUser = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();
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
     const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
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
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
    })
  })