const { isValidObjectId } = require("mongoose");
const Article = require("../models/articleModels");
//postArticle
const postArticle = async (req,res)=>{
    try{
        const {title, description, owner} = req.body

        if(!title || !description || !owner){
            return res.status(401).json({
                message: "all fields are required!"
            })
        }
        
        const article = new Article({
         title,
         description,
         owner,
        })

        if(!article) return res.status(401).json({
            message: "article didn't saved!"
        })
        
        await article.save()

        res.status(200).json({
            message: "article created!"
        })
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}
//getArticleById
const getArticleById = async (req,res)=>{
    try{
        const articleId = req.params.articleId
        if(!isValidObjectId(articleId)){

            return res.status(401).json({
                message: "Id not valid!"
            })
        }

      const findArticleById = await Article.findById(articleId)
                                               .populate("owner", "_id name") // katmchi l owner u katsift lina les parametres li 3tinaha fl arg2
      
        if(!findArticleById){

            return res.status(403).json({
                message: "article not found!!"
            })
        }
        res.status(200).json(findArticleById)
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}
//dropeArticle

//dropeArticaleById
const dropeArticaleById = async (req,res)=>{
    try{
        const articleId=req.params.articleId
        if(!articleId)
        return res.status(400).json({
        message:"all fields must be grab!"
        })
    
        const findArticleById = await Article.findByIdAndDelete(articleId)
        res.json({
            message:"the article is deleted"
        })
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}
//showAllArticles
const showAllArticles = async (req,res)=>{
    try{
    const allArticles = await Article.find()

    if(!allArticles || allArticles.length < 1){
        return res.status(403).json({
            message: "no article founded!"
        })
    }
    res.status(200).json(allArticles)
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}
//updateArticle

const updateArticle = async (req, res) => {
    try{
        const {articleId, title, description} = req.body;

        if(!isValidObjectId(articleId)){
            return res.status(400).json({
                message: "id error!"
            })
        }

        const article = await Article.findById(articleId)

        article.title = title;
        article.description = description;

        await article.save();

        res.status(200).json({
            message: "article updated!"
        })
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}

module.exports = {
    getArticleById,
    postArticle,
    dropeArticaleById,
    showAllArticles,
    updateArticle
}