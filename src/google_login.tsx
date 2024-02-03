import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API, storeDataInSession } from "./utils/utils";

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        throw new Error("Authorization code not found.");
      }

      const response = await API.post(
        "/auth/login/google",
        JSON.stringify({ code }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      storeDataInSession("access_token", data.access_token);
      storeDataInSession("refresh_token", data.refresh_token);

      if (data.access_token) {
        navigate("/home");
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Login error:", error);
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};

export default GoogleCallback;
