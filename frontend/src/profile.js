import { updateUser } from "../api/user.js";
import { isAuth } from "../utils/isAuth.js";
import { requireAuth } from "../utils/requireAuth.js";

requireAuth()

const firstNameElement = document.getElementsByClassName("_firstName")[0]
const lastNameElement = document.getElementsByClassName("_lastName")[0]
// const passwordElement = document.getElementsByClassName("password")[0]
const emailElement = document.getElementsByClassName("_email")[0]
const roleElement = document.getElementsByClassName("_role")[0]
const submitBtn = document.getElementsByClassName("submitBtn")[0]

const firstNameInput = document.getElementById("firstNameForm");
const lastNameInput = document.getElementById("lastNameForm");
const passwordInput = document.getElementById("passwordForm");

const {_id, firstName, lastName, email, role} = isAuth()
try{


    firstNameElement.textContent = firstName
    lastNameElement.textContent = lastName
    emailElement.textContent = email
    roleElement.textContent = role

}catch(err){
    console.log(err)
}

const update = async (e) => {
    e.preventDefault()
    try{
        const userData = {
            userId: _id ,
            firstName : firstNameInput.value ,
            lastName : lastNameInput.value ,
            password : passwordInput.value 
        }
       const res = await updateUser(userData)
       console.log(res)
       if(res.status == 200){
        localStorage.setItem("userInfo", JSON.stringify(res.data))
        window.location.href = "./profile.html"
       }

    }catch(err){
        console.log(err)
    }

}


submitBtn.addEventListener("click" , update)