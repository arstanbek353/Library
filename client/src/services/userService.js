import $api from "../http";

export default class UserService {
    static fetchUsers() {
        return $api.get('/users')
    }

    static deleteUser(username) {
        return $api.get(`/users/${username}/delete`)
    }

    static setUserRole(username, role) {
        return $api.post(`/users/${username}/update`, { role })
    }
}