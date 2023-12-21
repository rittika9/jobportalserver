
const categoryModel = require('../../Model/categoryModel')
const jobModel=require('../../Model/jobModel')

const allJobPost=async(req,res)=>{
    try{

const crudData=await jobModel.find().populate("category")
return res.status(200).json({
    success:true,
    message:"data fetch successfully",
    data:crudData
})



    }catch(error){
        return res.status(404).json({success: false , message:"error"})
    }
}




const createJobPost=async(req,res)=>{
    try{
      
      
        const jobdetails= new jobModel({
           
                        companyname:req.body.companyname,
                        description:req.body.description,
                        responsibility:req.body.responsibility,
                        skills:req.body.skills,
                        vacancy:req.body.vacancy,
                        location:req.body.location,
                        type:req.body.type,
                        salary:req.body.salary,
                        lastdate:req.body.lastdate,
                        category:req.body.category,
                        user:req.body.user,
                        apply:req.body.apply,
                       image:req.file.path,
                      
                        
                    })
       if(!req.body.companyname||!req.body.skills){
        return res.status(400).json({
            success:false,
            message:"all fields are mandatory!",
            
        })
    }else{
        const output=await jobdetails.save();
        // const user=await userModel.findById(req.apiadmin._id);
        // user.blogs.push(output._id);
        // user.save()
        const category=await categoryModel.findById(req.body.category);
        // category.jobs.push(output._id);
        category.jobs.push(output);

        category.save()
        return res.status(200).json({
            success:true,
            message:"success!",
            data:output
        })
    }
    
}
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error
        })
        
    }
}

// const createJobPost=async(req,res)=>{
//     try{
      
      
//         const jobdetails= new jobModel({
           
//                         companyname:req.body.companyname,
//                         description:req.body.description,
//                         responsibility:req.body.responsibility,
//                         skills:req.body.skills,
//                         vacancy:req.body.vacancy,
//                         location:req.body.location,
//                         type:req.body.type,
//                         salary:req.body.salary,
//                         lastdate:req.body.lastdate,
//                        category:req.body.category,

                        
                      
                        
//                     })
//        if(!req.body.companyname||!req.body.skills){
//         return res.status(400).json({
//             success:false,
//             message:"all fields are mandatory!",
            
//         })
//     }else{
//         const output=await jobdetails.save();
//         // const user=await userModel.findById(req.apiadmin._id);
//         // user.blogs.push(output._id);
//         // user.save()
//         const category=await categoryModel.findById(req.body.category);
//         category.jobs.push(output._id);
//         category.save()
//         return res.status(200).json({
//             success:true,
//             message:"success!",
//             data:output
//         })
//     }
    
// }
//     catch(error){
//         console.log(error);
//         return res.status(400).json({
//             success:false,
//             message:error
//         })
        
//     }
// }





// const showSingleJobPost=async(req,res)=>{
    

//     try{
//         const id = req.params.id;
//        const jobData= await jobModel.findById(id)
//        if(!jobData){
//         return res.status(404).json({
//             success:false,
//             message: "Not found Student with id ",
//            })
//        }else{
//         return res.status(200).json({
//             success:true,
//             message:"Data Fetched Successfully",
//             data:jobData
//            })
//        }
       
//     }catch(error){
//         return res.status(404).json({
//             success:false,
//             message:"Data Not Found"
//         })
//     }
// }



// const updateJobPost=async(req,res)=>{
//     try{
//         if (!req.body) {
//             return res.status(400).json({
//               message: "Data to update can not be empty!"
//             });
//           }
//           const id = req.params.id;
//          const result=await jobModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//          if(!result){
//             res.status(404).json({
//                 message: `Cannot update data with id=${id}. Maybe data was not found!`
//               });
//          }else{
//             return res.status(200).json({
//                 success:true,
//                 message:"Data update Successfully",
//                })

//          }

//     }catch(err){
//         return res.status(404).json({
//             success:false,
//             error:err.message
//         })

//     }

// }



// const deleteJobPost=async(req,res)=>{
//     const id = req.params.id
//     const jobResult=await jobModel.findByIdAndRemove(id).then(data => {
//         if (!data) {
//           return res.status(404).json({
//             message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
//           });
//         } else {
//           return res.status(200).json({
//             status:true,
//             message: "Job was deleted successfully!"
//           });
//         }
//       }).catch(err => {
//          return res.status(500).json({
//           message: "Could not delete Job with id=" + id
//         });
//       });
// }



const deleteJobPost=(req,res)=>{

    const id=req.params.id
    jobModel.deleteOne({_id:id}).then(del=>{
        return res.status(200).json({
                        status:true,
                        message: "Job was deleted successfully!"
                      })


    }).catch((err)=>{
        console.log(err,"delete failed")
    })
  }


const JobFind=async(req,res)=>{
    try{

const crudData=await jobModel.find({isPending:false}).populate("category")
return res.status(200).json({
    success:true,
    message:"data fetch successfully",
    data:crudData
})



    }catch(error){
        return res.status(404).json({success: false , message:"error"})
    }
}


const JobFindDetails=async(req,res)=>{
    try{
       const data=await jobModel.findById(req.params.id).populate("category");
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





const fulltimeJobFind = async (req, res) => {
    try {
        
        const job = await jobModel.aggregate([{ $match: { type: 'fulltime' } },
        { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "category" }}
    ]);


        console.log('Fulltime jobs fetched successfully:', job);

        return res.status(200).json({
            success: true,
            message: "Fulltime Data fetch successfully",
            data: job
        });
    } catch (error) {
        console.error('Error fetching fulltime jobs:', error);
        return res.status(404).json({ success: false, message: "Error fetching data", error: error.message });
    }
}

const parttimeJobFind = async (req, res) => {
    try {
        
        const job = await jobModel.aggregate([
            { $match: { type: 'parttime' }},
        { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "category" }}

     ]);

        console.log('parttime jobs fetched successfully:', job);

        return res.status(200).json({
            success: true,
            message: "parttime data fetch successfully",
            data: job
        });
    } catch (error) {
        console.error('Error fetching fulltime jobs:', error);
        return res.status(404).json({ success: false, message: "Error fetching data", error: error.message });
    }
}


// const internJobFind = async (req, res) => {
//     try {
        
//         const job = await jobModel.aggregate([{ $match: { type: 'intern' } }]);
//         console.log('intern jobs fetched successfully:', job);

//         return res.status(200).json({
//             success: true,
//             message: "intern data fetch successfully",
//             data: job
//         });
//     } catch (error) {
//         console.error('Error fetching intern jobs:', error);
//         return res.status(404).json({ success: false, message: "Error fetching data", error: error.message });
//     }
// }

const internJobFind = async (req, res) => {
    try {
        const job = await jobModel.aggregate([
            { $match: { type: 'intern',isPending: false }},
            { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "category" }}
        ]);

        console.log('Intern jobs fetched successfully:', job);

        return res.status(200).json({
            success: true,
            message: "Intern data fetch successfully",
            data: job
        });
    } catch (error) {
        console.error('Error fetching intern jobs:', error);
        return res.status(404).json({ success: false, message: "Error fetching data", error: error.message });
    }
};







const applyJobForm=async(req,res)=>{
    try{
       const data=await jobModel.findById(req.params.id);
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
    allJobPost,createJobPost,
    deleteJobPost,
    JobFind,
    JobFindDetails,
    fulltimeJobFind,
    parttimeJobFind,
    internJobFind,
    applyJobForm,
}