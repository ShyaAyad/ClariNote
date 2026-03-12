import { Box, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/User.store';
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
    const login = useUserStore((state) => state.login);
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const success = await login(email, password);
        if(success){
          navigate('/');
        }
      } catch (error) {
        console.log("Failed to log user in", error);
      }
    };
  
    return (
      <Box
        sx={{
          width: 350,
          mx: "auto",
          mt: 10,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
            margin="normal"
          />
  
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
            margin="normal"
          />
  
          <Typography variant="body2" color="textSecondary" mt={1}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Continue
          </Button>
        </form>
      </Box>
    );
}

export default Login