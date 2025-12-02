export default class PostService {
    constructor(http, tokenStorage) {
        this.tokenStorage = tokenStorage;
        this.http = http;
    }

    async getPosts(userid) {}

    async createPost(text) {
        return this.http.fetch(`post/`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify({ text, userid: "jumi", name: "주미" }),
        });
    }

    async updatePost(postId, text) {}

    async deletePost(postId) {}

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }
}
