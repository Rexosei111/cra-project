import { useState, useEffect } from "react";
import axios from "axios";

export const useTokenRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [token, setToken] = useToken(token, null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        setIsRefreshing(true);
        const response = await axios.post("/api/refresh-token", {
          refresh_token: token.refresh_token,
        });
        const newAccessToken = response.data.accessToken;
        setToken(newAccessToken);
        // Update the access token in your state or wherever you store it
        // Example: setAccessToken(newAccessToken);
      } catch (error) {
        // Handle error (e.g., logout user, show error message)
        console.error("Failed to refresh access token", error);
      } finally {
        setIsRefreshing(false);
      }
    };

    const intervalId = setInterval(() => {
      // Refresh the access token 5 minutes before it expires
      //   const timeUntilExpiration = // calculate time until expiration of access token
      //   if (timeUntilExpiration < (5 * 60 * 1000)) {
      //     refreshAccessToken();
      //   }
    }, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, [refreshToken]);

  return isRefreshing;
};

const useToken = (key, initialValue) => {
  const [token, setState] = useState(() => {
    // Initialize the state
    try {
      if (typeof window !== "undefined") {
        const value = window.localStorage.getItem(key);
        // Check if the local storage already has any values,
        // otherwise initialize it with the passed initialValue
        return value ? JSON.parse(value) : initialValue;
      }
    } catch (error) {
      console.log(error);
    }
  });

  const setToken = (value) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      if (typeof window !== "undefined") {
        const valueToStore = value instanceof Function ? value(state) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setState(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [token, setToken];
};

export default useToken;
