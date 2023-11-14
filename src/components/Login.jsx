import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import apis from "../api";

import background from "../assets/Signin.jpg";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#508276", // Set the main color for primary elements
    },
    secondary: {
      main: "#d3869c", // Set the main color for secondary elements
    },
    background: {
      default: "#edf4f0", // Set the default background color
    },
  },
});

if (apis.getCurrentUser()) {
  localStorage.removeItem("user");
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function getDashboardRouteForRole(role) {
    switch (role) {
      case "donor":
        return "/donar";
      case "org":
        return "/org";
      case "warehouse":
        return "/warehouse";
      default:
        return "/"; // Default route for unknown roles
    }
  }

  const handleClick = async () => {
    try {
      const response = await apis.signIn({ email, password });
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        const userRole = response.data.role;
        navigate(getDashboardRouteForRole(userRole));
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{ backgroundColor: "#e3f3ea" }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item>
                    Don't have an account?
                    <Link
                      to={"/signup"}
                      variant="body2"
                      style={{ color: "#508276" }}
                    >
                      {" Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Login;
