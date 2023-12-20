const jwt = require('jsonwebtoken')
const userjwtAuth = (req, res, next) => {
    
        if (req.cookies && req.cookies.userToken) {
            const user = jwt.verify(req.cookies.userToken, process.env.SECRET_USER);
            req.user = user;
            console.log(req.user);
            next()
        } else {
            next()
        }
}

module.exports={userjwtAuth};