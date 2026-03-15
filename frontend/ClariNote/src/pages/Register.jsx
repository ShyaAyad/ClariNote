import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useUserStore } from "../store/User.store.js";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  const singUp = useUserStore((state) => state.register);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const success = await singUp(name, email, password, passwordConfirmation);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.log("Failed to register user", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 350,
          mx: "auto",
          mt: 10,
          p: 3,
          borderRadius: "14px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          mb={2}
          color="#f0f4ff"
          fontWeight={600}
        >
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
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#f0f4ff",
                "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                "&:hover fieldset": { borderColor: "rgba(99,179,237,0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#63b3ed" },
              },
              "& .MuiInputLabel-root": { color: "#606880" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#63b3ed" },
            }}
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#f0f4ff",
                "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                "&:hover fieldset": { borderColor: "rgba(99,179,237,0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#63b3ed" },
              },
              "& .MuiInputLabel-root": { color: "#606880" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#63b3ed" },
            }}
          />

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#f0f4ff",
                "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                "&:hover fieldset": { borderColor: "rgba(99,179,237,0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#63b3ed" },
              },
              "& .MuiInputLabel-root": { color: "#606880" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#63b3ed" },
            }}
          />

          <TextField
            label="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#f0f4ff",
                "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                "&:hover fieldset": { borderColor: "rgba(99,179,237,0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#63b3ed" },
              },
              "& .MuiInputLabel-root": { color: "#606880" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#63b3ed" },
            }}
          />

          <Typography variant="body2" mt={1} color="#f0f4ff" textAlign="center">
            Already have an account? <Link to="/login" style={{ color: "#63b3ed" }}>
              Login
            </Link>
          </Typography>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, boxShadow: "0 4px 20px rgba(99,102,241,0.25)" }} >
            Continue
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Register;
