import { APIClient } from "./axios";
import useToken from "@/hooks/token";

export const fetcher = async (url) => {
  const [token, setToken] = useToken("token", null);
  const { data } = await APIClient.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
  });
  return data;
};
