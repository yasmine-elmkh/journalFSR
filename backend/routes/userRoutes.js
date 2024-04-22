const express = require("express")
const { getUserById } = require("../controllers/userControllers")

const router = express.Router()

router.get("/user-by-id/:userId", getUserById) //on a ajoute la var dans path --> c'est params 

module.exports = router 