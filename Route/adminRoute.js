

const express = require('express');
const route = express.Router()
const authController = require('../Controller/AdminController/authController')
const categoryController = require('../Controller/AdminController/Category/categoryController')
const jobController = require('../Controller/AdminController/jobPost/jobController')
const loginlistController = require('../Controller/AdminController/User-emp-login/loginlistController')



const adminverify=require("../Middleware/adminverify");
const image=require('../Utility/Image')





route.get("/register",authController.registerform);
route.get("/login",authController.loginform);
route.post("/registercreate",image.single('image'),authController.registerformcreate);
route.get("/confirmation/:email/:token",authController.confirmationform);
route.post("/loginpost",image.single('image'),authController.logincreate);
route.get("/admin/logout",authController.logout);
route.get('/admin/dashboard',adminverify, authController.adminDashboard)




// for category...................................................

route.get('/category/listing',adminverify,categoryController.listing)
route.get('/category/addListing',adminverify,categoryController.addlisting)
route.post('/category/createListing',image.single('image'),categoryController.createlisting)
route.get('/category/editListing/:id',adminverify,categoryController.editlisting)
route.post('/category/updateListing',image.single('image'), categoryController.updatelisting)
route.get('/category/deleteListing/:id',categoryController.deletelisting)
route.get('/category/activate/:id',categoryController.activateData)
route.get('/category/deactivate/:id',categoryController.deactivateData)


// for job...................................................

route.get('/jobpost/listing',adminverify,jobController.listing)
route.get("/approve/:id",jobController.approve);
route.get("/disapprove/:id",jobController.disapprove);
route.get("/jobpost/deleteListing/:id",jobController.deletelisting);

// loginlist..................................................
route.get('/loginlist/listing',adminverify,loginlistController.listing)
route.get("/loginlist/deleteListing/:id",loginlistController.deletelisting);





module.exports = route;