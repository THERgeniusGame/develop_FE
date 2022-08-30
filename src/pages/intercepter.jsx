import axios from "axios";

//요청 인터셉터
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

//응답 인터셉터
axios.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    return Promise.reject(err);
}
);