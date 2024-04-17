const express = require("express")
const { signUp, signIn } = require("../controllers/userControllers")

const router = express.Router()

router.post("/create", signUp)
router.post("/signin", signIn)

module.exports = router