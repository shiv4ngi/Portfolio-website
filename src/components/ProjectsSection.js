import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { usePortfolio } from "../context/PortfolioContext";

// Custom styled Tabs component for horizontal scrolling tabs
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: "48px",
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-flexContainer": {
    gap: 0,
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
  "& .MuiTabs-scroller": {
    overflow: "auto !important",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
  },
}));

// Custom styled Tab component
const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minHeight: "48px",
  fontSize: "14px",
  fontWeight: 500,
  color: "rgba(255, 255, 255, 0.7)",
  padding: "12px 24px",
  borderBottomWidth: "2px",
  borderBottomStyle: "solid",
  borderBottomColor: "transparent",
  transition: "all 0.3s ease",
  "&.Mui-selected": {
    color: "#ffffff",
    backgroundColor: "#8A2BE2",
  },
  "&:hover": {
    color: "#ffffff",
    opacity: 1,
  },
}));

// Modernized Project Card with glassmorphism
const ModernProjectCard = styled(Card)(({ theme }) => ({
  borderRadius: '22px',
  overflow: 'hidden',
  background: 'rgba(30, 15, 40, 0.55)',
  border: '1.5px solid rgba(162, 57, 255, 0.13)',
  boxShadow: '0 8px 32px 0 rgba(162,57,255,0.10)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  transition: 'transform 0.32s cubic-bezier(.4,2,.6,1), box-shadow 0.32s',
  '&:hover': {
    transform: 'scale(1.045)',
    boxShadow: '0 12px 48px 0 #A239FF33',
    borderColor: 'rgba(162, 57, 255, 0.22)',
  },
  aspectRatio: '1/1',
  minHeight: 320,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}));

const ModernProjectImage = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: '65%',
  objectFit: 'cover',
  borderTopLeftRadius: '22px',
  borderTopRightRadius: '22px',
  background: 'linear-gradient(135deg, #A239FF22 0%, #5BFFB322 100%)',
}));

const ModernProjectOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(120deg, rgba(162,57,255,0.08) 0%, rgba(0,0,0,0.25) 100%)',
  opacity: 0.14,
  transition: 'opacity 0.3s',
  zIndex: 1,
  pointerEvents: 'none',
  borderRadius: '22px',
  '&:hover': {
    opacity: 0.25,
  },
}));

const ModernProjectContent = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  bottom: 28,
  left: 0,
  width: '100%',
  zIndex: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0 28px',
  opacity: 1,
  transition: 'opacity 0.32s, transform 0.32s',
}));

const ModernProjectTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 700,
  fontSize: '1.15rem',
  letterSpacing: '0.04em',
  textShadow: '0 2px 8px #0004',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  mb: 1,
}));

const ModernProjectDate = styled(Typography)(({ theme }) => ({
  color: '#A239FF',
  fontSize: '0.95rem',
  fontWeight: 500,
  textShadow: '0 1px 6px #A239FF22',
  mb: 0.5,
}));

const ModernSeeAllButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)',
  color: 'white',
  borderRadius: '50px',
  padding: '13px 30px',
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

// Animated gradient underline for selected tab
const AnimatedTabIndicator = styled('span')(({ theme }) => ({
  display: 'block',
  height: 4,
  width: '100%',
  borderRadius: 2,
  background: 'linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)',
  boxShadow: '0 1px 8px #A239FF33',
  animation: 'gradientMove 2.5s linear infinite',
  marginTop: 2,
}));

const ProjectsSection = () => {
  const portfolioData = usePortfolio();
  const { title, categories, items, activeCategory } = portfolioData.projects;

  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  // Filter projects based on selected category
  const filteredProjects = items.filter(
    (project) => project.category === selectedCategory
  );

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: alpha("#000", 0.3),
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: { xs: 4, md: 6 },
            textAlign: "center",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            letterSpacing: '0.01em',
            textShadow: '0 2px 16px #A239FF22',
          }}
        >
          {title}
        </Typography>

        {/* Category Tabs */}
        <Box
          sx={{
            mb: { xs: 4, md: 6 },
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <StyledTabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="project categories"
            TabIndicatorProps={{ children: <AnimatedTabIndicator /> }}
          >
            {categories.map((category) => (
              <StyledTab key={category} label={category} value={category} />
            ))}
          </StyledTabs>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {filteredProjects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <ModernProjectCard>
                <ModernProjectImage
                  component="img"
                  image={project.image}
                  alt={project.title}
                />
                <ModernProjectOverlay className="overlay" />
                <CardActionArea
                  href={project.link}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 3,
                  }}
                >
                  <ModernProjectContent>
                    <ModernProjectDate>{project.date}</ModernProjectDate>
                    <ModernProjectTitle>
                      {project.title} <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    </ModernProjectTitle>
                  </ModernProjectContent>
                </CardActionArea>
              </ModernProjectCard>
            </Grid>
          ))}
        </Grid>

        {/* See All Projects Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 6, md: 8 },
          }}
        >
          <ModernSeeAllButton
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            href="#all-projects"
          >
            SEE ALL PROJECTS
          </ModernSeeAllButton>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
