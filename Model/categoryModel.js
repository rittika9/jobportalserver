const mongoose=require('mongoose')

const schema=mongoose.Schema;

const categorySchema=new schema({
    title:{
        type:String
    },
    subtitle:{
        type:String
    },
    content:{
        type:String
    },
    // user:{
    //     type:schema.Types.ObjectId,
    //     ref:'user'
    // },
    image:{
        type:String
    },
    status:{
        type:String,
        default:1
    },

    like:{
        type:Number,
        default:0
   },
     jobs:[{
        type:schema.Types.ObjectId,
        ref:'job'
    }],
    // comments:[{
    //     type:schema.Types.ObjectId,
    //     ref:"comment"
    // }],
})

const categoryModel=mongoose.model('category',categorySchema);
module.exports=categoryModel;