const express = require("express")
const { postArticle, getArticleById, dropeArticaleById, showAllArticles, updateArticle} = require("../controllers/articleControllers")

const router = express.Router()

router.post("/create", postArticle)
router.get("/articles", showAllArticles)
router.get("/:articleId", getArticleById)
router.put("/update", updateArticle)
router.delete("/delete/:articleId", dropeArticaleById)

module.exports = router
