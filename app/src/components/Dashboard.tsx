import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Button, Typography, Box } from "@mui/material";

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext?.user) {
    return <Typography>Loading...</Typography>;
  }

  const { user, logout } = authContext;

  return (
    <Box textAlign="center" mt={4}>
      <Avatar
        src={user.picture}
        alt={user.name}
        sx={{ width: 100, height: 100, margin: "0 auto" }}
      />
      <Typography variant="h5" mt={2}>
        Welcome, {user.name}!
      </Typography>
      <Typography>Email: {user.email}</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={logout}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
