import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { logout, getFName } from "../../api";
import Logo from "../../assets/Logo.jpg";

const pages = ["List All Donations", "Make New Donation"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [donorFirstName, setDonorFirstName] = React.useState("");

  React.useEffect(() => {
    getFName()
      .then((res) => {
        setDonorFirstName(res.data.FName || "");
      })
      .catch((error) =>
        console.error("Error fetching donor's first name:", error)
      );
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#0D5F5A" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="Logo"
            src={Logo}
            sx={{
              display: { xs: "none", md: "flex" },
              marginRight: "18px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <Link to={"/donar"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: "#fff",
              }}
            >
              ShareBite
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={`/${page.replace(/\s+/g, "").toLowerCase()}`}>
                    <Typography textAlign="center" sx={{ color: "#fff" }}>
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "#fff",
            }}
          >
            ShareBite
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Link
                key={index}
                to={`/${page.replace(/\s+/g, "").toLowerCase()}`}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={
                    donorFirstName
                      ? donorFirstName.charAt(0).toUpperCase()
                      : "A"
                  }
                  sx={{
                    display: { xs: "none", md: "flex" },
                    marginRight: "18px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    bgcolor: "#afe2c8",
                    color: "#3a5e56",
                  }}
                >
                  {donorFirstName
                    ? donorFirstName.charAt(0).toUpperCase()
                    : "A"}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                "& .MuiMenu-paper": { backgroundColor: "#0A4E47" },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/profile">
                  <Typography textAlign="center" sx={{ color: "#ffffff" }}>
                    Profile
                  </Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/donar">
                  <Typography textAlign="center" sx={{ color: "#ffffff" }}>
                    HomePage
                  </Typography>
                </Link>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  logout()
                    .then(() => {
                      console.log("User logged out successfully");
                      window.location.href = "/login";
                    })
                    .catch((error) => {
                      console.error("Error logging out: ", error);
                    });
                }}
              >
                <Typography
                  textAlign="center"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
