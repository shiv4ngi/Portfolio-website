import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import ProfileSection from "./ProfileSection";
import MarqueeStrip from "./MarqueeStrip";
import AboutMeSection from "./AboutMeSection";
import ServicesSection from "./ServicesSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import HireMeSection from "./HireMeSection";
import FollowMeSection from "./FollowMeSection";

const HomePage = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <div>
        <HeroSection />
        <ProfileSection />
        <MarqueeStrip />
      </div>
      <AboutMeSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <HireMeSection />
      {/* <FollowMeSection /> */}
    </Box>
  );
};

export default HomePage;
