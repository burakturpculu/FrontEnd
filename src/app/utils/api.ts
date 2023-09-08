import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
  timeout: 1000 * 5,
  headers: {
    "Content-Type": "application/json",
  },
});
