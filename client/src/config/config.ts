export const CONFIG = {
    port: 3200,
    baseUrl() {
        return window.location.protocol + "//" + window.location.hostname + ":" + this.port;
    }
}
export const REST = {
    user: "/api/user/",
    checkmail: "/api/user/checkEmail",
    login: "/api/user/login"
}