export const logout = () => {
    localStorage.removeItem("userInfo")
    window.location.reload();
}