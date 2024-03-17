import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
});