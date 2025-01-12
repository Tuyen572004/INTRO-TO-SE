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
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          navigate("/login");
          return;
        }

        const refreshTokenDecoded = jwtDecode(refreshToken);
        if (refreshTokenDecoded.exp < Math.floor(Date.now() / 1000)) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
          return;
        }

        const accessTokenDecoded = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeToExpire = accessTokenDecoded.exp - currentTime;

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
