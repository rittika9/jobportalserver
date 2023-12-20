const jwt = require('jsonwebtoken')
const apiadminjwtAuth = (req, res, next) => {
    const token=req.body.token||req.query.token||req.headers['x-access-token'];
    if(!token){
        return res.status(400).json({
            success:false,
            message:"token is absent!"
        })
    }else{
        try{
            const apiadmin = jwt.verify(token, process.env.SECRET_ADMIN);
            req.apiadmin = apiadmin;
            console.log(req.apiadmin);
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

module.exports=apiadminjwtAuth;