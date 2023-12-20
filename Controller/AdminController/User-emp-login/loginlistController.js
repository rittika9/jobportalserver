
const userModel = require('../../../Model/userModel');


const listing=async(req,res)=>{
    const loginlist=await userModel.find();
    res.render("Admin/user_emp_login/listing",{
        loginlist:loginlist,
      adminData:req.admin
    })
}



const deletelisting=(req,res)=>{

  const id=req.params.id
  userModel.deleteOne({_id:id}).then(del=>{
      res.redirect("/loginlist/listing")
  }).catch((err)=>{
      console.log(err,"delete failed")
  })
}
module.exports={
    
    
  listing,
  // approve,
  // disapprove,
  deletelisting,

}