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

module.exports = {
    getUserById
}