import { getAcrticles, 
         getLastAcrticle } from "../api/article.js";
import { getCategories } from "../api/category.js";
import { dateFormat } from "../utils/dateFormate.js";

const rightContent = document.getElementsByClassName("main-right-content")[0]
const categorySection = document.getElementById("category-list")
const leftContent = document.getElementsByClassName("last-post-by-category")[0]
const midContent = document.getElementsByClassName("main-mid-section")[0]


try{

    let articles = await getAcrticles()
    let categories =  await getCategories()
    let lastArticles = await getLastAcrticle()
    let lastArticle = lastArticles[0] ;


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

    // show data in letf section
    leftContent.innerHTML = lastArticles.map(item => `
    <a href="./articleById.html?id=${item._id}" style="color:black;  text-decoration: none !important; cursor:pointer;" class="last-post-by-category-item">
        <img class="last-post-image-by-category" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYzecrS2hzwe5iqglv-Z7UpnaSwuqshPVCEQ&usqp=CAU" alt="">
        <span class="category-name">${item.category.title}</span>
        <p class="last-post-title-by-category">${item.description.length > 100 ? item.description.slice(0,100) + "..." : item.description}</p>
    </a>`
    )
    .join("")

    // show data in main mid section 
    midContent.innerHTML = `
        <div class="main-mid-section-content">
            <img class="main-mid-item main-mid-img" src="https://ca-times.brightspotcdn.com/dims4/default/d1f506d/2147483647/strip/true/crop/5807x3871+1+0/resize/840x560!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F42%2Fe3%2F5731c20848a69999c9dea1b06bed%2F939111-me-usc-posthumous-degrees-gxc-0482.jpg" alt="">
            <h3 class="main-mid-item main-mid-title">${lastArticle.category.title}</h3>
            <p class="main-mid-item main-mid-description"> ${lastArticle.description}</p>
        </div>`
}catch(err){
    console.log("index eror : ", err)
}





