import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { Box, Typography } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Full viewport height
    >
      <GoogleLoginButton />
    </Box>
  );
};

export default LoginPage;
