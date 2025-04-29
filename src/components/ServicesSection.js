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

// Modernized Service Card with glassmorphism and animation
const ModernServiceCard = ({ number, title, icon, description, delay = 0 }) => {
  const theme = useTheme();
  // Get the correct icon component based on the icon string
  const getIconComponent = () => {
    const IconComponent = serviceIcons[icon];
    return IconComponent ? (
      <IconComponent sx={{ color: '#A239FF', fontSize: '30px', filter: 'drop-shadow(0 2px 12px #A239FF66)' }} />
    ) : null;
  };
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '18px',
        mb: 4,
        animation: 'fadeInUpService 0.95s cubic-bezier(.4,2,.6,1) forwards',
        opacity: 0,
        animationDelay: `${delay}ms`,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3.5, md: 4.5 },
          minHeight: '140px',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(30,15,40,0.55)',
          border: '1.5px solid rgba(162, 57, 255, 0.13)',
          borderRadius: '18px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px 0 rgba(162, 57, 255, 0.10)',
          backdropFilter: 'blur(8px)',
          transition: 'transform 0.32s cubic-bezier(.4,2,.6,1), box-shadow 0.32s',
          '&:hover': {
            transform: 'scale(1.035)',
            boxShadow: '0 12px 48px 0 #A239FF33',
            borderColor: 'rgba(162, 57, 255, 0.22)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)',
            boxShadow: '0 2px 16px #A239FF33',
            animation: 'gradientMove 2.5s linear infinite',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.7rem',
              opacity: 0.93,
              textShadow: '0 1px 6px #A239FF22',
            }}
          >
            {number}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {getIconComponent()}
            <Typography
              variant="h6"
              sx={{
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.25rem',
                letterSpacing: '0.01em',
                textShadow: '0 1px 6px #0002',
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: '1.01rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.78)',
            fontWeight: 400,
          }}
        >
          {description}
        </Typography>
      </Paper>
    </Box>
  );
};

// Keyframes for fade-in and animated gradient
const styleSheet = document.createElement('style');
styleSheet.innerText = `
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
@keyframes fadeInUpService {
  0% { opacity: 0; transform: translateY(36px); }
  100% { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleSheet);

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
            <ModernServiceCard key={index} {...service} delay={index * 120} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServicesSection;
