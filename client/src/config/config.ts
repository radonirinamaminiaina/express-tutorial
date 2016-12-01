export const CONFIG = {
    port: 5500,
    baseUrl() {
        return window.location.protocol + "//" + window.location.hostname + ":" + this.port;
    }
}
export const REST = {
    user: "/api/user/"
}