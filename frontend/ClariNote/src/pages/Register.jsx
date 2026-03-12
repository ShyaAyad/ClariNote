import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useUserStore } from "../store/User.store.js";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation , setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  const singUp = useUserStore((state) => state.register);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const success = await singUp(name, email, password, passwordConfirmation );
      if(success){
        navigate('/');
      }
    } catch (error) {
      console.log("Failed to register user", error);
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
        Register
      </Typography>
      <form onSubmit={handleRegister}>
         <TextField
          label="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          fullWidth
          margin="normal"
        />

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

        <TextField
          label="Confirm Password"
          value={passwordConfirmation }
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          fullWidth
          margin="normal"
        />

        <Typography variant="body2" color="textSecondary" mt={1}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Continue
        </Button>
      </form>
    </Box>
  );
}

export default Register;
