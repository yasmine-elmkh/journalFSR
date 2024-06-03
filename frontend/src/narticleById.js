import { acrticlesById } from "../api/article.js"
import { dateFormat } from "../utils/dateFormate.js";

const leftCard = document.getElementById("card-body")
const rightCard = document.getElementById("rightCard")

// Get the URL parameters
const params = new URLSearchParams(window.location.search);
const articleId = params.get('id');
console.log("articleId : ", articleId)

try{
    const article = await acrticlesById(articleId)

    leftCard.innerHTML = `<img id="cardImage" class="card-img mb-3" src="${article?.image ? article?.image : "https://images.unsplash.com/photo-1529534571712-fad9a49b5ee9?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}">
                            <h2 class="h3 card-title"> ${article?.title}</h2>
                            <p class="main-right-item-time" style="font-size:12px; color:gray;">${dateFormat(article.createdAt).time} ${dateFormat(article.createdAt).date}</p>
                            <p class="card-text"> <span style="margin:0; padding:0; font-size:80px; color:#3caac8; font-weight:900;">${article?.description[0].toUpperCase()} </span>${article?.description.slice(1, article?.description.length)}</p>
                            <ul class="list-group mb-3">
                                <li class="list-group-item bg-light">Created by: <strong> ${article?.owner?.firstName} ${article?.owner?.lastName}</strong></li>
                                <li class="list-group-item bg-light">Category: <strong>${article?.category?.title}</strong></li>
                            </ul>`

    rightCard.innerHTML = `<h3 class="card-title h5 mb-3 text- mx-3" style="color:#3caac8;">Article Information</h3>
                                <ul style="border:0.3px solid #585858;" class="list-group mb-3">
                                <li class="list-group-item">Created by: <strong>${article?.owner?.firstName} ${article?.owner?.lastName}</strong></li>
                                <li class="list-group-item">Category: <strong>${article?.category?.title}</strong></li>
                                <li class="list-group-item">created At: <strong>${dateFormat(article.createdAt).time} ${dateFormat(article.createdAt).date}</strong></li>
                               
                            </ul>
                            </div>`

}catch(err){
    console.log(err)
}