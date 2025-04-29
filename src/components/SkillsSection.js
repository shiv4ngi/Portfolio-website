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

// Styled component for the skill card with glassmorphism
const SkillCard = styled(Box)(({ theme }) => ({
  background: 'rgba(30, 15, 40, 0.45)',
  border: '1px solid rgba(162, 57, 255, 0.10)',
  borderRadius: '18px',
  boxShadow: '0 4px 32px 0 rgba(162, 57, 255, 0.08)',
  backdropFilter: 'blur(8px)',
  transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.045)',
    boxShadow: '0 8px 32px 0 rgba(162, 57, 255, 0.18)',
    borderColor: 'rgba(162, 57, 255, 0.25)',
  },
  padding: '20px 24px',
  marginBottom: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

// Gradient for active progress dots
const GradientDot = styled(Box)(({ active, theme }) => ({
  width: '11px',
  height: '11px',
  borderRadius: '50%',
  background: active
    ? 'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)'
    : alpha('#A239FF', 0.13),
  boxShadow: active ? '0 0 4px 0 #A239FF55' : 'none',
  transition: 'background 0.3s, box-shadow 0.3s',
  marginRight: '3px',
}));

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

// Individual skill item component
const SkillItem = ({ name, icon, level }) => {
  const IconComponent = SkillIcons[icon] || null;

  // Create an array of 10 dots for the skill level
  const dots = Array.from({ length: 10 }, (_, i) => (
    <GradientDot key={i} active={i < level} />
  ));

  return (
    <SkillCard>
      <SkillLabel>
        {IconComponent && (
          <IconComponent
            size={28}
            style={{
              color: 'white',
              filter: 'drop-shadow(0 2px 8px #A239FF44)',
              marginRight: 4,
            }}
          />
        )}
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            fontWeight: 600,
            fontSize: '1.09rem',
            letterSpacing: '0.03em',
            textShadow: '0 2px 8px #0002',
          }}
        >
          {name}
        </Typography>
      </SkillLabel>
      <SkillProgress>{dots}</SkillProgress>
    </SkillCard>
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: { xs: 6, md: 8 },
            position: 'relative',
            zIndex: 2,
            flexDirection: 'column',
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
              letterSpacing: '0.01em',
              textShadow: '0 2px 16px #A239FF22',
            }}
          >
            {title}
          </Typography>
          <ArrowDownwardIcon
            sx={{
              color: "#A239FF",
              fontSize: { xs: "2.5rem", md: "4rem" },
              ml: 2,
              mt: 1,
              filter: 'drop-shadow(0 2px 8px #A239FF66)',
            }}
          />
          {/* Animated accent divider */}
          <Box
            sx={{
              mt: 2,
              height: 4,
              width: 80,
              borderRadius: 2,
              background:
                'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)',
              boxShadow: '0 2px 16px #A239FF33',
              animation: 'gradientMove 2.5s linear infinite',
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
