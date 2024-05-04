export const getCategories = async () => {
    try{

        const res = await fetch("http://localhost:4000/api/category/allCategory", {
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
        return data ;
    }catch(err){
        console.log(err)
    }
}