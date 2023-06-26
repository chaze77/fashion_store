import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { setUser, resetUser } from "../slices/authSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { List, MenuItem, Typography } from "@mui/material";
import "../styles/style.css";

const pages = [
  {
    name: "Products",
    path: "/main",
  },
  {
    name: "Cart",
    path: "/main/cart",
  },
];

function Header() {
  const { user } = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser", currentUser);

      dispatch(setUser(currentUser));
    });
  }, []);

  console.log(user);

  const logout = async () => {
    await signOut(auth);
    dispatch(resetUser(user));
    navigate("/login");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Link to={page.path}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
            <List
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Menu component={NavLink} to="/">
                Privet
              </Menu>
            </List>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: "10px",
            }}
          >
            {pages.map((page, idx) => (
              <Link
                key={idx}
                onClick={handleCloseNavMenu}
                style={{
                  color: "white",
                  display: "block",
                  textDecoration: "none",
                  fontFamily: "Montserrat",
                  fontSize: "24px",
                  fontWeight: "500",
                }}
                to={page.path}
              >
                {page.name}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="logout">
              <IconButton sx={{ p: 0 }}>
                {user && (
                  <div className="header-user">
                    <p>{user.email}</p>
                    <p onClick={logout}>Logout</p>
                  </div>
                )}
                <ShoppingCartIcon sx={{ fill: "white", fontSize: "36px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
