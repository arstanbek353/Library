import { makeAutoObservable } from "mobx";
import AuthService from "../services/authService";
import axios from 'axios';
import { API_URL } from "../http";

export default class Store {
    user = {};
    users = [];
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setUsers(users) {
        this.users = users;
    }

    deleteUser(username) {
        this.users = this.users.filter(user => user.email !== username);
    }

    setUserRole(username, role) {
        let index = this.users.findIndex(user => user.email === username)
        index ? this.users[index].role = role : index = null
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response
        } catch (e) {
            return e.response
        }
    }

    async registration(email, password, role) {
        try {
            const response = await AuthService.registration(email, password, role);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response
        } catch (e) {
            return e.response
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
            window.location.reload()
            return response
        } catch (e) {
            return e.response
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response
        } catch (e) {
            return e.response
        } finally {
            this.setLoading(false);
        }
    }
}
