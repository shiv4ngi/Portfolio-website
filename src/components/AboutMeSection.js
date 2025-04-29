import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  alpha,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { usePortfolio } from "../context/PortfolioContext";
import aboutImage from "../assets/images/about.png";

// Styled components
const StatsValue = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: 600,
  lineHeight: 1.1,
  color: "white",
  display: "flex",
  alignItems: "center",
  "& .plus": {
    color: "#A239FF",
    marginLeft: "4px",
  },
}));

const StatsLabel = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.7)",
  marginTop: theme.spacing(1),
}));

const HireMeButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#A239FF",
  color: "white",
  borderRadius: "50px",
  padding: "12px 24px",
  textTransform: "uppercase",
  fontWeight: 600,
  fontSize: "14px",
  letterSpacing: "1px",
  boxShadow: "0 4px 20px rgba(138, 43, 226, 0.4)",
  "&:hover": {
    backgroundColor: "#9B30FF",
    boxShadow: "0 6px 25px rgba(138, 43, 226, 0.6)",
  },
}));

const AboutMeSection = () => {
  const theme = useTheme();
  const portfolioData = usePortfolio();
  const {
    title,
    description,
    image,
    stats,
    hireMeButtonText,
    hireMeButtonLink,
  } = portfolioData.about;

  // Format the stats values to include the plus in the correct color
  const formatValue = (value) => {
    if (value.includes("+")) {
      const [number, plus] = value.split("+");
      return (
        <>
          {number}
          <span className="plus">+</span>
        </>
      );
    }
    return value;
  };

  return (
    <Box
      component="section"
      id="about-me"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Left side - Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "5%",
                  left: "5%",
                  width: "90%",
                  height: "90%",
                  border: "1px solid #A239FF",
                  borderRadius: "50%",
                  zIndex: 0,
                  animation: "pulse 3s infinite",
                },
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(1)",
                    opacity: 0.3,
                  },
                  "50%": {
                    transform: "scale(1.05)",
                    opacity: 0.5,
                  },
                  "100%": {
                    transform: "scale(1)",
                    opacity: 0.3,
                  },
                },
              }}
            >
              <Box
                component="img"
                src={aboutImage}
                alt="Developer Workspace"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                }}
              />
            </Box>
          </Grid>

          {/* Right side - Content */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Section title with arrow */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2.5rem", md: "4rem" },
                    color: "white",
                  }}
                >
                  {title}
                </Typography>
                <ArrowDownwardIcon
                  sx={{
                    color: "#A239FF",
                    fontSize: { xs: "2.5rem", md: "4rem" },
                    ml: 2,
                  }}
                />
              </Box>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 4,
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                {description}
              </Typography>

              {/* Stats */}
              <Grid container spacing={4} sx={{ mb: 5 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <StatsValue variant="h3">
                      {formatValue(stat.value)}
                    </StatsValue>
                    <StatsLabel variant="body2">{stat.label}</StatsLabel>
                  </Grid>
                ))}
              </Grid>

              {/* Hire me button */}
              <HireMeButton
                endIcon={<ArrowForwardIcon />}
                component="a"
                href={hireMeButtonLink}
              >
                {hireMeButtonText}
              </HireMeButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Purple glow effects */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(138,43,226,0.3) 0%, rgba(138,43,226,0) 70%)",
          top: "-150px",
          left: "10%",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(138,43,226,0.15) 0%, rgba(138,43,226,0) 70%)",
          bottom: "-200px",
          right: "-100px",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default AboutMeSection;
