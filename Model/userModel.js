

const mongoose=require("mongoose")
const schema=mongoose.Schema

const UserSchema= new schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phone:{
type:Number,
required:true
},

password:{
type:String,
required:true

},
status:{
    type:Boolean,
    default:true
},

isAdmin:{
    type:String,
    enum:["user","admin","employer"],
    default:"admin"
},

// isBlocked:{
//     type:String,
//     default:false
// }
// booking: [{
//     type: schema.Types.ObjectId,
//     ref: "booking"
// }],
// blogs:[{
//     type:schema.Types.ObjectId,
//     ref:"blog"
// }],
// isAdmin:{
//     type:Boolean,
//     default:false
// },
isVerified:{
    type:Boolean,
    default:false
},
answer:{
    type:String
},
image:{
    type:String
},

}

)



const userModel=mongoose.model("user",UserSchema)
module.exports=userModel