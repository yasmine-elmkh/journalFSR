export const login = async (email, password) => {
    try{
        const response = await fetch("https://fsrjournal.onrender.com/api/auth/signin", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({email, password}),
        });

        console.log("response : ", response)

        const data = await response.json();

        console.log("data : ", data)
        return {data, status: response.status}
    }catch(err){
        console.log(err)
    }
}


export const register = async (userData) => {
    try{
        const response = await fetch("https://fsrjournal.onrender.com/api/auth/signup", {
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

        return response
    }catch(err){
        console.log(err)
    }
}


export const logout = () => {
    localStorage.removeItem("userInfo")
    window.location.reload();
}


