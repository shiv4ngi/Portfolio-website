import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
  Grid,
} from "@mui/material";
import { usePortfolio } from "../context/PortfolioContext";
import { serviceIcons } from "./ServicesIcons";

const ServiceCard = ({ number, title, icon, description }) => {
  const theme = useTheme();

  // Get the correct icon component based on the icon string
  const getIconComponent = () => {
    const IconComponent = serviceIcons[icon];
    return IconComponent ? (
      <IconComponent sx={{ color: "white", fontSize: "28px" }} />
    ) : null;
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        mb: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          height: "150px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1A1A1A",
          borderRadius: "8px",
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "3px",
            background: "linear-gradient(90deg, #8A2BE2, #FF00FF, #4169E1)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "600",
              fontSize: "28px",
              opacity: 0.8,
            }}
          >
            {number}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {getIconComponent()}
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "500",
                fontSize: "22px",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {description}
        </Typography>
      </Paper>
    </Box>
  );
};

const ServicesSection = () => {
  const theme = useTheme();
  const portfolioData = usePortfolio();
  const { items } = portfolioData.services;

  return (
    <Box
      component="section"
      id="services"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: "transparent",
        py: { xs: 8, md: 12 },
      }}
    >
      <Grid container maxWidth="lg">
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ mb: { xs: 6, md: 8 }, display: "flex", px: 2 }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 1,
                letterSpacing: "0.05em",
                fontSize: "0.75rem",
                fontWeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.3)",
                  mr: 1,
                  display: "inline-block",
                }}
              />{" "}
              SERVICES
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  mr: 2,
                  fontWeight: "bold",
                  fontSize: { xs: "3rem", md: "4rem" },
                }}
              >
                What I
              </Typography>
              <Typography
                variant="h2"
                component="span"
                sx={{
                  color: "#A239FF",
                  fontWeight: "bold",
                  fontSize: { xs: "3rem", md: "4rem" },
                }}
              >
                Do
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} lg={8} sx={{ maxWidth: "100%", px: 2 }}>
          {items.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServicesSection;
