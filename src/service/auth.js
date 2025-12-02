export default class AuthService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async signup(userid, password, name, email, url) {
        const data = await this.http.fetch("/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                userid,
                password,
                name,
                email,
                url,
            }),
        });
        this.tokenStorage.saveToken(data.token);
        return data;
    }

    async login(userid, password) {
        const data = await this.http.fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ userid, password }),
        });
        this.tokenStorage.saveToken(data.token);
        return data;
    }

    async me() {
        const token = this.tokenStorage.getToken();
        return this.http.fetch("/auth/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async logout() {
        this.tokenStorage.clearToken();
    }
}
