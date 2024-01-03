const userModel = require('../../Model/userModel')
const tokenModel=require("../../Model/tokenModel");

const bcrypt=require("bcryptjs");
const crypto=require('crypto');
const nodemailer=require("nodemailer");
const Jwt=require("jsonwebtoken");
const utils=require("../../Utility/nodemailer");






const loginform = (req, res) => {
    const messages=req.flash("message");
    res.render('Admin/login',{
        message:messages,
        adminData: req.admin
    });
}

const registerform = (req, res) => {
    const messages=req.flash("message");
    res.render('register',{
        message:messages,
        adminData: req.admin
    });

}



//*** website register */
const registerformcreate = async (req, res) => {
    try {
        const User = new userModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            
             image:req.file.path,
        
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12)),
            answer: req.body.answer,

        })
        
    
    
        const data = await userModel.findOne({ email: req.body.email });
        if (!req.body.name || !req.body.email || !req.body.phone || !req.body.password || !req.body.answer) {
            req.flash("message", "all fields are required!");
            res.redirect("/register");
        } else {
            if (data) {
                req.flash("message", "user already exists!");
                res.redirect("/register");
            } else{
                const password = req.body.password;
                const confiromPW = req.body.confirmpassword;
                if (password !== confiromPW) {
                    req.flash('message',"password and confirm password doesn't match....")
                    res.redirect('/register')
                    console.log("password and confirm password doesn't match");
                    return;
                }
            
            else {
                User.save()
                    .then((user) => {
                        console.log(user._id);
                        const Token = new tokenModel({
                            _userId: user._id,
                            token: crypto.randomBytes(16).toString('hex')
                        })
                        Token.save()
                            .then((token) => {
                                const transPorter = utils.transport("21rittig@gmail.com","bwdc xhmf mgmt tdas")
                               
                                const mailOptions = {
                                    from: 'no-reply@rittika.com',
                                    to: user.email,
                                    subject: 'Account Verification',
                                    // text: 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link:' + `http://localhost:${process.env.PORT}/confirmation/${user.email}/${token.token}`
                                    text: 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n'

                                }
                                utils.mailSender(req,res,transPorter,mailOptions)
                               
                               
                            })
                            .catch((error) => {
                                req.flash("message", "token save error!");
                                res.redirect("/register");
                            })
                    })
                    .catch((error) => {
                        req.flash("message", "user save error!");
                        res.redirect("/register");
                    })
            }
        }
        }
    }
    catch (error) {
        req.flash("message", "error!");
        console.log(error);
        res.redirect("/register");
    }
}

const confirmationform=async(req,res)=>{
    try{
      const token=await tokenModel.findOne({token:req.params.token});
      if(token){
         userModel.findOne({_id:token._userId,email:req.params.email})
         .then((user)=>{
            if(!user){
                req.flash("message", "user not found!");
                res.redirect("/register");
            }else{
                if(user.isVerified==true){
                    req.flash("message", "user is already verified!");
                    res.redirect("/register");
                }else{
                    user.isVerified=true;
                    user.save();
                    req.flash("message", "user is verified!");
                    res.redirect("/login");
                }
            }
         })
      }else{
        req.flash("message", "token is not found!");
            res.redirect("/register");
      }
      
    }
    catch(error){
        req.flash("message", "error!");
        res.redirect("/register");
    }
}




//*** website login */
const logincreate=async(req,res)=>{
    try {
        const data = await userModel.findOne({
            email: req.body.email
        })
        
        if (data) {
            if (data.isVerified == true && data.isAdmin=="admin") {
                const pwd = data.password;
                if (bcrypt.compareSync(req.body.password, pwd)) {
                    const token = Jwt.sign({
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        image: data.image,


                    
                       }, process.env.SECRET_ADMIN, { expiresIn: "1d" });
                    res.cookie('adminToken', token)
                    res.redirect('/admin/dashboard');
                    console.log(data);
                } else {
                    req.flash('message', "Password Not Match.....")
                    res.redirect('/login')
                }
            } else {
                req.flash('message', "individual is not verified or not a user.......")
                res.redirect('/login')
            }

        }else{
            req.flash('message', "Email Not Exist.......")
                res.redirect('/login')
        }

    } catch (error) {
        console.log(error);
    }
}
//*** website logout */
const logout=(req,res)=>{
    res.clearCookie("adminToken");
    res.redirect("/login");
}








const adminDashboard = (req, res) => {
    res.render('Admin/dashboard', {
        adminData: req.admin
    })
}



module.exports={
    
    adminDashboard,
    loginform,
    registerform,
    registerformcreate,
    confirmationform,
    logincreate,
    logout
    
}