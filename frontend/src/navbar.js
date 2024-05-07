import { isAuth } from "../utils/isAuth.js"
import { logout } from "../api/auth.js";

const navToggle = document.getElementById("user-nav-toggle")
const authBtns = document.getElementById("auth-btns")
const logoutBtn = document.getElementById("logout-btn")

if(isAuth()){
    navToggle.classList.add("displayBlock")
    authBtns.classList.add("diplayNone")
    logoutBtn.addEventListener("click", logout)
}else{
    navToggle.classList.add("diplayNone")
    authBtns.classList.add("displayBlock")
}