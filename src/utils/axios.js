import axios from "axios";
import useToken from "@/hooks/token";

export const APIClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
