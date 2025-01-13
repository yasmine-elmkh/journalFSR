export const isAdmin = async (userInfo) => {
    try{

        console.log("userData : ", userInfo)
        const response = await fetch("https://fsrjournal.onrender.com/api/admin/user", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(userInfo),
        });

        console.log("response : ", response)

        const data = await response.json();

        console.log("data : ", data)
        return {data, status: response.status}
    }catch(err){
        console.log(err)
    }
}
export const deleteUserById = async (userData) => {
        try{

            console.log("userData : ", userData)

            const res = await fetch(`https://fsrjournal.onrender.com/api/admin/deleteUser`, {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(userData)
            })
    
            if(res.ok){
                console.log("response : ", response)

            }
    
            const data = await res.json();
            return data ;
        }catch(err){
            console.log(err)
        }
}
    
export const getUsers = async () => {
    try {
        
        const response = await fetch("https://fsrjournal.onrender.com/api/admin/users", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });


        const data = await response.json();

        console.log("data : ", data);
        return { data, status: response.status };
    } catch (err) {
        console.log(err);
    }
};
