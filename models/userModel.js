const mongoose = require ('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
name:{
   type:String,
//    required:[true,'Please enter name'] 
},
dateOfBirth:{
  type:String,
//   required:[true,'Please enter Date of birth'] 
},
email:{
    type:String,
    required:[true,'Please enter email'],
    unique:true,
    validate: [validator.isEmail, 'Please enter valid email address']
},
phone:{
    type:String,
    required:[true,'Please enter mobile-no'],
    unique:true,
},
placeOfBirth:{
    type:String,
},
postalCode:{
    type:Number,
},
city:{
    type:String,
},
state:{
    type:String,
},
country:{
    type:String,
},
address:{
    type:String,
},
gender:{
    type:String
},
image:{
 type:String
},
createdAt:{
    type:Date,
    default:Date.now 
   },
})
// userSchema.pre('save',async function(next){
//     this.password = await bcrypt.hash(this.password, 10) 
// })

// userSchema.methods.isValidPassword = async function(enteredPassword){
//     return bcrypt.compare(enteredPassword, this.password)
//   }
  
let User = mongoose.model('User',userSchema)

module.exports = User