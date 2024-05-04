
export const getAcrticles = async () => {
    try{

        const res = await fetch("http://localhost:4000/api/article/articles", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        })

        if(res.ok){
        }
        const data = await res.json();
        console.log("getAcrticls : ", data)
        return data ;

        return res.status

    }catch(err){
        console.log(err)
    }
}