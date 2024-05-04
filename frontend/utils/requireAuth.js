export const requireAuth = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    if(!userInfo){
        window.location.href = "./logIn.html"
    }
    return
}