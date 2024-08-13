import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../contexts/AuthContext";

const style = {
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  width: "300px",
  border: "1px solid",
  borderRadius: "5px",
  padding: "10px",
};

function FormLogin({ callback }) {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const [username, setUsername] = useState("tuanvan113");
  const [password, setPassword] = useState("123456");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleLogin = () => {
    auth.signin(username, () => callback());
  };

  return (
    <Box component="form" sx={style} gap={4}>
      <Typography variant="h4" component="div">
        Login
      </Typography>
      <TextField
        label="User"
        id="outlined"
        sx={{ m: 1 }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button onClick={handleLogin} variant="contained">
        Login
      </Button>
    </Box>
  );
}

export default FormLogin;
