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
const SocialButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  width: "48px",
  height: "48px",
  "&:hover": {
    backgroundColor: "#A239FF",
    transform: "translateY(-5px)",
    transition: "all 0.3s ease",
  },
  transition: "all 0.3s ease",
}));

// Media icons mapping
const SocialIcons = {
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  behance: SiBehance,
  discord: SiDiscord,
};

const FollowMeSection = () => {
  const theme = useTheme();
  const portfolioData = usePortfolio();
  const { title, image, social } = portfolioData.contact;

  return (
    <Box
      component="section"
      id="follow-me"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(59, 0, 105, 0.7) 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h1"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "3rem", md: "6rem" },
                  color: "rgba(255, 255, 255, 0.1)",
                  position: "absolute",
                  top: -40,
                  left: -20,
                  zIndex: 0,
                }}
              >
                Follow
              </Typography>

              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: { xs: 6, md: 8 },
                  fontSize: { xs: "2.5rem", md: "4.5rem" },
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {title}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                {social.map((item) => {
                  const Icon = SocialIcons[item.platform];

                  return (
                    <SocialButton
                      key={item.platform}
                      aria-label={item.platform}
                      component="a"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Icon === SiBehance || Icon === SiDiscord ? (
                        <Icon size={24} />
                      ) : (
                        <Icon fontSize="medium" />
                      )}
                    </SocialButton>
                  );
                })}
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              component="img"
              src={image}
              alt="Profile"
              sx={{
                maxWidth: "100%",
                maxHeight: { xs: "300px", md: "400px" },
                objectFit: "cover",
                borderRadius: { xs: "20px", md: "0" },
                mixBlendMode: "luminosity",
                filter: "contrast(1.1)",
                "&:hover": {
                  mixBlendMode: "normal",
                  transition: "all 0.5s ease",
                },
                transition: "all 0.5s ease",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Purple glow effect */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(138,43,226,0.4) 0%, rgba(138,43,226,0) 70%)",
          bottom: "-150px",
          right: "10%",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default FollowMeSection;
