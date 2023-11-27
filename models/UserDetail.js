const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    name:{
       type:String,
    //    required:[true,'Please enter name'] 
    },
    phoneNo:{
        type:String,
        required:[true,'Please enter mobile-no'],
        unique:true,
    },
})
let UserDetail = mongoose.model('UserDetail',userSchema)

module.exports = UserDetail