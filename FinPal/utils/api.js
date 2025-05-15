import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

console.log(API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL + "/api",
});

//On every request in /api, if token is in aysnc storage add to header
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;


});

export default api;