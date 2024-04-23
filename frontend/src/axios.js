
import axios from 'axios';
axios.defaults.withCredentials = true;

const axios_api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

// Add a response interceptor
axios_api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if (error.response) {
        if (error.response.status === 401) {
            window.sessionStorage.setItem("logged_in", false);
            window.location.href = "/login";
            return;
        }

        window.location.href = "/error";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //return Promise.reject(error);
});
export { axios_api };