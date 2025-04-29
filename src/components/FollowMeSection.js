import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { usePortfolio } from "../context/PortfolioContext";

// Social media icons import
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { SiBehance, SiDiscord } from "react-icons/si";

// Styled components for social media icons
const SocialIcons = {
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  behance: SiBehance,
  discord: SiDiscord,
};

// --- Modernized Styled Components ---
const GlassyFooter = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(30,15,40,0.85) 0%, rgba(162,57,255,0.13) 100%)',
  borderTopLeftRadius: '2rem',
  borderTopRightRadius: '2rem',
  boxShadow: '0 -8px 32px 0 rgba(162,57,255,0.12)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
}));

const ModernSocialButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  background: 'rgba(30,15,40,0.35)',
  border: '2px solid rgba(162,57,255,0.22)',
  borderRadius: '50%',
  width: '54px',
  height: '54px',
  boxShadow: '0 2px 16px #A239FF22',
  margin: '0 8px',
  transition: 'all 0.28s cubic-bezier(.4,2,.6,1)',
  '&:hover': {
    background: 'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)',
    color: 'white',
    border: '2px solid #A239FF',
    boxShadow: '0 4px 32px #A239FF55',
    transform: 'scale(1.1)',
  },
}));

const AnimatedFooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
  color: 'white',
  letterSpacing: '0.01em',
  textShadow: '0 2px 16px #A239FF33',
  position: 'relative',
  zIndex: 2,
  marginBottom: theme.spacing(2),
  '&::after': {
    content: '""',
    display: 'block',
    width: '48px',
    height: '4px',
    margin: '14px auto 0',
    borderRadius: '2px',
    background: 'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)',
    animation: 'footerUnderlineGlow 2.2s infinite alternate',
  },
}));

const FadeInFooter = styled(Box)(({ delay }) => ({
  opacity: 0,
  animation: `footerFadeIn 1.1s cubic-bezier(.4,2,.6,1) ${delay || 0}s forwards`,
}));

// Keyframes for animations
const styleSheet = document.createElement('style');
styleSheet.innerText = `
@keyframes footerUnderlineGlow {
  0% { box-shadow: 0 0 8px #A239FF99; }
  100% { box-shadow: 0 0 24px #5BFFB399; }
}
@keyframes footerFadeIn {
  0% { opacity: 0; transform: translateY(36px); }
  100% { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleSheet);

const FollowMeSection = () => {
  const theme = useTheme();
  const portfolioData = usePortfolio();
  const { title, social } = portfolioData.contact;

  return (
    <GlassyFooter component="section" id="follow-me" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8}>
            <FadeInFooter delay={0.05}>
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                <AnimatedFooterTitle variant="h2" component="h2">
                  {title}
                </AnimatedFooterTitle>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
                  {social.map((item) => {
                    const Icon = SocialIcons[item.platform];
                    return (
                      <ModernSocialButton
                        key={item.platform}
                        aria-label={item.platform}
                        component="a"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {Icon === SiBehance || Icon === SiDiscord ? (
                          <Icon size={26} />
                        ) : (
                          <Icon fontSize="medium" />
                        )}
                      </ModernSocialButton>
                    );
                  })}
                </Box>
              </Box>
            </FadeInFooter>
          </Grid>
        </Grid>
      </Container>
      {/* Purple glow effect */}
      <Box
        sx={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(138,43,226,0.22) 0%, rgba(138,43,226,0) 70%)',
          bottom: '-140px',
          right: '10%',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />
    </GlassyFooter>
  );
};

export default FollowMeSection;
