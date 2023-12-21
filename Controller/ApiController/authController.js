
const userModel=require("../../Model/userModel");
const tokenModel=require("../../Model/tokenModel");
const crypto=require("crypto");
const nodemailer=require("nodemailer");
const bcrypt=require('bcryptjs');
const Jwt=require("jsonwebtoken");
const applyModel = require("../../Model/applyModel");
const jobModel = require("../../Model/jobModel");






//***registration */
const regcreate=async(req,res)=>{
    try{
       const User=new userModel({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        image:req.file.path,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(12)),
        answer:req.body.answer,
        isAdmin:req.body.isAdmin,

       })
       const data=await userModel.findOne({email:req.body.email});
       if(!req.body.name||!req.body.email||!req.body.phone||!req.body.password||!req.body.answer){
        return res.status(400).json({
            success:false,
            message:"all fields are required!"
        })
       }else{
          if(data){
            return res.status(400).json({
                success:false,
                message:"user already exists!"
            })
          }else{
            const password = req.body.password;
            const confiromPW = req.body.confirmpassword;
            if (password !== confiromPW) {
                // req.flash('message',"password and confirm password doesn't match....")
                // res.redirect('/register')
                // console.log("password and confirm password doesn't match");
                return res.status(400).json({
                    success:false,
                    message:"password and confirm password doesn't match"
                })
            }
          else{
            User.save()
            .then((user)=>{
                console.log(user._id);
               const Token=new tokenModel({
                _userId:user._id,
                token:crypto.randomBytes(16).toString('hex')
               })
               Token.save()
               .then((token)=>{
                const transPorter=nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth:{
                         user:"21rittig@gmail.com",
                         pass:"bwdc xhmf mgmt tdas",
                        }
                })
                const mailOptions={
                    from: 'no-reply@rittika.com',
                    to: user.email,
                    subject: 'Account Verification',
                    text: 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link:'+`http://localhost:${process.env.PORT}/api/confirmation/${user.email}/${token.token}` 
                }
                transPorter.sendMail(mailOptions);
                return res.status(200).json({
                    success:true,
                    message:"verification link sent!",
                    data:User
                })
               })
               .catch((error)=>{

                return res.status(400).json({
                    success:false,
                    message:"token save error!"
                })
               })
            })
            .catch((error)=>{
                return res.status(400).json({
                    success:false,
                    message:error,

                })
            })
          }
        }
       }
    }
    catch(error){
        // console.log(error);
        //  return 
         res.status(400).json({
            success:false,
            message:"error"
         })
        //  Console.log(error)

    }
}

const confirmation=async(req,res)=>{
    try{
      const token=await tokenModel.findOne({token:req.params.token});
      if(token){
         userModel.findOne({_id:token._userId,email:req.params.email})
         .then((user)=>{
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"user doesnt exist!"
                })
            }else{
                if(user.isVerified==true){
                    return res.status(400).json({
                        success:false,
                        message:"user is already verified!"
                    })
                }else{
                    user.isVerified=true;
                    user.save();
                    return res.status(200).json({
                        success:true,
                        message:"user is verified!",
                        data:user
                    })
                }
            }
         })
      }else{
        return res.status(400).json({
            success:false,
            message:"token is not found!"
        })
      }
      
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"error!"
        })
    }
}


const loginuser=async(req,res)=>{
    try {
        const data = await userModel.findOne({
            email: req.body.email
        })
        if(!req.body.email||!req.body.password){
            return res.status(400).json({
                success:false,
                message:"all fields are mandatory!",
                
            })
        }else{
            if (data) {
                if (data.isVerified == true && data.isAdmin=="user") {
                    const pwd = data.password;
                    if (bcrypt.compareSync(req.body.password, pwd)) {
                        const token = Jwt.sign({
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            image: data.image,

                        
                           }, process.env.SECRET_USER, { expiresIn: "1d" });
                           console.log(data);
                           return res.status(200).json({
                               success:true,
                               message:"Candidate Login successfully!",
                               data,
                               token
                           })
                       
                    } else {
                        return res.status(400).json({
                            success:false,
                            message:"password is wrong!"
                        })
                    }
                } else {
                    return res.status(400).json({
                        success:false,
                        message:"it's a Candidates loginform!user is not an Candidates!"
                    })
                }
    
            }else{
                return res.status(400).json({
                    success:false,
                    message:"user doesnt exist!"
                })
            }
        }
        
        
        

    } catch (error) {
        console.log(error);
    }
}



const loginemployer=async(req,res)=>{
    try {
        const data = await userModel.findOne({
            email: req.body.email
        })
        if(!req.body.email||!req.body.password){
            return res.status(400).json({
                success:false,
                message:"all fields are mandatory!",
                
            })
        }else{
            if (data) {
                if (data.isVerified == true && data.isAdmin=="employer") {
                    const pwd = data.password;
                    if (bcrypt.compareSync(req.body.password, pwd)) {
                        const token = Jwt.sign({
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            image: data.image,

                        
                           }, process.env.SECRET_EMPLOYER, { expiresIn: "1d" });
                           console.log(data);
                           return res.status(200).json({
                               success:true,
                               message:"Employer Login successfully!",
                               data,
                               token
                           })
                       
                    } else {
                        return res.status(400).json({
                            success:false,
                            message:"password is wrong!"
                        })
                    }
                } else {
                    return res.status(400).json({
                        success:false,
                        message:"it's a Employer loginform!user is not an Employer!"
                    })
                }
    
            }else{
                return res.status(400).json({
                    success:false,
                    message:"user doesnt exist!"
                })
            }
        }
        
        
        

    } catch (error) {
        console.log(error);
    }
}



const user_Dashboard=async (req, res) => {
    
    try{

        const id = req.params.id;

        const result=await applyModel.find({user:id}).populate("job").populate("user").populate("category")
        
        
        return res.status(200).json({
            success:true,
            message:"Userdashboard fetch successfully",
            data:result
        })
        
        
        
            }catch(error){
                return res.status(404).json({success: false , message:"error"})
            }
        }


        const employer_Dashboard=async (req, res) => {
    
            try{
        
                const id = req.params.id;
        
                const result=await jobModel.find({user:id}).populate("user").populate("category").populate("apply")
                

                return res.status(200).json({
                    success:true,
                    message:"employerdashboard fetch successfully",
                    data:result
                })
                
                
                
                    }catch(error){
                        return res.status(404).json({success: false , message:"error"})
                    }
                }



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
        

module.exports={
    regcreate,
    confirmation,
    loginuser,
    loginemployer,
    user_Dashboard,
    employer_Dashboard,
    deleteJobPost,

}

