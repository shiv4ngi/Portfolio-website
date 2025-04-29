import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import Logo from "../assets/images/logo.svg";

const Header = () => {
  const portfolioData = usePortfolio();
  const { logo, navItems } = portfolioData.header;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src={Logo} alt="logo" style={{ width: "auto", height: "70px" }} />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            component={Link}
            to={item.path}
            disablePadding
          >
            <ListItemText
              primary={item.name}
              sx={{
                textAlign: "center",
                color: "white",
                textDecoration: "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "transparent", pt: 2 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <img src={Logo} alt="logo" style={{ width: "auto", height: "70px" }} />

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: 240,
                  backgroundColor: theme.palette.background.paper,
                },
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                variant={item.name === "LET'S TALK" ? "contained" : "text"}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: "24px",
                  color: "white",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  ...(item.name === "MENU" && {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }),
                }}
              >
                {item.name} {item.name === "MENU" && "•"}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
