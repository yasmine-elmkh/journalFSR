import {getAcrticles} from "../api/article"

// const getAcrticles = async () => {
//     try{

//         const res = await fetch("http://localhost:4000/api/article/articles", {
//             method: "GET",
//             mode: "cors",
//             cache: "no-cache",
//             credentials: "same-origin",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             redirect: "follow",
//             referrerPolicy: "no-referrer",
//         })

//         if(res.ok){
//         }
//         const data = await res.json();
//         console.log("getAcrticls : ", data)
//         return data ;

//         return res.status

//     }catch(err){
//         console.log(err)
//     }
// }


const userInfo = JSON.parse(localStorage.getItem("userInfo"))

if(userInfo){
console.log(userInfo)
    getAcrticles().then(data => {
        // Handle the data returned from the API call
        console.log("Articles:", data);
        // You can update your UI or perform any other actions with the articles data here
    }).catch(err => {
        console.error("Error fetching articles:", err);
    });
    
}else{

}