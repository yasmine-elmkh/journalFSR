const { isValidObjectId } = require('mongoose')
const User = require('../models/userModels')

//dropUserById
const deleteUserById = async (req,res)=>{
    try{
        const userId = req.body.id
        if(!isValidObjectId(userId)){
            return res.status(400).json({
                message:"user id not valid!"
            })
        }
        const deletedUser = await User.findByIdAndDelete(userId)

        if(!deletedUser){
            return res.status(401).json({
                message:"user ....!"
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
//updateUser


module.exports = {
    deleteUserById,
    getUsers
}