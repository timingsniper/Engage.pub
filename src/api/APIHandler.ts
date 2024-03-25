import axios from "axios";
import { signOut } from "next-auth/react";
import router from "next/router";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, // Simply return the response for non-error cases
  (error) => {
    if (error.response && error.response.status === 401) {
      signOut({ redirect: false });
      window.location.href = "/login";
    }
    return Promise.reject(error); // Forward the error to be handled elsewhere
  }
);
