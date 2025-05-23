import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // URL base del backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
