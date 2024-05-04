const email = document.getElementById("email")
const password = document.getElementById("password")
const submit = document.getElementById("submit")
const Alert = document.getElementById("alert")

const signIn = async (e) => {
    e.preventDefault();

    submit.textContent = "Loading ...";
    submit.disabled = true;

    const userData = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch("http://localhost:4000/api/auth/signin", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            Alert.style.display = "block";
            Alert.textContent = "Log in successful";
            Alert.className = "alert alert-success";

            const data = await response.json();
            console.log("Data received from server:", data);

             // Assuming the token is sent in the response body as responseData.token
        if (data.token) {
            // Set the token as a cookie
            document.cookie = `token=${data.token}; path=/;`;
            console.log("Token set as cookie:", data.token);
        }

            localStorage.setItem("userInfo", JSON.stringify(data))
            document.cookie = "userInfo" + "=" + data + ";" + ""  + ";path=/";

            // Do something with the data if needed
        } else {
            if (response.status === 403) {
                Alert.style.display = "block";
                Alert.textContent = "All fields are required";
                Alert.className = "alert alert-danger";
            } else if (response.status === 400) {
                Alert.style.display = "block";
                Alert.textContent = "Email or Password incorrect";
                Alert.className = "alert alert-danger";
            }

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