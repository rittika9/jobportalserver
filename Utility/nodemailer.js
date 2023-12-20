const nodemailer=require("nodemailer");

const transport = (senderEmail, password) => {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth:{
          user:senderEmail,
          pass:password,
      }
    });
    return transporter
  };


  const mailSender =(req,res,trans,mailoptions)=>{
    trans.sendMail(mailoptions,(err)=>{
        if(err){
            console.log("Technical Issue",err);
        }else{
            req.flash("message","A Verfication Email Sent To Your Mail ID!")
            res.redirect("/register");
        }
    })
}


module.exports={
    transport,
    mailSender
}