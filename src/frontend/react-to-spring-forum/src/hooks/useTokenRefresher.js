import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserAPI } from "../api/UserAPI";

const useTokenRefresher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshTokenInterval = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          navigate("/login");
          return;
        }

        const decoded = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeToExpire = decoded.exp - currentTime;

        if (timeToExpire < 300) {
          const response = await UserAPI.refreshToken(localStorage.getItem("refreshToken"));
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        navigate("/login");
      }
    };

    const intervalId = setInterval(refreshTokenInterval, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);
};

export default useTokenRefresher;
