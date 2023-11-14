import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import apis from "../api";
import background from "../assets/Signup.jpg";

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

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Get the email and password from the input fields
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Make the sign-up API call
      const response = await apis.signUp({ email, password });

      if (response.data.accessToken) {
        // Save the user information to localStorage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Redirect to the donor page
        const userRole = response.data.role;
        navigate("/donar");
      } else {
        alert("Sign-up failed. Please check your credentials.");
      }
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          backgroundImage: `url(${background})`, // Set the background image
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Ensure the box takes at least the full viewport height
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email" // Add an id to the email input
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password" // Add an id to the password input
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit} // Call the handleSubmit function when the button is clicked
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  Already have an account?
                  <Link to={"/"} variant="body2" style={{ color: "#508276" }}>
                    {" Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;
