import axios from "axios";
import Swal from "sweetalert2";

// axios 기본 주소 & header 타입 세팅
export const api = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// 매 실행 시 토큰값 넣기, 없으면 null값이 들어간다
api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

// Axios 인스턴스 설정
const instance = axios.create({
  baseURL: process.env.REACT_APP_SURVER,
});

// ┏----------interceptor를 통한 response 설정----------┓
instance.interceptors.response.use(
  async response => {
      if (response.data.message === "new token") {
          const { config } = response;
          const originalRequest = config;

          const newAccessToken = response.data.myNewToken;
          // localStorage.setItem("token", newAccessToken);
          localStorage.removeItem("token")

          axios.defaults.headers.common.authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
      }
      return response;
  },
  
);