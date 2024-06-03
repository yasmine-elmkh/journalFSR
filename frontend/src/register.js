import { register } from "../api/auth.js";

const userInfo = JSON.parse(localStorage.getItem("userInfo"))
if(userInfo){
    window.location.href = "./index.html";
}

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const password = document.getElementById("password")
const role = document.getElementById("role")
const submit = document.getElementById("submit")
const Alert = document.getElementById("alert")

submit.addEventListener("click", function(event) {
    event.preventDefault(); 


const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    role: role.value
}

// console.log(userData)

const signup = async (e) => {
    e.preventDefault()
    try{
        submit.textContent = "Loading ..."
        submit.disabled = true
        if(role == ""){
            Alert.style.display = "block" ;
            Alert.textContent = "role is required" ;
            Alert.className = "alert alert-danger";
            
            return {message: "role is required"}
        }
    
         const res = await register(userData)
            // console.log(userData)

            if(res.ok){            
                Alert.style.display = "block" ;
                Alert.textContent = "registration succeed" ;
                Alert.className = "alert alert-success";
            }else{
                if(res.status == 400){
                    Alert.style.display = "block" ;
                    Alert.textContent = "all field are required" ;
                    Alert.className = "alert alert-danger";
                }
    
                if(res.status == 401){
    
                    Alert.style.display = "block" ;
                    Alert.textContent = "email already exist!" ;
                    Alert.className = "alert alert-primary";
                }
            }
    
    
            submit.textContent = "Registre"
            submit.disabled = false
    }catch(err){
        console.log("register err : ", err)
    }
}

submit.addEventListener("click", signup)
})
