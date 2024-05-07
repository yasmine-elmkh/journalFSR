import { isAuth } from "../utils/isAuth.js";
import { login } from "../api/auth.js";

if(isAuth()){
    window.location.href = "./index.html";
}

if(!isAuth()){
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const submit = document.getElementById("submit")
    const Alert = document.getElementById("alert")
    
    const signIn = async (e) => {
        e.preventDefault();
        try {
            submit.textContent = "Loading ...";
            submit.disabled = true;
        
            const response = await login(email.value, password.value)

            Alert.style.display = "block";
            Alert.textContent = response?.status !== 200 ? `${response.data.message}` : "Succeed logIn";
            Alert.className = response?.status !== 200 ? "alert alert-danger" : "alert alert-success";

            if (response.status == 200 ) {
                localStorage.setItem("userInfo", JSON.stringify(response.data));

                window.location.href = "./index.html";
            }
            
            submit.textContent = "Submit";
            submit.disabled = false;
        } catch (error) {
            console.error("Error:", error);
            submit.textContent = "Submit";
            submit.disabled = false;
        }
    };
    
    submit.addEventListener("click", signIn)
}