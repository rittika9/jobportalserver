const express=require('express');
const Route=express.Router();
const apiadminverify=require("../Middleware/apiverify");
const apiuserverify=require("../Middleware/apiverifyuser");
const apiemployerverify=require("../Middleware/apiverifyemployer");

const CategoryController=require("../Controller/ApiController/categoryController");
const AuthController=require("../Controller/ApiController/authController");
const jobController=require("../Controller/ApiController/jobController");
const applyJobController=require("../Controller/ApiController/applyjobController");


const image=require('../Utility/Image')





// Auth
//**registration */
Route.post("/registeruser",image.single('image'),AuthController.regcreate);
// Route.post("/registeruser",AuthController.regcreate);

Route.get("/confirmation/:email/:token",AuthController.confirmation);
// login
Route.post("/loginuser",image.single('image'),AuthController.loginuser);
Route.post("/loginemployer",image.single('image'),AuthController.loginemployer);
// dashboard
Route.get('/userdashboard/:id', AuthController.user_Dashboard)
Route.get('/employerdashboard/:id',apiemployerverify, AuthController.employer_Dashboard)



// Category API
Route.get('/category',apiuserverify,CategoryController.viewCategory)
Route.get("/categorydetails/:id",CategoryController.categoryDetailsbyid);
Route.get('/categoryforjob',CategoryController.categoryforjob)
Route.get('/categorydetailsforjob/:id',CategoryController.categoryDetailsforjob)



// like
Route.get('/like/:id',CategoryController.likes)

// job post

Route.get("/jobpost",apiemployerverify,jobController.allJobPost )
Route.post("/jobpost/create",image.single('image'),jobController.createJobPost )
// Route.post("/jobpost/create",jobController.createJobPost )
Route.get("/jobpost/:id",jobController.showSingleJobPost )
Route.post("/jobpost/update/:id",jobController.updateJobPost )
Route.delete("/jobpost/delete/:id",jobController.deleteJobPost)

// job find

Route.get("/jobfind",jobController.JobFind )
Route.get("/jobfinddetails/:id",jobController.JobFindDetails )


// job find by type 
Route.get("/jobfindby-fulltime",jobController.fulltimeJobFind)
Route.get("/jobfindby-parttime",jobController.parttimeJobFind)


// job Apply
Route.post("/applyjob",applyJobController.applyJob)












module.exports=Route;