import { acrticlesByCategory, getAcrticles } from "../api/article.js";
import { dateFormat } from "../utils/dateFormate.js";

const rightContent = document.getElementsByClassName("article-right")[0]
const leftContent = document.getElementsByClassName("article-left")[0]
const articleTitleElement = document.getElementsByClassName("article-title")[0]

// Get the URL parameters
const params = new URLSearchParams(window.location.search);
const categoryId = params.get('id');
const articleName = params.get('c');

articleTitleElement.textContent = `${articleName}`

try{
    let articles = await getAcrticles()
    let articleByCat = await acrticlesByCategory(categoryId)


    rightContent.innerHTML = articles.map(item => `
                <div class="card" style="background-color: #feeae3;">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text"><small class="text-muted">${dateFormat(item.createdAt).time} ${dateFormat(item.createdAt).date}</small></p>
                        <p class="card-text">${item.description.length > 100 ? item.description.slice(0,100) + "..." : item.description}</p>
                    </div>
                </div>`)
                .join("")
                
                
    leftContent.innerHTML = articleByCat.length > 0 ?  articleByCat.map(item => `
    <div class="card p-2" style="max-width: 100%; height: 200px;">
    <div class="row g-0" style="height: 100%;">
      <div class="col-md-5" style="height: 100%;">
            <img src="https://assets.codepen.io/6093409/mountains-6.jpg?width=200&format=auto" style="width: 95%; height: 100%; object-fit: cover;"
        />
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text"><small class="text-muted">${dateFormat(item.createdAt).time} ${dateFormat(item.createdAt).date}</small></p>
          <p class="card-text">${item.description.length > 100 ? item.description.slice(0,100) + "..." : item.description}</p>
        </div>
        <div class="" style="color: black; 
                margin-left: auto; 
                width: 110px;" 
              href=""><a class="py-1 px-3"  style="color: rgb(255, 255, 255); text-decoration: none; background-color: #252525;  
                                                    border-radius: 5px; " href="./articleById.html?id=${item._id}">read More</a>
        </div>
      </div>
    </div>
  </div>`).join("")  : `<h6 class="card-title text-center">No Article founded</h6>`
}catch(err){
    console.log(err)
}
