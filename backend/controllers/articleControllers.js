const { isValidObjectId } = require("mongoose");
const Article = require("../models/articleModels");
//postArticle
const postArticle = async (req,res)=>{
    try{
        const {title, description, owner , category} = req.body

        if(!title || !description || !owner || !category){
            return res.status(401).json({
                message: "all fields are required!"
            })
        }
        
        const article = new Article({
         title,
         description,
         owner,
         category
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

            return res.status(403).json({
                message: "Id not valid!"
            })
        }

      const findArticleById = await Article.findById(articleId)
                                            .populate("owner","_id firstName lastName")
                                            .populate("category","_id title")
                                               
        if(!findArticleById){
            return res.status(403).json({
                message: "article not found!!"
            })
        }
        return res.status(200).json(findArticleById)
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}

const articleByCategoryId = async (req,res)=>{
    try{
        const categoryId = req.params.categoryId
        
        if(!isValidObjectId(categoryId)){
            return res.status(403).json({
                message: "Id not valid!"
            })
        }

      const articles = await Article.find({category: categoryId})
                                               
      
        if(!articles){

            return res.status(403).json({
                message: "article not found!!"
            })
        }
        return res.status(200).json(articles)
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}

//dropeArticaleById
const deleteArticaleById = async (req,res)=>{
    try{
        const articleId=req.params.articleId

        if(!articleId)
        return res.status(400).json({
        message:"all fields must be grab!"
        })
    

        if(!isValidObjectId(articleId)){
            return res.status(402).json({
                message:"article id not valid!"
            })
         }

        const dropeArticleById = await Article.findByIdAndDelete(articleId)
        if(!dropeArticleById)
        res.status(402).json({
          message:"the article didn't exist!"
        })
        res.status(200).json({
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
                                        .sort({ createdAt: -1 })
                                        .limit(5);
        console.log(allArticles); 

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

const lastArticles = async (req, res) => {
    try{

        const a = await Article.find({category: "66284fe6df12cca6456100d2"})
                                .sort({ createdAt: -1 })
                                .limit(1)
                                .populate("category","_id title")

        const b = await Article.find({category: "6628525a04532782b7b26d52"})
                                .sort({ createdAt: -1 })
                                .limit(1)
                                .populate("category","_id title")

        const c = await Article.find({category: "663140a9610d2403890eada4"})
                                .sort({ createdAt: -1 })
                                .limit(1)
                                .populate("category","_id title")

        let lastArticleArr = []
        if(a || a.length > 0){
            lastArticleArr = [...lastArticleArr, ...a]
        }

        if(b || b.length > 0){
            lastArticleArr = [...lastArticleArr, ...b]
        }

        if(c || c.length > 0){
            lastArticleArr = [...lastArticleArr, ...c]
        }
        
        console.log(lastArticleArr)

        res.status(200).json(lastArticleArr)
    }catch(err){

    }
}
module.exports = {
    getArticleById,
    postArticle,
    lastArticles,
    deleteArticaleById,
    showAllArticles,
    updateArticle,
    articleByCategoryId
}