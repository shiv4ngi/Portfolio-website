import React from "react";
import { Box, Typography, Grid, Container, Avatar } from "@mui/material";
import SocialIcons from "./SocialIcons";
import { usePortfolio } from "../context/PortfolioContext";

const StatsItem = ({ value, label }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <Typography
      variant="h3"
      color="white"
      fontWeight="bold"
      sx={{
        fontSize: { xs: "2.5rem", md: "3.5rem" },
        lineHeight: 1.2,
      }}
    >
      {value}
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        mt: 1,
        letterSpacing: "0.05em",
        fontSize: "0.75rem",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Typography>
  </Box>
);

const ProfileSection = () => {
  const portfolioData = usePortfolio();
  const { biography, skills, image, stats } = portfolioData.profile;
  const { name } = portfolioData.hero;

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
      <Grid container spacing={12} alignItems="center">
        <Grid item xs={12} md={6} lg={4}>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                mb: 1,
                letterSpacing: "0.05em",
                fontSize: "0.75rem",
              }}
            >
              BIOGRAPHY
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontSize: "0.9rem", lineHeight: 1.7 }}
            >
              {biography}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                mt: 4,
                mb: 1,
                letterSpacing: "0.05em",
                fontSize: "0.75rem",
              }}
            >
              SKILLS
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "0.9rem", lineHeight: 1.7 }}
            >
              {skills}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                mt: 4,
                mb: 1,
                letterSpacing: "0.05em",
                fontSize: "0.75rem",
              }}
            >
              CONNECT
            </Typography>
            {/* <SocialIcons /> */}
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={image}
              alt={name}
              sx={{
                width: { xs: 200, md: 350 },
                height: { xs: 200, md: 350 },
                border: "4px solid #8a2be2",
                boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={4}
          sx={{
            display: { xs: "flex", lg: "grid" },
            justifyContent: { xs: "center", lg: "flex-end" },
            textAlign: { xs: "center", lg: "end" },
          }}
        >
          {stats.map((stat, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={index}
              sx={{ textAlign: "end", display: { xs: "flex", md: "block" } }}
            >
              <StatsItem value={stat.value} label={stat.label} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileSection;
