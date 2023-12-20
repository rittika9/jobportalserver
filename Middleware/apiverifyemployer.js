const jwt = require('jsonwebtoken')

const apiemployerjwtAuth = (req, res, next) => {
    const token=req.body.token||req.query.token||req.headers['x-access-token'];
    if(!token){
        return res.status(400).json({
            success:false,
            message:"token is absent!"
        })
    }else{
        try{
            const apiemployer = jwt.verify(token, process.env.SECRET_EMPLOYER);
            req.apiemployer = apiemployer;
            //console.log(req.apiemployer);
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

module.exports=apiemployerjwtAuth;