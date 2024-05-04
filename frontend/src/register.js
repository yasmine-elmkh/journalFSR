const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const password = document.getElementById("password")
const role = document.getElementById("role")
const submit = document.getElementById("submit")

const Alert = document.getElementById("alert")

const signup = async (e) => {
    e.preventDefault()

    submit.textContent = "Loading ..."
    submit.disabled = true


    if(role == ""){
        return {message: "role is required"}
    }

    const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        role: role.value
    }



    await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(userData), // body data type must match "Content-Type" header
      })
      .then(res => {
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

            submit.textContent = "Submit"
            submit.disabled = false
            return
        }
      })
      .catch(err => console.log("error : ",err))


      return ""; // parses JSON response into native JavaScript objects
}

submit.addEventListener("click", signup)