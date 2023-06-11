import useToken from "@/hooks/token";
import { APIClient } from "./axios";

export const fetcher = async (url) => {
  const [token, setToken] = useToken("token", null);
  const { data } = await APIClient.get(url, {
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
  });
  return data;
};
