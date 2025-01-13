export const updateUser = async (userData) => {
    try{
        console.log("userData : ", userData)
        const response = await fetch("https://fsrjournal.onrender.com/api/user/update", {
            method: "PUT",
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

        console.log("response : ", response)

        const data = await response.json();

        console.log("data : ", data)
        return {data, status: response.status}
    }catch(err){
        console.log(err)
    }
}


