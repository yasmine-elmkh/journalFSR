import { createArticles } from "../api/article.js";
import { convertToBase64 } from "../utils/convertToBase64.js";
import { isAuth } from "../utils/isAuth.js";

const submit = document.getElementsByClassName('saveBtn')[0];

let image = null;
let res = null;

const handleImage = async (e) => {
    e.preventDefault();

    const articleImage = document.getElementsByClassName('article-image-input')[0];
    const showImageForm = document.getElementsByClassName('showImageForm')[0];
    const articleTitle = document.querySelector('.ArticleTitle').value;
    const articleCategory = document.querySelector('.ArticleCategory').value;
    const articleDesc = document.querySelector('#ArticleDesc').value;

    try {

        const imageData =  await convertToBase64(articleImage) ;

        showImageForm.innerHTML = `<img style="margin: auto;" width="200px" height="auto" src="${imageData}" />`;
        image = imageData;

        const articleData = {
            title: articleTitle,
            description: articleDesc,
            image: image,
            owner: isAuth()._id,
            category: articleCategory
        };

        console.log(articleData)
        res = await createArticles(articleData);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};

submit.addEventListener("click", handleImage);