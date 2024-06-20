const { isValidObjectId } = require("mongoose");
const Article = require("../models/articleModels");
const User = require('../models/userModels')

//postArticle
const postArticle = async (req,res)=>{
    try{
        const {title, 
                description, 
                owner , 
                category, 
                image} = req.body

        if(!isValidObjectId(category)) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }

        if(!title || !description || !owner){
            return res.status(401).json({
                message: "all fields are required!"
            })
        }
        
        const article = new Article({
            title,
            description,
            owner,
            category,
            image
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
                                        .limit(7);

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

        const lastPost = await Article.find()
                                    .sort({ createdAt: -1 })
                                    .limit(1)
                                    .populate("category","_id title description")
  
        const a = await Article.find({category: "665648cc20d44203fc9f6a19"}) // Editorial
                                .sort({ createdAt: -1 })
                                .limit(1)
                                .populate("category","_id title description")
                                console.log("a : ",a )
        const b = await Article.find({category: "6656490f20d44203fc9f6a25"}) //Culture et loisirs

                                .sort({ createdAt: -1 })
                                .limit(1)
                                .populate("category","_id title description")
                                console.log("b : ",b )

        const c = await Article.find({category: "6656493220d44203fc9f6a2e"}) //Carrières et développement personnel
                                .sort({ createdAt: -1 })
                                .limit(1)
                                .populate("category","_id title description")
                                console.log("c : ",c )
        const d = await Article.find({category: "6656490420d44203fc9f6a22"}) //Tech talks
                                .sort({ createdAt: -1 })
                                .limit(1)
                                .populate("category","_id title description")
                                console.log("d : ",d )
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

        if(d || d.length > 0){
            lastArticleArr = [...lastArticleArr, ...d]
        }
        
        console.log("lastArticleArr : ",lastArticleArr )

        res.status(200).json({lastArticleArr, lastPost: lastPost[0]})
    }catch(err){

    }
}
   const getArticleByUserId = async (req,res)=>{
    try{
      const userId = req.params.userId
      if(!isValidObjectId(userId)){
        return res.status(400).json({
            message: "id error!"
        })
      }
      const isAdmin = await User.findById(userId)

      let articles = []
      if(isAdmin.role == "admin"){
            articles = await Article.find()
                                .select("_id description title createdAt")
      }else{
          
            articles = await Article.find({owner: userId})
                                           .select("_id description title createdAt")
    }
   
    res.status(200).json(articles)
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
    lastArticles,
    deleteArticaleById,
    showAllArticles,
    updateArticle,
    articleByCategoryId,
    getArticleByUserId
}