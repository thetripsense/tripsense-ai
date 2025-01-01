import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get("code");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/callback?code=${code}`
        );
        authContext?.login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    };

    fetchToken();
  }, [navigate, authContext]);

  return <div>Loading...</div>;
};

export default AuthCallback;
