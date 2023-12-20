const applyModel = require("../../Model/applyModel");
const jobModel = require("../../Model/jobModel");


const applyJob=async(req,res)=>{
    try{
       const applyJob=new applyModel({
        // user:req.body.user,
         job:req.body.job,                
          user:req.body.user,
          category:req.body.category,
        address:req.body.address,
        dateofbirth:req.body.dateofbirth,
        experience:req.body.experience,
        qualification:req.body.qualification
       })
       const output=await applyJob.save();
       const job=await jobModel.findById(req.body.job);
       job.apply.push(output._id);
       job.save();
    return res.status(200).json({
        success:true,
        message:"Apply successfully",
        data:output
    })
    
    
    
        }catch(error){
            return res.status(404).json({success: false , message:"error"})
        }
}


module.exports = {
    applyJob
}