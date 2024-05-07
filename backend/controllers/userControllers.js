const { isValidObjectId } = require("mongoose");
const User = require("../models/userModels");
//getUserById
const getUserById = async (req, res) => {
    try{
        const {userId} = req.params;
        console.log("user id : ", userId)

        if(!userId) return res.status(401).json({
            message: "user Id Error!"
        })

        const user = await User.findById(userId)
                            .select("-password") // return all parametres excepte password, we can select the paarams that we need to return 

        if(!user){
            return res.status(403).json({
                message: "user not found!" 
            })
        }

        res.status(200).json(user)
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const { userId, 
                firstName, 
                lastName, 
                password, 
                role } = req.body;

                console.log(req.body)

        if(!isValidObjectId(userId)){
            return res.status(400).json({
                message: "id error!"
            })
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(403).json({
                message: "user not found!"
            })
        }
        user.firstName = firstName || user.firstName
        user.lastName = lastName || user.lastName
        user.password = password || user.password
        user.role = role || user.role
        
        await user.save();

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email,
            _id: user._id
        })

    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}

module.exports = {
    getUserById,
    updateUser
}