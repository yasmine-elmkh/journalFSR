
export const  createArticles = async (articleData) => {
    try{
console.log(articleData)
        const res = await fetch("https://fsrjournal.onrender.com/api/article/create", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(articleData),
        })

        if(res.ok){
        }
        console.log(res)
        const data = await res.json();
        return {data, status: res.status} ;
    }catch(err){
        console.log(err)
    }
}


export const getAcrticles = async () => {
    try{

        const res = await fetch("https://fsrjournal.onrender.com/api/article/articles", {
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

export const getLastAcrticle = async () => {
    try{

        const res = await fetch("https://fsrjournal.onrender.com/api/article/last-by-category", {
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
        console.log(data)
        return data ;
    }catch(err){
        console.log(err)
    }
}

export const acrticlesByCategory = async (articleId) => {
    try{

        const res = await fetch(`https://fsrjournal.onrender.com/api/article/article-by-category/${articleId}`, {
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

export const acrticlesById = async (articleId) => {
    try{

        const res = await fetch(`https://fsrjournal.onrender.com/api/article/by-id/${articleId}`, {
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

export const getArticleByUserId = async (userId) => {
    try{

        const res = await fetch(`https://fsrjournal.onrender.com/api/article/myArticles/${userId}`, {
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
        console.log(data)
        return data ;
    }catch(err){
        console.log(err)
    }
}
export const deleteArticaleById = async (articleId) => {
    try{

        const res = await fetch(`https://fsrjournal.onrender.com/api/article/delete/${articleId}`, {
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
        console.log(data)
        return data ;
    }catch(err){
        console.log(err)
    }
}
