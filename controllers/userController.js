const catchAsyncError = require('../middlewares/catchAsyncError')
const UserDetail = require('../models/UserDetail')
const APIFeatures = require("../utils/apiFeatures")

// register user -  {{base_url}}/api/v1/user/register

exports.registerUser = async (req, res, next) => {
  try {
    let BASE_URL = process.env.BACKEND_URL;

    if (process.env.NODE_ENV === 'production') {
      BASE_URL = `${req.protocol}://${req.get('host')}`;
    }

    // Check if the user already exists
    const existingUser = await UserDetail.findOne({ phoneNo: req.body.phoneNo });

    if (existingUser) {
      // User is already registered
      return res.status(409).json({
        success: false,
        message: 'User already registered',
      });
    }

    // If user doesn't exist, create a new user
    const user = await UserDetail.create(req.body);
    console.log(req.body);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};




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


exports.loginUser = async (req, res, next) => {
  const { phoneNo } = req.body;

  console.log(phoneNo);

  try {
    if (!phoneNo) {
      throw new Error('Please enter a valid Mobile No');
    }

    // Finding the user in the database
    const user = await UserDetail.findOne({ phoneNo });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not registered',
      });
      return;
    }

    // Additional checks, e.g., password verification, can be added here

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);

    if (error instanceof Error && error.message) {
      const errorMessage = error.message;

      if (errorMessage.includes('valid Mobile No')) {
        res.status(400).json({
          success: false,
          message: errorMessage,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
};



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