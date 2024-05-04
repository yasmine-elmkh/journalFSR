export const isAuth = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    return userInfo
}