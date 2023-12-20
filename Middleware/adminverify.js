const jwt = require('jsonwebtoken')
const adminjwtAuth = (req, res, next) => {
    if (req.cookies && req.cookies.adminToken) {
        const admin = jwt.verify(req.cookies.adminToken, process.env.SECRET_ADMIN);
        req.admin = admin;
        console.log(req.admin);
        next()
    } else {
        // res.redirect("/admin/loginform")
        res.redirect("/login")

    }
}

module.exports=adminjwtAuth;