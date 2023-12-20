const categoryModel=require('../../Model/categoryModel')
const jobModel = require('../../Model/jobModel')

const viewCategory=async(req,res)=>{
    try{

const result=await categoryModel.find({status: 1})


return res.status(200).json({
    success:true,
    message:"data fetch successfully",
    data:result
})



    }catch(error){
        return res.status(404).json({success: false , message:"error"})
    }
}


const categoryDetailsbyid=async(req,res)=>{
    try{
       const data=await categoryModel.findById(req.params.id);
       return res.status(200).json({
        success:true,
        data
       })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"erro!"
           })
    }
}


const likes=async(req,res)=>{
    try{
       const category=await categoryModel.findById(req.params.id);
       category.like++;
       await category.save();
    //    return res.status(200).json({
    //     success:true,
    //     message:"liked successfully!"
    //    })
    return res.json(category);


    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"error!"
           });
    }
}


const categoryforjob=async(req,res)=>{
    try{

const result=await categoryModel.find({status: 1}).populate("jobs")


return res.status(200).json({
    success:true,
    message:"data fetch successfully",
    data:result
})



    }catch(error){
        return res.status(404).json({success: false , message:"error"})
    }
}



const categoryDetailsforjob=async(req,res)=>{
    try{
       const data=await categoryModel.findById(req.params.id).populate("jobs"); 
       return res.status(200).json({
        success:true,
        data
       })
       
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"erro!"
           })
    }
}

module.exports={
    viewCategory,
    categoryDetailsbyid,
    likes,
    categoryforjob,
    categoryDetailsforjob,
}

