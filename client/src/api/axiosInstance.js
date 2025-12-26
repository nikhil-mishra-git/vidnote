import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://vidnote-gpcz.onrender.com/api/v1",
    withCredentials: true
});

export default axiosInstance;
