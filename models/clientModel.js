const mongoose = require ('mongoose');
const clientSchema = new mongoose.Schema({
    name:{
       type:String,
    //    required:[true,'Please enter name'] 
    },
    phoneNo:{
        type:String,
        required:[true,'Please enter mobile-no'],
        unique:[true,'Mobile no alreday exist']
    },
    registerTime: {
        type: Date,
        // default: Date.now,
      },
    loginTime: {
        type: Date,
        // default: Date.now,
      }, 
    
})
let Client = mongoose.model('Client',clientSchema)

module.exports = Client