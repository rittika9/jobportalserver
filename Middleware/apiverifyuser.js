const jwt = require('jsonwebtoken')
const apiuserjwtAuth = (req, res, next) => {
    const token=req.body.token||req.query.token||req.headers['x-access-token'];
    if(!token){
        return res.status(400).json({
            success:false,
            message:"token is absent!"
        })
    }else{
        try{
            const apiuser = jwt.verify(token, process.env.SECRET_USER);
            req.apiuser = apiuser;
            console.log(req.apiuser);
            next()
        }
        catch(error){
            return res.status(400).json({
                success:false,
                message:"token is wrong!"
            })
        }
    }
    
}

module.exports=apiuserjwtAuth;