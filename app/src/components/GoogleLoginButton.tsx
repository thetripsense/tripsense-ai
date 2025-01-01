import React from "react";
import Button from "@mui/material/Button";

const GoogleLoginButton: React.FC = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  console.log({ googleClientId });

  const handleLogin = () => {
    const redirectUri = `${window.location.origin}/auth/callback`;
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
    window.location.href = googleLoginUrl;
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Login with Google
    </Button>
  );
};

export default GoogleLoginButton;
