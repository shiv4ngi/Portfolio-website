import React from "react";
import { Box, Typography, Container, styled } from "@mui/material";
import { usePortfolio } from "../context/PortfolioContext";

// Modernized OutlineText with animated glow
const ModernOutlineText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  WebkitTextStroke: '2.5px #A239FF',
  color: 'transparent',
  fontSize: '5rem',
  lineHeight: '1.2',
  letterSpacing: '0.025em',
  textAlign: 'center',
  width: '100%',
  filter: 'drop-shadow(0 0 24px #A239FF99)',
  animation: 'modernHeroGlow 2.8s ease-in-out infinite alternate',
  [theme.breakpoints.down('md')]: {
    fontSize: '3.2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

// Glassy/gradient accent background
const HeroAccent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(520px, 80vw)',
  height: 'min(180px, 25vw)',
  borderRadius: '60px',
  background: 'linear-gradient(90deg, rgba(162,57,255,0.18) 0%, rgba(91,255,179,0.09) 100%)',
  boxShadow: '0 8px 32px #A239FF22',
  filter: 'blur(10px)',
  zIndex: 0,
}));

// Fade-in animation for hero text
const FadeInBox = styled(Box)(({ theme }) => ({
  opacity: 0,
  animation: 'fadeInHero 1.5s ease 0.2s forwards',
}));

// Keyframes for glow and fade-in
const styleSheet = document.createElement('style');
styleSheet.innerText = `
@keyframes modernHeroGlow {
  0% { filter: drop-shadow(0 0 24px #A239FF66); }
  100% { filter: drop-shadow(0 0 42px #A239FF); }
}
@keyframes fadeInHero {
  to { opacity: 1; }
}`;
document.head.appendChild(styleSheet);

const HeroSection = () => {
  const portfolioData = usePortfolio();
  const { name } = portfolioData.hero;

  return (
    <Container maxWidth="lg" sx={{ my: 10 }}>
      <Box
        sx={{
          position: 'relative',
          minHeight: '18vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HeroAccent />
        <FadeInBox>
          <ModernOutlineText variant="h1">{name}</ModernOutlineText>
        </FadeInBox>
      </Box>
    </Container>
  );
};

export default HeroSection;