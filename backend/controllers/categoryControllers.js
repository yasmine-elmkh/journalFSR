const { isValidObjectId } = require("mongoose");
const Category = require("../models/categoryModels")
const User = require('../models/userModels')

// createCategory

const createCategory = async (req,res)=>{
try{
    const userId = req.body.id
    if(!isValidObjectId(userId)){
        return res.status(400).json({
            message:"user id not valid!"
        })
     }

     const admin = await User.findById(userId);

        if (!admin || admin.role !== "admin") {
            return res.status(401).json({
                message: "You must be the admin!"
            });
        }
     const category = new Category ({
        title : req.body.title,
    })
   if(!category) return res.status(402).json({
            message: "category didn't saved!"
    })

    await category.save()

    res.status(200).json({
     message: "category created!"
    })
    
}catch(err){
    console.log(err)
    return res.status(404).json({
        message: "Server Error"
    })
}
}

//deleteCategory
const deleteCategory = async (req,res)=>{
    try{
        const userId = req.body.userId
        if(!isValidObjectId(userId)){
            return res.status(400).json({
                message:"user id not valid!"
            })
         }
    
         const admin = await User.findById(userId);
    
            if (!admin || admin.role !== "admin") {
                return res.status(401).json({
                    message: "You must be the admin!"
                });
            }
         const categoryId = req.body.categoryId
            if(!isValidObjectId(categoryId)){
                return res.status(400).json({
                    message:"category id not valid!"
                })
             }

         const deleteCat = await Category.findByIdAndDelete(categoryId)
         if (!deleteCat) {
            return res.status(404).json({
                message: "Category not found!"
            });
        }
         res.status(200).json({
            message : "category is deleted!"
         })
        
        
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: "Server Error"
        })
    }
    }
    
//updateCategory
const updateCategory = async (req, res) => {
    try{

        const userId = req.body.userId
        if(!isValidObjectId(userId)){
            return res.status(400).json({
                message:"user id not valid!"
            })
         }
    
         const admin = await User.findById(userId);
    
            if (!admin || admin.role !== "admin") {
                return res.status(401).json({
                    message: "You must be the admin!"
                });
            }
        const {categoryId , title} = req.body;

        if(!isValidObjectId(categoryId)){
            return res.status(400).json({
                message: "category id not valid!"
            })
        }

        const category = await Category.findById(categoryId)
        category.title = title,

        await category.save();

        res.status(200).json({
            message: "category updated!"
        })
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}
//showAllCategory
const getAllCategory = async (req,res) => {
    try{
        const allCategory = await Category.find()
        if(!allCategory){
           return res.status(403).json({
            message: "the category not found!" 
        })
        }
        res.status(200).json(allCategory)
     
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}
module.exports = {
   createCategory,
   deleteCategory,
   updateCategory,
   getAllCategory
}