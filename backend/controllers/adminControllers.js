const { isValidObjectId } = require('mongoose')
const User = require('../models/userModels')

// -- deleteUserById --
const deleteUserById = async (req,res)=>{
    try{
        const adminId = req.body.adminId
        const userId = req.body.userId
        if(!isValidObjectId(adminId) || !isValidObjectId(userId)){
            return res.status(400).json({
                message:"user id not valid!"
            })
        }
        const admin = await User.findById(adminId);
    
            if (!admin || admin.role !== "admin") {
                return res.status(401).json({
                    message: "You must be the admin!"
                });
            }
        const deleteUser = await User.findByIdAndDelete(userId)

        if(!deleteUser){
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

module.exports = {
    deleteUserById,
    getUsers
}