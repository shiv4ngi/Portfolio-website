import React from "react";
import { Box, Typography, Container, styled } from "@mui/material";
import { usePortfolio } from "../context/PortfolioContext";

const OutlineText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  WebkitTextStroke: "1px white",
  color: "transparent",
  fontSize: "5rem",
  lineHeight: "1.2",
  letterSpacing: "0.02em",
  textAlign: "center",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    fontSize: "5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "3rem",
  },
}));

const SolidText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "white",
  fontSize: "5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const HeroSection = () => {
  const portfolioData = usePortfolio();
  const { name } = portfolioData.hero;

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Box
        sx={{
          position: "relative",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OutlineText variant="h1">{name}</OutlineText>
      </Box>
    </Container>
  );
};

export default HeroSection;
