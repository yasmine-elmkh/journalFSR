import { isAuth } from "../utils/isAuth.js"
import { logout } from "../api/auth.js";

const navToggle = document.getElementById("user-nav-toggle")
const authBtns = document.getElementById("auth-btns")
const logoutBtn = document.getElementById("logout-btn")
const navLink = document.getElementById("nav-item")
console.log("is auth : ", isAuth())
if(isAuth()){
    if(isAuth().role == "Journalist" && window.location.pathname.split("/").includes("profile.html")){
        navLink.innerHTML = `
            <a class="nav-link active" aria-current="page" href="./createArticle.html">Create Article</a>
            <a class="nav-link active" aria-current="page" href="./journalisteArticles.html">Mes Article</a>
            `
            
    }else if(isAuth().role == "Visiteur" && window.location.pathname.split("/").includes("profile.html")){
        navLink.innerHTML = `
            <a class="nav-link active" aria-current="page" href="./index.html">Acceuil</a>`
    }
    else if(isAuth().role == "admin" && window.location.pathname.split("/").includes("profile.html")){
        navLink.innerHTML = `
        <a class="nav-link active" aria-current="page" href="./crateCategory.html" >Ceer categorie</a>
        <a class="nav-link active" aria-current="page" href="./categorys.html" >Categories</a>
        <a class="nav-link active" aria-current="page" href="./users.html" >Utilisateurs</a>
        <a class="nav-link active" aria-current="page" href="./adminContacte.html" >Contacter les Journalistes</a>`

    }

    navToggle.classList.add("displayBlock")
    authBtns.classList.add("diplayNone")
    logoutBtn.addEventListener("click", logout)
}

if(!isAuth()){
    navToggle.classList.add("diplayNone")
    authBtns.classList.add("displayBlock")
}

