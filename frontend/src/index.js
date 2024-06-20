import { getAcrticles, 
         getLastAcrticle } from "../api/article.js";
import { getCategories } from "../api/category.js";
import { dateFormat } from "../utils/dateFormate.js";
import { showLoader, hideLoader } from '../utils/loader.js';

const rightContent = document.getElementsByClassName("main-right-content")[0]
const categorySection = document.getElementById("category-list")
const leftContent = document.getElementsByClassName("last-post-by-category")[0]
const midContent = document.getElementsByClassName("main-mid-section")[0]


try{
    showLoader()
    let articles = await getAcrticles()
    let categories =  await getCategories()
    let {lastArticleArr} = await getLastAcrticle()
    let { lastPost } = await getLastAcrticle()
    hideLoader()
    
    console.log("lastPost : ", lastPost)

    // show data in main right section 
    rightContent.innerHTML = articles.map(item => `
        <a class="main-right-item" href="./articleById.html?id=${item._id}" style="color:black;  text-decoration: none !important; cursor:pointer;">
            <p class="main-right-item-time">${dateFormat(item.createdAt).time}</p>
            <p class="main-right-item-description">${item.description.length > 100 ? item.description.slice(0,100) + "..." : item.description}</p>
        </a>`
    )
    .join("")

    // show categories in category section
    categorySection.innerHTML = categories.map(item =>`
        <li class="category-list-item">
            <a style="color:black;  text-decoration: none !important; cursor:pointer;" href="./articles.html?c=${item.title}&id=${item._id}">${item.title}</a>
        </li>
        `
    )
    .join("")
console.log("last art : ", lastArticleArr)
    // show data in letf section
    leftContent.innerHTML = lastArticleArr.map(item => `
    <a href="./articleById.html?id=${item._id}" style="color:black;  text-decoration: none !important; cursor:pointer;" class="last-post-by-category-item">
        <img class="last-post-image-by-category" src="${item?.image ? item?.image : "https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg"}" alt="">
        <span class="category-name">${item.category.title}</span>
        <div class="last-post-title-by-category">
            ${item.description.length > 100 ? item.description.slice(0,100) + "..." : item.description}
        </div>
    </a>`
    )
    .join("")

    // show data in main mid section 
    midContent.innerHTML = `
        <div class="main-mid-section-content">
            <img class="main-mid-item main-mid-img" src="${ lastPost?.image ? lastPost?.image : "https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg"}" alt="">
            <h6 style="color:#3caac8; font-size : 20px ;text-align : left;" class="main-mid-item main-mid-title primary">${lastPost.category.title} : </h6>
            <h1 style="color:#0e6883; font-size : 75px"  class="main-mid-item main-mid-title text-center">${lastPost.title}</h1>
            <div class="main-mid-item main-mid-description px-4 text-start"> 
                    ${lastPost.description}
            </div>
        </div>`
}catch(err){
    console.log("index eror : ", err)
}





