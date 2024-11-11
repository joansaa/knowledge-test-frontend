import axios from "axios";

const api = axios.create({
    baseURL: "https://67303feb66e42ceaf15fc512.mockapi.io",
    });

    api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error:", error);
        return Promise.reject(error);
    }
);

export default api;