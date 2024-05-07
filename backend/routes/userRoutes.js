const express = require("express")
const { getUserById, updateUser } = require("../controllers/userControllers")

const router = express.Router()

router.get("/getUser/:userId", getUserById) //on a ajoute la var dans path --> c'est params 
router.put("/update", updateUser)

module.exports = router 