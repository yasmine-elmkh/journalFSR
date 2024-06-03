const express = require("express")
const { postArticle, getArticleById, deleteArticaleById , showAllArticles, updateArticle, lastArticles, articleByCategoryId, getArticleByUserId} = require("../controllers/articleControllers")

const router = express.Router()

router.post("/create", postArticle)
router.get("/articles", showAllArticles)
router.get("/article-by-category/:categoryId", articleByCategoryId)
router.get("/by-id/:articleId", getArticleById)
router.get("/last-by-category", lastArticles)
router.put("/update", updateArticle)
router.delete("/delete/:articleId", deleteArticaleById)
router.get("/myArticles/:userId", getArticleByUserId)


module.exports = router
