


const jobModel = require('../../../Model/jobModel');
const bookingMojobModeldel = require('../../../Model/jobModel')


// const listing=async(req,res)=>{
//     const jobpost=await jobModel.find().populate("user").populate("travel");
//     res.render("Admin/jobpost/listing",{
//         jobposts:jobpost,
//       adminData:req.admin
//     })
// }



const listing=async(req,res)=>{
    const jobpost=await jobModel.find().populate("category").populate("user");
    res.render("Admin/jobpost/listing",{
        jobposts:jobpost,
      adminData:req.admin
    })
}



// const listing=async(req,res)=>{
    
//   try{
//       const booking=await bookingModel.find().populate("user").populate("travel");
//       res.render("Admin/Booking/listing",{
//         bookings:booking
//       })
//       console.log(result);
//   }
//   catch(err){
//       console.log(err);
//   }

// }





const approve=async(req,res)=>{
  try{
      const jobposts=await jobModel.findById(req.params.id);
      jobposts.isPending=false;
      await jobposts.save()

      res.redirect("/jobpost/listing")
  }
  catch(error){
     console.log(error);
  }
}

const disapprove=async(req,res)=>{
  try{
      const jobposts=await jobModel.findById(req.params.id);
      jobposts.isPending=true;
      await jobposts.save();
      res.redirect("/jobpost/listing")
  }
  catch(error){
     console.log(error);
  }
}

const deletelisting=(req,res)=>{

  const id=req.params.id
  jobModel.deleteOne({_id:id}).then(del=>{
      res.redirect("/jobpost/listing")
  }).catch((err)=>{
      console.log(err,"delete failed")
  })
}
module.exports={
    
    
    listing,
    approve,
    disapprove,
    deletelisting,

}