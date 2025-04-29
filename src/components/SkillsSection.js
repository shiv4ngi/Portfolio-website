import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { usePortfolio } from "../context/PortfolioContext";
import {
  SiCss3,
  SiTailwindcss,
  SiJavascript,
  SiAngular,
  SiLaravel,
  SiReact,
  SiRubyonrails,
  SiNodedotjs,
} from "react-icons/si";

// Define a mapping of skill icons
const SkillIcons = {
  css: SiCss3,
  tailwind: SiTailwindcss,
  javascript: SiJavascript,
  angular: SiAngular,
  laravel: SiLaravel,
  react: SiReact,
  ruby: SiRubyonrails,
  node: SiNodedotjs,
};

// Styled component for the skill name and icon container
const SkillLabel = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "8px",
}));

// Styled component for the skill progress dots container
const SkillProgress = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
}));

// Styled component for individual progress dots
const ProgressDot = styled(Box)(({ active, theme }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: active ? "#A239FF" : alpha("#A239FF", 0.3),
  transition: "background-color 0.3s ease",
}));

// Individual skill item component
const SkillItem = ({ name, icon, level }) => {
  const IconComponent = SkillIcons[icon] || null;

  // Create an array of 10 dots for the skill level
  const dots = Array.from({ length: 10 }, (_, i) => (
    <ProgressDot key={i} active={i < level} />
  ));

  return (
    <Box sx={{ mb: 4 }}>
      <SkillLabel>
        {IconComponent && (
          <IconComponent size={24} style={{ color: "white" }} />
        )}
        <Typography
          variant="body1"
          sx={{
            color: "white",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          {name}
        </Typography>
      </SkillLabel>
      <SkillProgress>{dots}</SkillProgress>
    </Box>
  );
};

const SkillsSection = () => {
  const theme = useTheme();
  const portfolioData = usePortfolio();
  const { title, items } = portfolioData.skills;

  return (
    <Box
      component="section"
      id="skills"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        py: { xs: 8, md: 12 },
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(20,0,36,0.3) 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", md: "4rem" },
              textAlign: "center",
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

        <Grid container spacing={8}>
          <Grid
            item
            xs={12}
            md={6}
            textAlign={"center"}
            justifyContent={"center"}
            alignItems={"center"}
            display={"grid"}
          >
            {items.slice(0, Math.ceil(items.length / 2)).map((skill, index) => (
              <SkillItem
                key={index}
                name={skill.name}
                icon={skill.icon}
                level={skill.level}
              />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            textAlign={"center"}
            justifyContent={"center"}
            alignItems={"center"}
            display={"grid"}
          >
            {items.slice(Math.ceil(items.length / 2)).map((skill, index) => (
              <SkillItem
                key={index + Math.ceil(items.length / 2)}
                name={skill.name}
                icon={skill.icon}
                level={skill.level}
              />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SkillsSection;
