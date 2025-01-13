export const getCategories = async () => {
    try{

        const res = await fetch("https://fsrjournal.onrender.com/api/category/allCategory", {
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
export const createCategorie = async (categorieData) => {
    try{

        console.log(categorieData)
        const res = await fetch("https://fsrjournal.onrender.com/api/category/create", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(categorieData),
        })
        
        console.log("response : ", response)
        if(res.ok){
        }

        const data = await res.json();
        return data ;
    }catch(err){
        console.log(err)
    }
}
export const deleteCategorie = async () => {
    try{

        const res = await fetch("https://fsrjournal.onrender.com/api/category/delete", {
            method: "DELETE",
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
export const updateCategorie = async () => {
    try{

        const res = await fetch("https://fsrjournal.onrender.com/api/category/update", {
            method: "PUT",
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