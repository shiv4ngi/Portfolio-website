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

const GlassyContentCard = styled(Box)(({ theme }) => ({
  background: 'rgba(30,15,40,0.45)',
  borderRadius: '2.5rem',
  boxShadow: '0 8px 32px 0 rgba(162,57,255,0.13)',
  backdropFilter: 'blur(12px)',
  padding: theme.spacing(5, 4, 5, 4),
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2, 3, 2),
  },
}));

const AnimatedStatsValue = styled(StatsValue)(({ theme }) => ({
  background: 'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 16px #A239FF33',
  animation: 'fadeInUpStats 1.2s cubic-bezier(.4,2,.6,1)',
}));

const ModernHireMeButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)',
  color: 'white',
  borderRadius: '50px',
  padding: '15px 36px',
  textTransform: 'uppercase',
  fontWeight: 700,
  fontSize: '15px',
  letterSpacing: '1.5px',
  boxShadow: '0 6px 28px #A239FF33',
  transition: 'background 0.28s, box-shadow 0.28s, transform 0.28s',
  '&:hover': {
    background: 'linear-gradient(90deg, #5BFFB3 0%, #A239FF 100%)',
    boxShadow: '0 10px 36px #A239FF55',
    transform: 'scale(1.045)',
  },
}));

const AnimatedTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  color: 'white',
  letterSpacing: '0.01em',
  textShadow: '0 2px 16px #A239FF22',
  position: 'relative',
  zIndex: 2,
  display: 'inline-block',
  '&::after': {
    content: '""',
    display: 'block',
    width: '60%',
    height: '4px',
    margin: '18px auto 0',
    borderRadius: '2px',
    background: 'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)',
    animation: 'gradientMove 3s linear infinite alternate',
  },
}));

const AnimatedArrow = styled(ArrowDownwardIcon)(({ theme }) => ({
  color: '#A239FF',
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  ml: 2,
  animation: 'arrowBounce 1.8s infinite',
}));

const ModernProfileCircle = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 'min(420px, 90vw)',
  height: 'min(420px, 90vw)',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-3%',
    left: '-3%',
    width: '106%',
    height: '106%',
    borderRadius: '50%',
    background: 'linear-gradient(120deg, #A239FF55 0%, #5BFFB366 100%)',
    filter: 'blur(16px)',
    zIndex: 0,
    animation: 'pulseGlow 3.2s infinite alternate',
  },
}));

// Keyframes for animations
const styleSheet = document.createElement('style');
styleSheet.innerText = `
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
@keyframes fadeInUpStats {
  0% { opacity: 0; transform: translateY(32px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes arrowBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}
@keyframes pulseGlow {
  0% { opacity: 0.7; filter: blur(16px); }
  100% { opacity: 1; filter: blur(24px); }
}`;
document.head.appendChild(styleSheet);

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
            <ModernProfileCircle>
              <Box
                component="img"
                src={aboutImage}
                alt="Developer Workspace"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '50%',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}
              />
            </ModernProfileCircle>
          </Grid>

          {/* Right side - Content */}
          <Grid item xs={12} md={6}>
            <GlassyContentCard>
              {/* Section title with arrow */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'flex-start' }}>
                <AnimatedTitle variant="h2" component="h2">
                  {title}
                </AnimatedTitle>
                <AnimatedArrow />
              </Box>
              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.78)',
                  mb: 4,
                  fontSize: '1.07rem',
                  lineHeight: 1.7,
                  fontWeight: 400,
                  textShadow: '0 1px 8px #A239FF11',
                }}
              >
                {description}
              </Typography>
              {/* Stats */}
              <Grid container spacing={4} sx={{ mb: 5 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <AnimatedStatsValue variant="h3">
                      {formatValue(stat.value)}
                    </AnimatedStatsValue>
                    <StatsLabel variant="body2">{stat.label}</StatsLabel>
                  </Grid>
                ))}
              </Grid>
              {/* Hire me button */}
              <ModernHireMeButton
                endIcon={<ArrowForwardIcon />}
                component="a"
                href={hireMeButtonLink}
              >
                {hireMeButtonText}
              </ModernHireMeButton>
            </GlassyContentCard>
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
