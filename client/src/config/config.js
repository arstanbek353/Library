const remoteAPI_URL = "https://floating-journey-29986.herokuapp.com"
const localAPI_URL = "http://localhost"
export const baseUrl = ""
export const API_URL = remoteAPI_URL || localAPI_URL
export const roles = {
    viewer: "viewer",
    editor: "editor",
    admin: "admin",
}