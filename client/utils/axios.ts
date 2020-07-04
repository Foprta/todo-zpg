import Axios from "axios";

Axios.defaults.baseURL = "http://api.todo-zpg.com/api";

const securedAxios = Axios.create();

let authInterceptor;

export function addAuthHeader(token: string) {
  authInterceptor = securedAxios.interceptors.request.use((config) => {
    if (typeof window === "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.withCredentials = true;
    }
    return config;
  });
}

export function removeAuthHeader() {
  securedAxios.interceptors.request.eject(authInterceptor);
}

export default securedAxios;
