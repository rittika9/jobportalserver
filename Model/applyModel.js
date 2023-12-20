const mongoose=require('mongoose')

const schema=mongoose.Schema;

const applySchema=new schema({
    // name:{
    //     type:String
    // },
    // email:{
    //     type:String
    // },
    // phone:{
    //     type:String
    // },
    address:{
        type:String
    },
    dateofbirth:{
        type:Date
    },
    experience:{
        type:String
    },
    qualification:{
        type:String
    },
    user:{
        type:schema.Types.ObjectId,
        ref:'user'
    },
    file:{
        type:String
    },
    status:{
        type:String,
        default:1
    },

     job:{
        type:schema.Types.ObjectId,
        ref:'job'
    },
    category:{
        type:schema.Types.ObjectId,
        ref:'category'
    },
    // comments:[{
    //     type:schema.Types.ObjectId,
    //     ref:"comment"
    // }],
})

const applyModel=mongoose.model('apply',applySchema);
module.exports=applyModel;