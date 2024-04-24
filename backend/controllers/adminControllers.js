const { isValidObjectId } = require('mongoose')
const User = require('../models/userModels')

//dropUserById
const deleteUserById = async (req,res)=>{
    try{
        const userId = req.body.userId
        const userDeleteId = req.body.userDeleteId
        if(!isValidObjectId(userId) || !isValidObjectId(userDeleteId)){
            return res.status(400).json({
                message:"user id or user for delele id not valid!"
            })
        }
        const admin = await User.findById(userId);
    
            if (!admin || admin.role !== "admin") {
                return res.status(401).json({
                    message: "You must be the admin!"
                });
            }
        const deletedUser = await User.findByIdAndDelete(userDeleteId)

        if(!deletedUser){
            return res.status(401).json({
                message:"user did not deleted!"
            })
        }

        res.json({
            message:"user deleted" 
        })
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })

    }
}
   
//getUsers
const getUsers = async (req,res) => {
    try{
       
    const allUsers = await User.find()
    if(!allUsers){
        return res.status(403).json({
            message: "users not found!" 
        })
    }
     res.status(200).json(allUsers)
     
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}

const updateUser = async (req,res) => {
    
}
module.exports = {
    deleteUserById,
    getUsers
}