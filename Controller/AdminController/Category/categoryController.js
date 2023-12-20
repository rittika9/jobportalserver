

const categoryModel = require('../../../Model/categoryModel');




// const listing=async(req,res)=>{
    
//     try{
//         const result=await blogModel.find().populate("user")
//         res.render('Admin/Blog/listing',{
//              data:result,
//              adminData:req.admin

//         })
//         // console.log(result);
//     }
//     catch(err){
//         console.log(err);
//     }
// }
const listing=async(req,res)=>{
    const Category=await categoryModel.find();
    res.render("Admin/Category/listing",{
        data:Category,
      adminData:req.admin
    })
}

const addlisting=(req,res)=>{
    res.render('Admin/Category/addListing',{
        title:"Category listing",
        adminData: req.admin

    })

}

const createlisting=async(req,res)=>{
   
    const result = new categoryModel({
        
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        // user: req.body.user,
    
    })

    if(req.file){
        result.image=req.file.path
       }


    result.save()
   
    .then((data)=>{
        console.log(data,'data added')
        res.redirect('/category/listing')
    }).catch((error)=>{
        console.log(error)
        res.redirect('/category/addListing')
    })
}

//     try{
//         const blog=new blogModel({
//             title: req.body.title,
//             content: req.body.content,
//             user: req.body.user,
//         })
// if(req.file){
//     blog.image=req.file.path
//        }

//         const output=await blog.save();
//         const user=await userModel.findById(req.body.user);
//         user.blogs.push(output._id);
//         user.save();
//         req.flash('bookingmessage',"Thank you for booking your upcoming tour with Us!!!!")

//         res.redirect("/blog/listing")
//      }
//      catch(error){
//          console.log(error);
//      }

// }


const editlisting=(req,res)=>{
    const id=req.params.id
    const image=req.path.image
    categoryModel.findById(id,image).then(data=>{
        console.log(data)
        res.render('Admin/Category/editListing',{
            title:"edit-page",
            singledata:data,
            adminData: req.admin

        })
    }).catch(err=>{
        console.log(err)
    })
}

const updatelisting=(req,res)=>{
    //console.log(image);
    const id=req.body.category_id
    const title= req.body.title
    const subtitle= req.body.subtitle
    const content= req.body.content  
    const image=req.path.image


    
    categoryModel.findById(id).then((result)=>{
        result.title=title
        result.subtitle=subtitle        
        result.content=content

        
        if(req.file){
            result.image=req.file.path
           }        
        
        return result.save().then(results=>{    
            res.redirect('/category/listing')
            console.log(results,"update successfully")
        })
    }).catch(err=>{
        console.log(err,"update failed")
    })
    
 }



 const deletelisting=(req,res)=>{

    const id=req.params.id
    categoryModel.deleteOne({_id:id}).then(del=>{
        res.redirect('/category/listing')
    }).catch((err)=>{
        console.log(err,"delete failed")
    })
}


const activateData=(req,res)=>{
    const id=req.params.id
    categoryModel.findById(id).then((data)=>{
        data.status='0'
       
        return data.save().then(result=>{    
            res.redirect('/category/listing')
            console.log(result,"destination activate successfully")
        })
    }).catch(err=>{
        console.log(err,"update failed")
    })
    
}



const deactivateData=(req,res)=>{
    const id=req.params.id
    categoryModel.findById(id).then((data)=>{
        data.status='1'
       
        return data.save().then(result=>{    
            res.redirect('/category/listing')
            console.log(result,"destination deactivate successfully")
        })
    }).catch(err=>{
        console.log(err,"update failed")
    })
    
}



module.exports={
    
    
    listing,
    addlisting,
    createlisting,
    editlisting,
    updatelisting,
    deletelisting,
    activateData,
    deactivateData

}