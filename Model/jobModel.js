const mongoose=require('mongoose')

const schema=mongoose.Schema;

const jobSchema=new schema({
    companyname:{
        type:String
    },
    description:{
        type:String
    },
    responsibility:{
        type:String
    },
    skills:{
        type:String
    },
    vacancy:{
        type:Number,
    },
    location:{
        type:String
    },
    type:{
        type:String
    },
    image:{
        type:String,
    },
    status:{
        type:String,
        default:1
    },
    price:{
        type:Number,
        default:0
   },
   salary:{
    type:String
},
lastdate:{
    type:Date
},
   category:[{
        type:schema.Types.ObjectId,
        ref:'category'
    }],
   user:{
        type:schema.Types.ObjectId,
        ref:'user'
    },
    // comments:[{
    //     type:schema.Types.ObjectId,
    //     ref:"comment"
    // }],
    apply:[{
        type:schema.Types.ObjectId,
        ref:'apply'
    }],
    isPending:{
        type:Boolean,
        default:true
    }
})

const jobModel=mongoose.model('job',jobSchema);
module.exports=jobModel;